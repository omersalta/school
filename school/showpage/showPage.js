let sortDirections = false;
let studentData = [
    { name:"ömer", surName:"salta", number:"112", class:"7-A", gender:"M", birthDate: "1992-08-03" },
    { name:"semih", surName:"salta", number:"462", class:"2-b", gender:"F", birthDate: "1996-04-24" },
    { name:"sena", surName:"salta", number:"963", class:"7-c", gender:"M", birthDate: "1997-08-11" },
    { name:"fatma", surName:"salta", number:"372", class:"8-A", gender:"F", birthDate: "1998-08-11" },
    { name:"fatma", surName:"salta", number:"375", class:"8-A", gender:"F", birthDate: "1994-09-02" },
    { name:"fatma", surName:"salta", number:"379", class:"8-A", gender:"F", birthDate: "1996-08-30" },
];

window.onload = () => {
    laodTableData(studentData);
};

function laodTableData(studentData) {
    const tableBody = document.getElementById("tableData");
    let dataHtml = '';

    for( let student of studentData) {
        var sBirthDate = student.birthDate.split("-").reverse().join("-")
        dataHtml += "<tr> <td>"+student.name+"</td> <td>"+student.surName+"</td> <td>"+student.number +
         "</td> <td>"+student.class.toUpperCase()+"</td> <td>"+student.gender+"</td> <td>"+sBirthDate+"</td>" +
         " <td class='noM' > <button type='button' onClick='editStudent("+student.number+")' class='btn btn-outline-light' "+
         "data-toggle='modal' data-target='.bd-example-modal-xl'><i class='fa fa-edit'></i></button></td> </tr> ";
    }
    tableBody.innerHTML = dataHtml;
}

function editStudent(sNumber){
    document.getElementsByName("genderF")[0].checked=false;
    document.getElementsByName("genderM")[0].checked=false;
    for(i=0; i<studentData.length;i++) {
        if(studentData[i].number == sNumber){
            document.getElementsByName("name")[0].value = studentData[i].name;
            document.getElementsByName("surName")[0].value = studentData[i].surName;
            document.getElementsByName("numberr")[0].value = studentData[i].number;
            document.getElementById("editClassNumber").value = studentData[i].class[0].toUpperCase();
            document.getElementById("editClassLetter").value = studentData[i].class[2].toUpperCase();
            document.getElementById("editDate").defaultValue = studentData[i].birthDate;
            if(studentData[i].gender == "M")
                document.getElementsByName("genderM")[0].checked=true;
            else
                document.getElementsByName("genderF")[0].checked=true;
        }
    }
}
