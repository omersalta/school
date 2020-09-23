

var url_string = window.location.href;
var url = new URL(url_string);
var Success = url.searchParams.get("S");
var sucDiv = document.getElementById("sucDiv");
var notSucDiv = document.getElementById("notSucDiv");

if(Success == "yes"){
   sucDiv.style.display = "block";
}
if (Success == "no"){
   notSucDiv.style.display = "block";
}
