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



if ($requestMethod == "GET"){
    $getExc = getAllExc($_GET);
     
 }
 
 else {
     $data = [
         'status' => 405,
         'message' => $requestMethod. 'Method Not Allowed',
     ];
 
     header("HTTP/1.0 405 Method Not Allowed");
     echo json_encode($data);
 }
 
?>



