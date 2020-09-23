let sortDirections = false;
let studentData = [];
var lastSortedParam = "";
var TOTAL_STUDENT_ROW = 1;
var linkNum = 0;
var maxLinkNum = 1;
var lastOffset = 0;

window.onload = () => {
    loadTables("id");
};

function loadTables(orderSelection) { //it call from onload and change about tbody
    console.log("loadtable çalıştı");
    var limit = document.getElementById("editShowRowNumbers").value;
    if (orderSelection != "dont") { // we dont/do need change about orderSelection
        if (lastSortedParam === orderSelection) {
            sortDirections = !sortDirections; //toggle for direction ASC-DESC?
            linkNum = 0;
            lastOffset = 0;
        }
        else {
            sortDirections = false;
            linkNum = 0;
            lastOffset = 0;
        }
        lastSortedParam = orderSelection;
    }
    else {
        orderSelection = lastSortedParam;
        linkNum = parseInt(lastOffset / limit);

    }
    console.log("linknum=", linkNum);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            studentData = JSON.parse(this.responseText);
            const tableBody = document.getElementById("tableBody");
            let tableBodyHtml = '';

            for (let student of studentData) {
                var sBirthDate = student.birthDate.split("-").reverse().join("-")
                tableBodyHtml += "<tr>" +
                    "<td>" + student.name + "</td>" +
                    "<td>" + student.surName + "</td>" +
                    "<td>" + student.number + "</td>" +
                    "<td>" + student.class + "</td>" +
                    "<td>" + student.gender + "</td>" +
                    "<td>" + sBirthDate + "</td> " +
                    "<td> <button type='button' onClick='editStudent(" + student.number + ")' class='btn btn-outline-light'" +
                    "data-toggle='modal' data-target='.bd-example-modal-xl'>" +
                    "<i class='fa fa-edit'></i>" +
                    "</button>" +
                    "</td> " +
                    "</tr> ";
            }
            tableBody.innerHTML = tableBodyHtml;
        }

    };
    
    xhttp.open("GET", "showPage.php?order=" + String(orderSelection) + "&direction=" +
        sortDirections + "&limit=" + String(limit) + "&offset=" + String(lastOffset), true);
    xhttp.send();
    loadTotalStudentRow();
}

function setPageNumber(pageNumber) {
    if (pageNumber < 1) {
        pageNumber = 1;
    }
    if (maxLinkNum + 1 < pageNumber) {
        pageNumber = maxLinkNum + 1;
    }
    linkNum = pageNumber - 1;
    lastOffset = (linkNum * document.getElementById("editShowRowNumbers").value)
    loadTables('dont');
}

function loadTotalStudentRow() { //it call from loadTables

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            TOTAL_STUDENT_ROW = parseInt(this.responseText);
            const tableFoot = document.getElementById("tableFoot");
            let tableFootHtml = '';
            var i = 0;
            var whichPage;
            while (TOTAL_STUDENT_ROW > 0) {
                if (linkNum === i) {
                    tableFootHtml += " <a style='color:#6f8171; margin:0.4rem;'>" + i + "</a> ";
                    whichPage = i;
                }
                else {
                    tableFootHtml += " <a class='pLink' onClick='setPageNumber(" +
                        (i + 1) + ")' style='color:white; margin:0.4rem; cursor: pointer;'>" + i + "</a> ";
                }
                i = i + 1;
                TOTAL_STUDENT_ROW = TOTAL_STUDENT_ROW - document.getElementById("editShowRowNumbers").value;
            }
            tableFoot.innerHTML = "<a class='pLink' style='cursor: pointer; color:white;' onClick='setPageNumber(" + (whichPage) + ")'>Prev< </a> " + tableFootHtml +
                "<a class='pLink' style='cursor: pointer; color:white;' onClick='setPageNumber(" + (whichPage + 2) + ")'> >Next </a> ";
            maxLinkNum = i - 1;
        }
    };
    xhttp.open("GET", "showPage.php?order=giveMeTotalRow&direction=true&limit=15&offset=0", true);
    xhttp.send();

}

