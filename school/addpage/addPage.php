<?php
$name = $_POST['name'];
$surname = $_POST['surname'];
$numberr = $_POST['numberr'];
$gender = $_POST['gender'];
#$birthDate = $_POST['birthDate'];
$birthDate = date('Y-m-d', strtotime($_POST['birthDate']));

if (!empty($name) || !empty($surname) || !empty($numberr) || !empty($gender) || !empty($birthDate)) {
 $host = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbname = "test";
    //create connection
    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);
    if (mysqli_connect_error()) {
     die('Connect Error('. mysqli_connect_errno().')'. mysqli_connect_error());
    } else {
     $SELECT = "SELECT numberr From students Where numberr = ? Limit 1";
     $INSERT = "INSERT Into students (name, surname, numberr, gender, birthDate) values(?, ?, ?, ?, ?)";
     //Prepare statement
     $stmt = $conn->prepare($SELECT);
     $stmt->bind_param("i", $numberr);
     $stmt->execute();
     $stmt->bind_result($numberr);
     $stmt->store_result();
     $rnum = $stmt->num_rows;
     if ($rnum==0) {
      $stmt->close();
      $stmt = $conn->prepare($INSERT);
      $stmt->bind_param("sssss", $name, $surname, $numberr, $gender, $birthDate);
      $stmt->execute();
      echo "New record inserted sucessfully";
     } else {
      echo "Someone already students using this email";
     }
     $stmt->close();
     $conn->close();
    }
} else {
 echo "All field are required";
 die();
}
header("Location: ../addpage/addPage.html?submit=sucsess");
?>
