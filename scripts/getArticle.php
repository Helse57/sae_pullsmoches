<?php

require("./connexionBDD.php");

$query = "SELECT a.num_art, a.nom_art, a.desc_art, a.prix, a.num_categ, c.nom_categ
          FROM ARTICLE a, CATEGORIE c WHERE a.num_categ = c.num_categ";


// Exécution de la requête
$result = $db->query($query);

// Récupération des données dans un tableau associatif
$data = $result->fetchAll(PDO::FETCH_ASSOC);
$data_with_url = array_map(function ($item) {
    $item["url"] = "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/assets/images/{$item['nom_art']}.png";
    return $item;
}, $data);

// Conversion des données modifiées en JSON
$json = json_encode($data_with_url);

// Retour du JSON
echo $json;
