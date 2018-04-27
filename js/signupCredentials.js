var userDetails = [];
var database;
var prevChapter = [0,0,0];
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
    updateChapterQa(0,0,0);
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
                '<ul style="list-style-type:square" id = "chapters'+i+j+'">';
            var k;
            var temp3 = "";
            for (k = 0; k < database.gradesList[i].subjectList[j].chapterList.length; k++) {
                temp3 += '<li id="chapter'+i+j+k+'"  onclick="updateChapterQa('+i+','+j+','+k+')">' + database.gradesList[i].subjectList[j].chapterList[k].name + '</li>';
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
        '<div  class="col-sm-10"><h1 style="text-align:center">Question & Answer</h1>' +
        '<div id ="chapterDetails">Hi</div>'+
        '</div>' +
        '</div>';

    var myhtmlcode = prevCode.concat(temp);

    document.getElementById('innerbody').innerHTML=myhtmlcode;
    document.getElementById('innerbody').style.backgroundColor="#ffffff";

}

function updateChapterQa(i,j,k) {
    console.log(i);

    var displayContent ='<ul style="list-style-type: none">';

    var l;

    for(l=0;l<database.gradesList[i].subjectList[j].chapterList[k].questionList.length;l++) {
        displayContent += '<li>Q' + (l + 1) + ': ' + database.gradesList[i].subjectList[j].chapterList[k].questionList[l].question + '</li>' +
            '<p> Ans :' + database.gradesList[i].subjectList[j].chapterList[k].questionList[l].answer + '</p>';
    }

    document.getElementById('chapterDetails').innerHTML = displayContent;
    document.getElementById('chapter'+prevChapter[0]+prevChapter[1]+prevChapter[2]).style.color = "#000000";
    document.getElementById('chapter'+prevChapter[0]+prevChapter[1]+prevChapter[2]).style.fontStyle = "normal";
    document.getElementById('chapter'+i+j+k).style.color = "#697eff";
    document.getElementById('chapter'+i+j+k).style.fontStyle = "italic";

    prevChapter[0]=i;
    prevChapter[1]=j;
    prevChapter[2]=k;

}
