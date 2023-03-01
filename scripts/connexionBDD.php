<?php

$db_config['SGBD'] = 'mysql';
$db_config['HOST'] = 'devbdd.iutmetz.univ-lorraine.fr';
$db_config['DB_NAME'] = 'thieba218u_pullsmoches';
$db_config['USER'] = 'thieba218u_appli';
$db_config['PASSWORD'] = '32111030'; 

try{
    $db = new PDO( $db_config['SGBD'].':host='.$db_config['HOST'].';dbname='.$db_config['DB_NAME'], $db_config['USER'], $db_config['PASSWORD'], array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
   
    unset($db_config);
   }
   catch( Exception $exception ) {
        die($exception->getMessage());
   }
