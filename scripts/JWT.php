<?php
// En-tête du JWT
$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

// Données à inclure dans le JWT
$payload = json_encode([
    'email' => 'hugothiebaut22@gmail.com',
    'password' => 'test',
    'iat' => time(),
    'exp' => time() + 3600 // JWT valide pendant 1 heure
]);

// Clé secrète pour signer le JWT
$key = 'winterwonderfulmeilleursite';

// Encodage de la partie en-tête et de la partie payload en base64
$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

// Signature du JWT
$signature = hash_hmac('sha256', "$base64UrlHeader.$base64UrlPayload", $key, true);
$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

// JWT final
$jwt = "$base64UrlHeader.$base64UrlPayload.$base64UrlSignature";

// Affichage du JWT
echo $jwt;
?>
