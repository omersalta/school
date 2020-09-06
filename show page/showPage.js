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

function laodTableData(studentData) {
    const tableBody = document.getElementById("tableData");
    let dataHtml = '';

    for( let student of studentData) {
        dataHtml += "<tr> <td>"+student.name+"</td> <td>"+student.surName+"</td> <td>"+student.number+
            "</td> <td>"+student.class+"</td> <td>"+student.birthDate+"</td> </tr>";
    }

    tableBody.innerHTML = dataHtml
}