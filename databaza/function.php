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
        // $query = "INSERT INTO user (name,password,email,address) VALUES ('$name','$hashed_password','$email','$address')";

        // $array = json_decode($filename,true);

        // foreach ($array as $row) {
        //     $sql = "INSERT INTO coach (name,photo,text ) VALUES 
        //     ('".$row["name"]."', '".$row["img"]."', 
        //     '".$row["text"]."'); "; 

        //     $result = mysqli_query($conn,$sql);            
        // }
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

    function loginUser($input){
        global $conn;
        $password = mysqli_real_escape_string($conn,$input['password']);
        $email = mysqli_real_escape_string($conn,$input['email']);
        if (empty(trim($password))){
            return error422('enter password');
        }
        else if (empty(trim($email))){
            return error422('enter email');
        }
        else {
            
            $sql = "SELECT * FROM user where email='$email' ";
            
            $result = mysqli_query($conn,$sql);

            

            if (mysqli_num_rows($result) === 1 ){   
                $row = mysqli_fetch_assoc($result);

                if (password_verify($password,$row['password'])){
                    
                    $data = [
                        'data' =>  $row
                    ];

                    echo json_encode($data);
                    header("HTTP/1.0 201 Created went to database");
                    return json_encode($data);
                }
                else {
                    echo 'incorrect password';
                }
            }
            else {
                echo 'no result';
            }
        }
       
    }

    function storeUser($input) {
       
        global $conn;

        $name = mysqli_real_escape_string($conn,$input['name']);
        $password = mysqli_real_escape_string($conn,$input['password']);
        $email = mysqli_real_escape_string($conn,$input['email']);
        $address = mysqli_real_escape_string($conn,$input['address']);
    
        $hashed_password = password_hash($password,PASSWORD_DEFAULT);
        if(empty(trim($name))){
            return error422('Enter name');
        }
        else if(empty(trim($password))){
            return error422('Enter password');
        }
        else if(empty(trim($email))){
            return error422('Enter email');
        }
        else if(empty(trim($address))){
            return error422('Enter address');
        }
  
        else {

            $query = "INSERT INTO user (name,password,email,address) VALUES ('$name','$hashed_password','$email','$address')";
            $result = mysqli_query($conn,$query);
          
            $last = mysqli_insert_id($conn);
            $secQuery = " SELECT * FROM user WHERE user_id = '$last'";
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
               
                $data = [
                    'status' => 204,
                    'message' => 'No data Found',
                ];
       
                header("HTTP/1.0 405 Method Not Allowed");
                return json_encode($data);
            }
        }    
    
    
    }




    function storeData($input) {
        global $conn;
        $day = mysqli_real_escape_string($conn,$input['day']);
        $description = mysqli_real_escape_string($conn,$input['description']);
        $weight = mysqli_real_escape_string($conn,$input['weight']);
        $reps = mysqli_real_escape_string($conn,$input['reps']);
        $user_fk = mysqli_real_escape_string($conn,$input['user_fk']);
        // $name = mysqli_real_escape_string($conn,$input['name']);
        // $email = mysqli_real_escape_string($conn,$input['email']);
        // $password = mysqli_real_escape_string($conn,$input['password']);
        // $address = mysqli_real_escape_string($conn,$input['address']);

        if(empty(trim($description))){
            return error422('Enter workout description');
        }
        else {

            $query = "INSERT INTO day (day,description,weight,reps,user_fk) VALUES ('$day','$description','$weight', '$reps','$user_fk')";
            $result = mysqli_query($conn,$query);

            $last = mysqli_insert_id($conn);
            $secQuery = " SELECT * FROM day WHERE day_id = '$last'";
            $secResult = mysqli_query($conn,$secQuery);
            $row = mysqli_fetch_assoc($secResult);
            if ($result){
                
                $data = [
                    'last' => $row
                ];

                echo json_encode($data);
                header("HTTP/1.0 201 OK");
                return json_encode($data);
                
            }
            else {
                $data = [
                    'status' => 204,
                    'message' => $requestMethod. 'No data Found',
                ];
                echo 'nok';
                header("HTTP/1.0 405 Method Not Allowed");
                return json_encode($data);
               

            }

        }

    }
    function getMessages(){
        global $conn;
        global $requestMethod;
        $secQuery = "SELECT * FROM contact";
      
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

    function getUsers(){
        global $conn;
        $query = "SELECT email,address,user_id,role FROM user ";
        $query_run = mysqli_query($conn,$query);

        if ($query_run){
            if (mysqli_num_rows($query_run)>0){
                $res = mysqli_fetch_all($query_run,MYSQLI_ASSOC);
                
                $data = [
                    'data' => $res
                    
                ];
            
                echo json_encode($data);
                header("HTTP/1.0 203 OK");
                return json_encode($data);
            }
            else {
                $data = [
                    'status' => 403,
                    'message' => $requestMethod. 'No data Found',
                ];
            
                header("HTTP/1.0 403 Method No data found");
                return json_encode($data);

            }
        }
        else {
            $data = [
                'status' => 406,
                'message' => $requestMethod. 'Method Not Allowed',
            ];
        
            header("HTTP/1.0 406 Method Not Allowed");
            return json_encode($data);
        }

    }

    function getAllExc($params){
        global $conn;
        global $requestMethod;
        if (!isset($params['user_id'])){
            return error422('excercise id not found in url');
        }
        $user_id = mysqli_real_escape_string($conn,$params['user_id']);

 
        $query = " SELECT * FROM day where user_fk = '$user_id' ";
           
        $query_run = mysqli_query($conn,$query);

        if ($query_run){
            if (mysqli_num_rows($query_run)==0){
                $secQuery = "INSERT INTO day (day,description,weight,reps,user_fk) VALUES ('Monday','bench',30,30,'$user_id')";
                $secResult = mysqli_query($conn,$secQuery);
            }
            if (mysqli_num_rows($query_run)>0){
                $res = mysqli_fetch_all($query_run,MYSQLI_ASSOC);
                
                $data = [
                    'data' => $res
                    
                ];
            
                echo json_encode($data);
                header("HTTP/1.0 203 OK");
                return json_encode($data);
                }
            }
            else {
                $data = [
                    'status' => 403,
                    'message' => $requestMethod. 'No data Found',
                ];
            
                header("HTTP/1.0 403 Method No data found");
                return json_encode($data);

            }

           
        }
       
    

    function deleteExc($params){
        global $conn;
        if (!isset($params['day_id'])){
            return error422('excercise id not found in url');
        }
        else if ($params['day_id'] == null){
            return error422('Enter id');
        }

        $excId = mysqli_real_escape_string($conn,$params['day_id']);
        $query = " DELETE FROM day WHERE day_id='$excId' LIMIT 1";
        $result = mysqli_query($conn,$query);

        if ($result){
            if (mysqli_num_rows($result) == 1){
                echo 'u fshi';
                $res = mysqli_fetch_assoc($result);
                $data = [
                    'status' => 200,
                    'message' => 'deleted succ',
                    'data' => $res
                ];
                
                header("HTTP/1.0 200 Deleted succesfully");
                return json_encode($data);
            }  
            else {
                echo 'ncuk';
                $data = [
                    'status' => 404,
                    'message' => $requestMethod. 'Not found',
                ];
            
                header("HTTP/1.0 404 Not found");
                return json_encode($data);
            }
        }
        else {
            $data = [
                'status' => 500,
                'message' => $requestMethod. 'Method Not Allowed',
            ];
        
            header("HTTP/1.0 405 Method Not Allowed");
            return json_encode($data);
        }
    }

?>