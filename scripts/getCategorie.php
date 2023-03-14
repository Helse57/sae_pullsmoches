<?php

require("./connexionBDD.php");

$query = "SELECT * FROM CATEGORIE";

// Exécution de la requête
$result = $db->query($query);

// Récupération des données dans un tableau associatif
$data = $result->fetchAll(PDO::FETCH_ASSOC);
// Conversion des données modifiées en JSON
$json = json_encode($data);

// Retour du JSON
echo $json;

?>