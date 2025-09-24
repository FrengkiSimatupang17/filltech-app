<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Jika user tidak login atau tidak memiliki role yang diizinkan
        if (! $request->user() || ! in_array($request->user()->role, $roles)) {
            // Redirect ke halaman dashboard biasa atau tampilkan error 403
            // abort(403, 'ANDA TIDAK MEMILIKI AKSES.');
            return redirect('/dashboard')->with('error', 'Anda tidak memiliki hak akses.');
        }

        return $next($request);
    }
}