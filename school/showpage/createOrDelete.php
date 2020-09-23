<?php
$operation = $_GET['operation'];
$number = $_GET['number'];

//HTTP example : http://http://localhost/school/showpage/createOrDelete.php?operation=del&number=1

if ($operation !== "CreateRandomStudentByPYTHON"){
  //Deleting operations
  //connection
  $link = mysqli_connect("localhost",  "root", "", "test");
  if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
  }
  else{ // if connection is OK -->

    if (!empty($number)) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "test";
            
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        if($number === "All"){
            // sql to delete a record
            $sql = "DELETE FROM students";
            if ($conn->query($sql) === TRUE) {
              echo "Record deleted successfully";
            } else {
              echo "Error deleting record: " . $conn->error;
            }
        }
        else {
            //check Quarry
            $checkSQL = "SELECT numberr From students Where numberr = $number Limit 1";
            $result = mysqli_query($link, $checkSQL);
            $row = mysqli_fetch_array($result);

            if (!$row['numberr']){
              http_response_code(203);
              echo "Error deleting record: " . $conn->error;
              $conn->close();
            }
            // prepare delete quarry
            $sql = "DELETE FROM students WHERE numberr= $number";
            if ($conn->query($sql) === TRUE) {
                echo "Record deleted successfully";
            } 
            else {
                echo "Error deleting record: " . $conn->error;
            }
            $conn->close();  
        }
    }
  }
}
else{
   //Not delete so start python script
    $str = "cmd /c start /B C:\\xampp\htdocs\school\Utils\RandomGenerator.py $number";
    echo $str;
    $command = escapeshellcmd($str);
    $output = shell_exec($command);    
}
?>