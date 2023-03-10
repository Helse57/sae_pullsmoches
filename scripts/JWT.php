<?php

require("./connexionBDD.php");

// Configuration de l'expiration du token
$expiration_time = 7200; // en secondes (2 heures)

// Récupération des données POST
$email = $_POST['email'];
$password = $_POST['password'];
$token = $_POST['token'];

// Vérification de la validité du token
if (!empty($token)) {
  $token_parts = explode('.', $token);
  if (count($token_parts) === 3) {
    $header = json_decode(base64_decode($token_parts[0]), true);
    $payload = json_decode(base64_decode($token_parts[1]), true);
    $signature = $token_parts[2];

    // Vérification de la validité de la signature
    $valid_signature = hash_hmac('sha256', $token_parts[0] . '.' . $token_parts[1], 'winterwonderfulbestsite', true);
    $valid_signature = base64_encode($valid_signature);
    if ($signature === $valid_signature) {
      // Vérification de la validité de la date d'expiration
      if ($payload['exp'] > time()) {
        // Token valide, retour du token existant
        echo json_encode(['token' => $token]);
        exit();
      }
    }
  }
}

// Vérification de la validité des données POST
if (!empty($email) && !empty($password)) {
  $query = "SELECT a.num_art, a.nom_art, a.desc_art, a.prix, a.num_categ, c.nom_categ
              FROM ARTICLE a, CATEGORIE c WHERE a.num_categ = c.num_categ";

  $result = $db->query($query);
  $data = $result->fetchAll(PDO::FETCH_ASSOC);
  $numRows = $result->rowCount();
  if ($numRows === 1) {
    $payload = [
      'sub' => $email,
      'exp' => time() + $expiration_time
    ];

    // Création de l'en-tête du token
    $header = [
      'alg' => 'HS256',
      'typ' => 'JWT'
    ];

    $base64_header = base64_encode(json_encode($header));
    $base64_payload = base64_encode(json_encode($payload));
    $signature = hash_hmac('sha256', $base64_header . '.' . $base64_payload, 'your-secret-key', true);
    $base64_signature = base64_encode($signature);
    $token = $base64_header . '.' . $base64_payload . '.' . $base64_signature;

    // Retour du token
    echo json_encode(['token' => $token]);
    exit();
  }


  // Encodage du token

}

// Erreur de données POST
http_response_code(400);
echo json_encode(['error' => 'Invalid email or password']);
exit();
