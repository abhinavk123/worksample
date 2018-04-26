var userDetails = [];

function getDetails() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

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
   // temp = userDetails[0];

    if ( username == item.username)
    {
        document.getElementById('msg').style.color="green";
        document.getElementById('msg').innerHTML="sucess";

        return true;
    }
    else
    {
        document.getElementById('msg').style.color="red";
        document.getElementById('msg').innerHTML="fail";

        return false;
    }


}