<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class CompleteRegistrationController extends Controller
        {
            public function create()
            {
                return Inertia::render('Auth/CompleteRegistration');
            }
            public function store(Request $request)
            {
                $user = Auth::user();
                $request->validate([
                    'phone_number' => 'required|string|max:15',
                    'rt' => 'required|string|max:3',
                    'rw' => 'required|string|max:3',
                    'block' => 'required|string|max:10',
                    'house_number' => 'required|string|max:10',
                ]);

                $uniqueId = Carbon::now()->format('Ymd') . '_' . $request->rt . '_' . $request->rw . '_' . $request->block . $request->house_number;
                
                $user->update([
                    'phone_number' => $request->phone_number,
                    'rt' => $request->rt,
                    'rw' => $request->rw,
                    'block' => $request->block,
                    'house_number' => $request->house_number,
                    'unique_id' => $uniqueId,
                ]);

                return redirect('/dashboard');
            }
        }
        
