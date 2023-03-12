<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header ("Content-Type: application/json; charset=UTF-8");
 
include('function.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 204 nona");
    exit;
}

if ($requestMethod == 'PUT'){

    $inputData = json_decode(file_get_contents("php://input"),true);
    
    if (empty($inputData)){
       $setRole = setRole($_POST);
    }
    else {
        $setRole = setRole($inputData);
        
    }

}



?>