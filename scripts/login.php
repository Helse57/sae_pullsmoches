<?php

require("./connexionBDD.php");

$query = "SELECT COUNT(*) FROM CLIENT WHERE login = '" . $_POST['login'] . "' AND password = '" . $_POST['password'] . "'";

// Exécution de la requête
$result = $db->query($query);

$data = $result->fetchAll(PDO::FETCH_ASSOC);

if($data == 1) {
    echo true;
} else echo false;

?>