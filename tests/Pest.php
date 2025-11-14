<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| Trait "RefreshDatabase" akan secara otomatis me-reset database
| untuk setiap tes yang kita jalankan. Ini memastikan tes
| kita berjalan di lingkungan yang bersih setiap saat.
|
*/

uses(TestCase::class, RefreshDatabase::class)->in('Feature');