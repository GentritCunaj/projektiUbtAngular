<?php 
error_reporting(0);
require 'db_connect.php';

    function error422($message){
        $data = [
            'status' => 204,
            'message' => $message, 
        ];
        header("HTTP/1.0 204 $message");
        return json_encode($data);
        exit();

    }


    function storeCoach(){
        global $conn;
        $filename = file_get_contents('coaches.json');
        $secQuery = "SELECT * FROM coach";
      
        $result = mysqli_query($conn,$secQuery);
        $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
        if ($result) {
            $data = [
                'data' =>  $row
            ];

            echo json_encode($data);
            header("HTTP/1.0 203 Fetched");
            return json_encode($data);
        }
        else {
            $data = [
                'status' => 204,
                'message' => 'No data Found',
            ];
   
            header("HTTP/1.0 405 Method Not Allowed");
            return json_encode($data);
        }
       
        
       
    }

    
    function sendForm($input){
        global $conn;
        $name = mysqli_real_escape_string($conn,$input['name']);
        $message = mysqli_real_escape_string($conn,$input['message']);
        $email = mysqli_real_escape_string($conn,$input['email']);
        if (empty(trim($name))){
            return error422('enter name');
        }
        else if (empty(trim($email))){
            return error422('enter email');
        }
        else if (empty(trim($message))){
            return error422('enter message');
        }

        else {
            $sql = "INSERT INTO contact(name,email,message) VALUES ('$name','$email','$message')";
            $result = mysqli_query($conn,$sql);
            $last = mysqli_insert_id($conn);
            $secQuery = " SELECT * FROM contact WHERE contact_id = '$last'";
            $secResult = mysqli_query($conn,$secQuery);
            $row = mysqli_fetch_assoc($secResult);
            if ($result){
        
                $data = [
                    'data' =>  $row
                ];
                
                echo json_encode($data);
                header("HTTP/1.0 201 OK");
                return json_encode($data);
            
            }
            else {
                echo 'not inserted';
            } 
        }    
        
    }

    function setRole($input){
        global $conn;
        $user_id = mysqli_real_escape_string($conn,$input['user_id']);
        $role = mysqli_real_escape_string($conn,$input['role']);
        $sql = "UPDATE user SET role = '$role' WHERE user_id = '$user_id' ";
        $result = mysqli_query($conn,$sql);
        $secSql = "UPDATE user SET role = '$role' WHERE user_id = '$user_id' ";
        $secResult = mysqli_query($conn,$sql);
        $row = mysqli_fetch_assoc($secResult);
        if ($secResult){
            $data = [
                'data' =>  $row
            ];

            echo json_encode($data);
            header("HTTP/1.0 201 Created went to database");
            return json_encode($data);
            
        }
        else {
            $data = [
                'data' =>  $row
            ];

            echo json_encode($data);
            header("HTTP/1.0 201 Created went to database");
            return json_encode($data);
           
        }

        
    }


?>