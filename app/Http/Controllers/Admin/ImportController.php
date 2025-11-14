<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\CustomersImport;

class ImportController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Import/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv'
        ]);

        Excel::import(new CustomersImport, $request->file('file'));

        return redirect()->route('admin.users.index')->with('success', 'Data pelanggan berhasil diimpor.');
    }
}