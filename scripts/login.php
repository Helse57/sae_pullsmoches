<?php
require("connexionBDD.php");

$key = 'winterwonderfulmeilleursite';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);


$mail = $data['email'];
$password = $data['password'];

$payload = json_encode([
    'email' => $mail,
    'password' => $password,
    'iat' => time(),
    'exp' => time() + 3600 // JWT valide pendant 1 heure
]);

$query = "SELECT * FROM CLIENT WHERE mail_cl='" . $mail . "' AND mdp='" . $password . "'";

$result = $db->query($query);

$test = $result->fetchAll(PDO::FETCH_ASSOC);
if (count($test) == 1) {


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
} else {
    exit();
}




// Données à inclure dans le JWT


// Clé secrète pour signer le JWT
