<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Subscription;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GenerateMonthlyInvoices extends Command
{
    protected $signature = 'invoices:generate-monthly';
    protected $description = 'Generate monthly invoices for all active subscriptions that are due';

    public function handle()
    {
        $this->info('Mulai membuat tagihan bulanan...');

        // Cari semua langganan aktif yang tanggal tagihannya hari ini atau sudah lewat
        $subscriptionsToBill = Subscription::with('user', 'package')
            ->where('status', 'active')
            ->whereDate('next_billing_date', '<=', Carbon::today())
            ->get();

        if ($subscriptionsToBill->isEmpty()) {
            $this->info('Tidak ada tagihan yang perlu dibuat hari ini.');
            return 0;
        }

        foreach ($subscriptionsToBill as $subscription) {
            DB::transaction(function () use ($subscription) {
                // Buat Invoice baru
                Invoice::create([
                    'invoice_number' => 'INV/' . Carbon::now()->format('Ym') . '/' . $subscription->user_id,
                    'user_id' => $subscription->user_id,
                    'subscription_id' => $subscription->id,
                    'amount' => $subscription->package->price,
                    'status' => 'pending',
                    'type' => 'monthly',
                    'due_date' => Carbon::now()->addDays(7), // Jatuh tempo 7 hari dari sekarang
                ]);

                // Update tanggal tagihan berikutnya menjadi 1 bulan dari sekarang
                $subscription->update([
                    'next_billing_date' => $subscription->next_billing_date->addMonth(),
                ]);

                $this->info("Tagihan untuk {$subscription->user->name} berhasil dibuat.");
            });
        }

        $this->info('Semua tagihan bulanan yang jatuh tempo telah berhasil dibuat.');
        return 0;
    }
}