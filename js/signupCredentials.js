var userDetails = []

function getDetails() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var item = {}

    item["username"] = username;
    item["password"] = password;

    userDetails.push(item)
    console.log(userDetails)
}

function loginVerify() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    userdetails = userDetails

    if( username == userdetails["username"])
    {

    }


}