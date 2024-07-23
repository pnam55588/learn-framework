<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Throwable;

class CustomResponseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $response = $next($request);
            return $this->formatResponse($response);
        } catch (Throwable $e) {
            return response()->json([
                'error' => true,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
        return response()->json([
            'status' => 'success',
            'data' => $response->original,
        ]);
    }
    protected function formatResponse($response)
    {
        if ($response->getStatusCode() >= 400) {
            return response()->json([
                'error' => true,
                'message' => $response->getContent(),
            ], $response->getStatusCode());
        }
        return response()->json([
            'error' => 'false',
            'data' => $response->original,
        ]);
    }
}
