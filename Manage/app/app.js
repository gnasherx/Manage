 var config = {
    apiKey: "AIzaSyAmKtlVr0v38VXyzO3YU-Fjo7A4zxJQL1k",
    authDomain: "manage-1d80d.firebaseapp.com",
    databaseURL: "https://manage-1d80d.firebaseio.com",
    projectId: "manage-1d80d",
    storageBucket: "manage-1d80d.appspot.com",
    messagingSenderId: "768654120261"
  };

  firebase.initializeApp(config);
  const database=firebase.database();
  var currentuser;
  var projectname;
  var projectref;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    currentuser=user.uid;
    projectref=database.ref('projects').child(currentuser);
    show();

    } else {
      alert('no user!');
    }
  });


  $('#global-new-go-to-project-button').click(
    function(){
      firebase.auth().signOut().then(function() {
         window.location.href="../index.html";
      }).catch(function(error) {
        alert('error occured while signing you out!');
      });
    }
  );

 /*user isoc dropdown*/
 $("#userinfo-Dropdown").hide();
 document.getElementById('user-dropdown-toggle').addEventListener('click' ,openDropdown);
 function openDropdown(){
    $("#userinfo-Dropdown").toggle('fast')
 }

 /*add new project*/
 document.getElementById('submit_project_name').addEventListener('click', function(e){
   e.preventDefault();
   projectname=document.getElementById('project_name').value;

   if(projectname !== ""){
     projectref.push().set({
       name:projectname,
       startdate:new Date().getTime()
     });
     document.getElementById('project_name').value='';
   }else{
     alert("You must enter a new project name!");
   }
   return true;
 });


 function show(){
   //retriveing database values
  projectref.on('child_added', function(snapshot){
   var project = snapshot.val().name;
   console.log(project);
   renderui(project);
   return true;
  });
   return true;
 }

 function renderui(project){
   var div=document.createElement('div');

    div.style.borderBottom="1px solid #E8E8E8";
    div.style.borderTop="1px solid #E8E8E8";
    div.style.display="flex";
    div.style.justifyContent="center";
    div.style.alignItems="center";
    div.style.cursor="pointer";
    div.style.clear="both";
    div.style.color="#2C2D30";
    div.style.fontWeight="600";
    div.style.textAlign="center";
    div.style.padding="10px 0px";
    div.style.fontSize="20px";  








    div.innerText=project;
    var projectlist=document.getElementById('project-list-name');
    projectlist.appendChild(div);
    return true;
 }