function editStudent(sNumber) { //it call from edit or delete a student
    lastEditedStdNum = sNumber;
    editInProgress = true;
    document.getElementById("genderF").checked = false;
    document.getElementById("genderM").checked = false;
    for (i = 0; i < studentData.length; i++) {
        if (studentData[i].number == sNumber) {
            document.getElementsByName("name")[0].value = studentData[i].name;
            document.getElementsByName("surName")[0].value = studentData[i].surName;
            document.getElementsByName("numberr")[0].value = studentData[i].number;
            document.getElementById("editClassNumber").value = studentData[i].class[0].toUpperCase();
            document.getElementById("editClassLetter").value = studentData[i].class[1].toUpperCase();
            document.getElementById("editDate").defaultValue = studentData[i].birthDate;
            if (studentData[i].gender == "M")
                document.getElementById("genderM").checked = true;
            else
                document.getElementById("genderF").checked = true;
        }
    }
}

function saveChangesClose() { //after close modal prepare another edit click
    $(document).ready(function() {
        var myElement = $(".loader");
        myElement.hide(10);
      });
      document.getElementById("notSucChange").style.display = "none";
      document.getElementById("sucChange").style.display = "none";
      loadTables('dont');
}
var lastEditedStdNum;
var editInProgress = false;

function saveChanges() {
    $(document).ready(function() {
        var myElement = $(".loader");
        myElement.show(1);
      });
    var name, surName, number, clas, gender, birtDate;
    name = document.getElementsByName("name")[0].value;
    surName = document.getElementsByName("surName")[0].value;
    number = document.getElementsByName("numberr")[0].value;
    clas = document.getElementById("editClassNumber").value + document.getElementById("editClassLetter").value;
    if (document.getElementById("genderF").checked)
        gender = "F";
    else
        gender = "M";
    birtDate = document.getElementById("editDate").defaultValue;

    console.log("name:", name, "surName:", surName, "number:", number, "clas:", clas, "gender:", gender, "birthDate =", birtDate[1]);


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        document.getElementById("notSucChange").style.display = "none";
        document.getElementById("sucChange").style.display = "none";
        
        if (this.readyState == 4 && this.status == 200) {
            console.log("basaşarılı 200 döndü");
            document.getElementById("sucChange").style.display = "inline-block";
            $(document).ready(function() {
                var myElement = $(".loader");
                myElement.hide(1200);
              });
        }
        if (this.readyState == 4 && this.status == 203) {
            $(document).ready(function() {
                var myElement = $(".loader");
                myElement.hide(1200);
              });
            console.log("başarısız 203 döndü");
            document.getElementById("notSucChange").style.display = "inline-block";
        }
        loadTables('dont');
    };
    xhttp.open("POST", "editPage.php?name=" + name +
        "&surName=" + surName +
        "&oldNumber=" + lastEditedStdNum +
        "&number=" + number +
        "&clas=" + clas +
        "&gender=" + gender +
        "&birthDate=" + String(birtDate), true);

    xhttp.send();
    editInProgress = false;
}

function deleteStudent(){
    var number = document.getElementsByName("numberr")[0].value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("basaşarılı 200 döndü");
            document.getElementById("sucChange").style.display = "inline-block";
            $(document).ready(function() {
                var myElement = $(".loader");
                myElement.hide(1200);
              });
        }
        if (this.readyState == 4 && this.status == 203) {
            $(document).ready(function() {
                var myElement = $(".loader");
                myElement.hide(1200);
              });
            console.log("başarısız 203 döndü");
            document.getElementById("notSucChange").style.display = "inline-block";
        }
        loadTables('dont');
    };
    xhttp.open("POST", "createOrDelete.php?operation=del&number=" + number, true);
    xhttp.send();
    editInProgress = false;
}

function randomGenerate(){
    var number = document.getElementById("genSel").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("basaşarılı 200 döndü");
            document.getElementById("genResponse").style.display = "inline-block";
        }
        if (this.readyState == 4 && this.status == 203) {
            console.log("basaşarısız 203 döndü");
        }
        loadTables('dont');
    };
    console.log(number);
    if(number === "Delete"){
        console.log("Delete içindeyiz");
        xhttp.open("POST", "createOrDelete.php?operation=del&number=All", true);
        xhttp.send(); 
        
    }
    else{
        xhttp.open("POST", "createOrDelete.php?operation=CreateRandomStudentByPYTHON&number=" + number, true);
        xhttp.send();
    }
    console.log("generate func çalıştı");
}


