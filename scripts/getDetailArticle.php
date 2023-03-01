<?php

require("./connexionBDD.php");

$query = "SELECT d.ref_art, d.num_art, c.couleur, c.remise_couleur, t.taille, t.remise_taille
FROM DETAIL_ARTICLE d
JOIN COULEUR c ON d.num_col = c.num_col
JOIN TALLE t ON d.num_taille = t.num_taille 
WHERE d.num_art = " . $_GET["num_art"];

$result = $db->query($query);

// Récupération des données dans un tableau associatif
$data = $result->fetchAll(PDO::FETCH_ASSOC);

// Modification de la structure des données pour inclure les informations de couleur et de taille
$newData = array();
foreach ($data as $row) {
    $newRow = array(
        'ref_art' => $row['ref_art'],
        'num_art' => $row['num_art'],
        'couleur' => array('couleur' => $row['couleur'], 'remise_couleur' => $row['remise_couleur']),
        'taille' => array('taille' => $row['taille'], 'remise_taille' => $row['remise_taille'])
    );
    $newData[] = $newRow;
}

// Conversion des données en JSON
$json = json_encode($newData);

// Retour du JSON
echo $json;
