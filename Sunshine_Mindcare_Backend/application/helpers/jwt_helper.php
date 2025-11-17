<?php
defined('BASEPATH') or exit('No direct script access allowed');

if (!function_exists('generate_jwt')) {
    function generate_jwt($data)
    {
        $secret_key = "your_secret_key_here_change_this"; // Change this to a strong secret key
        
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'data' => $data,
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24) // 24 hours expiry
        ]);

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret_key, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }
}

if (!function_exists('verify_jwt')) {
    function verify_jwt($jwt)
    {
        $secret_key = "your_secret_key_here_change_this"; // Same secret key

        $tokenParts = explode('.', $jwt);
        if (count($tokenParts) != 3) {
            return false;
        }

        $header = base64_decode($tokenParts[0]);
        $payload = base64_decode($tokenParts[1]);
        $signatureProvided = $tokenParts[2];

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret_key, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        if ($base64UrlSignature === $signatureProvided) {
            $payloadData = json_decode($payload, true);
            if (isset($payloadData['exp']) && $payloadData['exp'] < time()) {
                return false; // Token expired
            }
            return $payloadData;
        }

        return false;
    }
}

// Add this new function
if (!function_exists('validate_jwt')) {
    function validate_jwt($token)
    {
        return verify_jwt($token);
    }
}
