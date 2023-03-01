<?php

require("./connexionBDD.php");

$res = $db->query("SELECT ref_art, nom_art, prix_u from articles");

$data = array();
while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
    $row['url'] = "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae_pullsmoches/assets/images/" . $row['ref_art'] . ".png";
    $data[] = $row;
    
}

echo json_encode($data);
