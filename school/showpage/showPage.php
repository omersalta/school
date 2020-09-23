<?php
$order = $_GET['order'];
$direction = $_GET['direction'];
$limit = $_GET['limit'];
$offset = $_GET['offset'];


if($order === "giveMeTotalRow"){
    $link = mysql_connect("localhost", "root", "");
    mysql_select_db("test", $link);
    $result = mysql_query("SELECT * FROM students", $link);
    $num_rows = mysql_num_rows($result);
    echo $num_rows;
    exit;
}

if($direction === "false")
    $direction = "asc";
else
    $direction = "desc";

/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$link = mysqli_connect("localhost",  "root", "", "test");
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}



$students = array();
// Attempt select query execution
$sql = "SELECT * FROM students order by $order $direction LIMIT $limit OFFSET $offset";
if($result = mysqli_query($link, $sql)){
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
            //create new student object and add veriables
            $student = new stdClass();
            $student->name = $row['name'];
            $student->surName = $row['surName'];
            $student->number = $row['numberr'];
            $student->class = $row['class'];
            $student->gender = $row['gender'];
            $student->birthDate = $row['birthDate'];
            //appand our student objects to array
            array_push ($students,$student);
        }
        $myJSON = json_encode($students, JSON_UNESCAPED_UNICODE);
        echo $myJSON;
        // Free result set
        mysqli_free_result($result);

      
    } //if there is nothing in table (our js files wait a json modals so we need to give)
    else{
    
        $student = new stdClass();
        $student->name = "there";
        $student->surName = "is";
        $student->number = "nothing";
        $student->class = "in";
        $student->gender = "student";
        $student->birthDate = "table";
        //appand our student objects to array 
        array_push ($students,$student);
        $myJSON = json_encode($students, JSON_UNESCAPED_UNICODE);
        echo $myJSON;
        // Free result set
        mysqli_free_result($result);
    }
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
 


