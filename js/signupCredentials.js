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
    updateContent();
}

function updateContent() {
     var prevCode = '<div class="row">' +
        '<div id ="content" class="col-sm-2">' +
            '<h1><i> &nbsp; Content</i></h1>' +
            '<ul id = "grade" style="list-style-type:disc">';
            var i;
            var temp = "";
            for(i = 0; i< database.gradesList.length ; i++) {

                temp += '<li>' + database.gradesList[i].name;
                var j = "";
                temp += '<ul id = "subject'+i+'">';
                var temp2 = "";
                for (j = 0; j < database.gradesList[i].subjectList.length; j++) {

                    temp2 += '<li>' + database.gradesList[i].subjectList[j].name +
                        '<ul id = "chapter'+i+j+'">';
                    var k;
                    var temp3 = "";
                    for (k = 0; k < database.gradesList[i].subjectList[j].chapterList.length; k++) {
                        temp3 += '<li><a onclick="updateChapterQa(i,j,k)">' + database.gradesList[i].subjectList[j].chapterList[k].name + '</a></li>';
                    }
                    temp2 = temp2.concat(temp3);
                    temp2 += '</ul>';
                    temp2 += '</li>';
                }
                temp = temp.concat(temp2);
                temp += '</ul>';

                temp += '</li>';
            }
            temp += '</ul>'+
        '</div>' +
        '<div id =chapterDetails" class="col-sm-10">.col-sm-4</div>' +
    '</div>';
    var myhtmlcode = prevCode.concat(temp);
    document.getElementById('innerbody').innerHTML=myhtmlcode;
document.getElementById('innerbody').style.backgroundColor="#ffffff";

}

function updateChapterQa(i,j,k) {
    document.getElementById('chapterDetails').innerHTML="Hello"+i+j+k;

}