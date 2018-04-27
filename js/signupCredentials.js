var userDetails = [];

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
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    temp = userDetails[0];
    name = temp.username;
    pass = temp.password;
    if ( username == name)
    {
        if( pass == password) {
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