var userDetails = [];
var database;
var prev = [0,0,0];
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


    if(username.length==0||password.length==0)
    {

        window.alert("Username and Password cannot be empty");
        return false;

    }
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
        window.alert("User does not exists.Please Sign Up");

    }
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var i;
    for(i=0;i<userDetails.length;i++)
    {
        if(username == userDetails[i].username)
        {
            pass = userDetails[i].password;

            if( pass == password) {
                document.getElementById('logout').style.visibility = "visible";
                onLogin();
                window.alert("Login  Success");

                return true;
            }
            else {
                window.alert("Wrong Password");
                return false;
            }




        }
    }
    window.alert("Username does not Exist. Please SignUp");
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
        '<div  class="col-sm-10 jumbotron myjumbo"><h1 class="display-6" style="text-align:center">Question & Answer</h1>' +
        '<hr class="my-4">'+
        '<div id ="chapterDetails" class="mycontent" style="overflow-y: scroll">Hi</div>'+
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
    displayContent += '<button id ="showAddPanel" onclick="showAddPannel()" class="btn btn-primary">Add Question</button>';
    displayContent += '<div id ="addQuesForm" style="visibility: hidden" ><form >'+
        '<div  class="form-group ">'+
        '<label for="question">Question</label>'+
        '<br>'+
        '<textarea id = "question" rows="2" cols="50" required></textarea>'+
        '</div>'+
        '<div class="form-group">'+
        '<label for="answer">Answer</label>'+
        '<br>'+
        '<textarea id = answer rows="2" cols="50" required></textarea>'+
        '</div>'+
        '<button id = "addQandAnsBtn" onclick="addQandA()" type="button"  class="btn btn-primary">Add</button>'+
        '</form></div>';


    document.getElementById('chapterDetails').innerHTML = displayContent;
    document.getElementById('chapter'+prev[0]+prev[1]+prev[2]).style.color = "#000000";
    document.getElementById('chapter'+prev[0]+prev[1]+prev[2]).style.fontStyle = "normal";
    document.getElementById('chapter'+i+j+k).style.color = "#697eff";
    document.getElementById('chapter'+i+j+k).style.fontStyle = "italic";

    prev[0]=i;
    prev[1]=j;
    prev[2]=k;

}

function showAddPannel() {

    document.getElementById('showAddPanel').style.visibility = "hidden";
    document.getElementById('addQuesForm').style.visibility = "visible";
}

function addQandA() {
    var ques = document.getElementById('question').value;
    var ans  = document.getElementById('answer').value;
    if( ques == 0 || ans ==0)
    {
        window.alert('Both fields cannot be empty');
        return false;
    }
    var item = {};
    item["question"] = ques;
    item["answer"] = ans;
    database.gradesList[prev[0]].subjectList[prev[1]].chapterList[prev[2]].questionList.push(item);
    updateContent();
    updateChapterQa(prev[0],prev[1],prev[2]);

}

function onLogout() {
    homePage='<div class="form-size">'+
    '<form action="#" method="post">'+
       ' <div class="form-group ">'+
            '<label for="username">Username</label>'+
            '<input type="text" class="form-control" id="username" name="username" placeholder="Username">'+
        '</div>'+
        '<div class="form-group">'+
            '<label for="password">Password</label>'+
            '<input type="password" class="form-control" id="password" name="password" placeholder="Password">'+

        '</div>'+
        '<div id="msg">'+

        '</div>'+
        '<button type="button" onclick="loginVerify()" class="btn btn-primary">Log In</button>'+
        '<button type="button" onclick="getDetails()" class="btn btn-primary"> Sign Up</button>'+
    '</form>'+
'</div>'  ;
    document.getElementById('innerbody').innerHTML=homePage;
    document.getElementById('logout').style.visibility="hidden";
}