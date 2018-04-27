var userDetails = [];
var database;

var txt = '';
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
    txt = xmlhttp.responseText;
    database = JSON.parse(txt);
  }
};

xmlhttp.open("GET","json/json.txt",true);
xmlhttp.send();

function getDetails() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    item = {};
    item["username"] = username;
    item["password"] = password;

    userDetails.push(item);
    document.getElementById('username').value="";
    document.getElementById('password').value="";
    return true;
    console.log(userDetails);
}

function loginVerify() {
    if( userDetails.length == 0)
    {
        //window.alert("User does not exists.Please Sign Up");
        document.getElementById('innerbody').innerHTML="User does not exists.Please Sign Up";
        document.getElementById('innerbody').style.backgroundColor="#ffffff";
    }
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    temp = userDetails[0];
    name = temp.username;
    pass = temp.password;
    if ( username == name)
    {
        if( pass == password) {
            onLogin()
            window.alert("Login  Success");
        }
        else
            window.alert("Wrong Password");

    }
    else
    {
        window.alert("Username does not Exist. Please SignUp");

    }
}

function onLogin() {

}