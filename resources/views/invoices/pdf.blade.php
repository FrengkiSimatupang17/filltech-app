<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->invoice_number }}</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; font-size: 12px; }
        .container { width: 100%; margin: 0 auto; }
        .header, .footer { text-align: center; }
        .header h1 { margin: 0; }
        .content { margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; }
        .text-right { text-align: right; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>INVOICE</h1>
            <p>Filltech Berkah Bersama</p>
        </div>

        <div class="content">
            <p><strong>Nomor Invoice:</strong> {{ $invoice->invoice_number }}</p>
            <p><strong>Tanggal Terbit:</strong> {{ $invoice->created_at->format('d M Y') }}</p>
            <p><strong>Jatuh Tempo:</strong> {{ $invoice->due_date->format('d M Y') }}</p>
            <hr>
            <p><strong>Ditagihkan Kepada:</strong></p>
            <p>{{ $invoice->user->name }}</p>
            <p>ID Klien: {{ $invoice->user->unique_id }}</p>
            <p>Alamat: RT {{ $invoice->user->rt }}/RW {{ $invoice->user->rw }}, Blok {{ $invoice->user->block }} No. {{ $invoice->user->house_number }}</p>
            <br>
            <table>
                <thead>
                    <tr>
                        <th>Deskripsi</th>
                        <th class="text-right">Jumlah</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            @if($invoice->type === 'installation')
                                Biaya Pemasangan Awal
                            @else
                                Tagihan Bulanan WiFi - Paket {{ $invoice->subscription->package->name }}
                            @endif
                        </td>
                        <td class="text-right">Rp {{ number_format($invoice->amount, 0, ',', '.') }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th class="text-right total">Total</th>
                        <th class="text-right total">Rp {{ number_format($invoice->amount, 0, ',', '.') }}</th>
                    </tr>
                </tfoot>
            </table>
            <br>
            <p>Status: <strong>{{ strtoupper($invoice->status) }}</strong></p>
            @if($invoice->status === 'paid')
                <p>Tanggal Lunas: {{ $invoice->paid_at->format('d M Y, H:i') }}</p>
            @endif
        </div>

        <div class="footer" style="margin-top: 50px;">
            <p>Terima kasih atas pembayaran Anda.</p>
        </div>
    </div>
</body>
</html>