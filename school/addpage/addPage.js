let sortDirections = false;
let studentData = [
    { name:"ömer", surName:"salta", number:"328", class:"7-A", birthDate: "08-11-1997" },
    { name:"ömer", surName:"salta", number:"328", class:"7-A", birthDate: "08-11-1997" },
    { name:"ömer", surName:"salta", number:"328", class:"7-A", birthDate: "08-11-1997" },
    { name:"ömer", surName:"salta", number:"328", class:"7-A", birthDate: "08-11-1997" },
];

window.onload = () => {
    laodTableData(studentData);
};

var sub = "<?php  $submit; ?>";

if (sub=="sucsess"){
    document.getElementsByName("submit-suc").innerHTML="eklendi";
}

function laodTableData(studentData) {
    const tableBody = document.getElementById("tableData");
    let dataHtml = '';

    for( let student of studentData) {
        dataHtml += "<tr> <td>"+student.name+"</td> <td>"+student.surName+"</td> <td>"+student.number+
            "</td> <td>"+student.class+"</td> <td>"+student.birthDate+"</td> </tr>";
    }

    tableBody.innerHTML = dataHtml
}