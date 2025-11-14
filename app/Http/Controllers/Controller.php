<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Send success response
     */
    protected function successResponse($data = null, string $message = null, int $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     * Send error response
     */
    protected function errorResponse(string $message = null, int $code = 400, $errors = null)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $code);
    }

    /**
     * Send validation error response
     */
    protected function validationErrorResponse($errors)
    {
        return $this->errorResponse('Validation failed', 422, $errors);
    }
}