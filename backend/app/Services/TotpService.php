<?php

namespace App\Services;

use OTPHP\TOTP;

class TotpService
{
    /**
     * Generate TOTP secret
     */
    public static function generateSecret(): string
    {
        return TOTP::generate()->getSecret();
    }

    /**
     * Verify TOTP code
     */
    public static function verify(string $secret, string $code): bool
    {
        try {
            $totp = TOTP::create($secret);
            return $totp->verify($code);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Generate backup codes (10 codes)
     */
    public static function generateBackupCodes(): array
    {
        $codes = [];
        for ($i = 0; $i < 10; $i++) {
            $codes[] = bin2hex(random_bytes(4));
        }
        return $codes;
    }

    /**
     * Use a backup code (remove it from list)
     */
    public static function useBackupCode(array $codes, string $code): array
    {
        return array_filter($codes, function ($c) use ($code) {
            return $c !== $code;
        });
    }

    /**
     * Verify a backup code
     */
    public static function verifyBackupCode(array $codes, string $code): bool
    {
        return in_array($code, $codes, true);
    }
}