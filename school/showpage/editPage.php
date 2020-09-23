<?php
$name = $_GET['name'];
$surName = $_GET['surName'];
$oldNumber = $_GET['oldNumber'];
$number = $_GET['number'];
$clas = $_GET['clas'];
$gender = $_GET['gender'];
$birthDate = $_GET['birthDate'];

//HTTP example : http://localhost/school/showpage/editPage.php?name=%C3%B6mer&surName=salta&oldNumber=1&number=5&clas=8A&gender=F&birthDate=2012-10-10



if ($number !== $oldNumber){
  $link = mysqli_connect("localhost",  "root", "", "test");
  if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
  }
  //prepare Check Qaurry
  $checkSQL = "SELECT numberr From students Where numberr = $number Limit 1";
  $result = mysqli_query($link, $checkSQL);
  $row = mysqli_fetch_array($result);

  if ($row['numberr']){
    http_response_code(203);
  }
  else{
    if (!empty($oldNumber)) {
      // Connection Veriable
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
      // Create Quarry
      $sql = "UPDATE students SET name='$name', surName='$surName', numberr='$number', class='$clas', gender='$gender', birthDate='$birthDate' WHERE numberr= '$oldNumber' ";
      if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
      } else {
        echo "Error updating record: " . $conn->error;
      }
      
      $conn->close();
    }
  }
}
else{
  if (!empty($oldNumber)) {
    // Connection Veriable
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
    // Create Quarry
    $sql = "UPDATE students SET name='$name', surName='$surName', numberr='$number', class='$clas', gender='$gender', birthDate='$birthDate' WHERE numberr= '$oldNumber' ";
    if ($conn->query($sql) === TRUE) {
      echo "Record updated successfully";
    } else {
      echo "Error updating record: " . $conn->error;
    }
    
    $conn->close();
  }
}
?>

