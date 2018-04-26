var item = {};

function getDetails() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    item["username"] = username;
    item["password"] = password;

    //userDetails.push(item);
    document.getElementById('username').value="";
    document.getElementById('password').value="";
    return true;
    console.log(item);
}

function loginVerify() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
   // temp = userDetails[0];
    if ( username == item.username)
    {
        document.getElementById('text').value="sucess";
        return true;
    }
    else
    {
        document.getElementById('text').value="fail";
        return false;
    }


}