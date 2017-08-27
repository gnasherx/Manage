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


  $('#log_out').click(
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
    document.getElementById('recent_project_name').innerText=project;
    renderui(project);
    return true;
   });
    return true;
  }

  function renderui(project){
    var a=document.createElement('a');

    a.style.padding="8px 14px 9px";
    a.style.fontSize="15px";
    a.style.backgounrd="#FBFBFA";
    a.style.color="#555459";
    a.style.fontWeight="500";
    a.style.lineHeight="1.2rem";
    a.style.border="1px solid #A0A0A2"
    a.style.borderRadius=".25rem";
    a.style.boxShadow="none";
    a.style.position="relative";
    a.style.display="flex";
    a.style.textAlign="center";
    a.style.justifyContent="center";
    a.style.cursor="pointer";
    a.style.marginRight="4px";
    a.style.flexWrap="wrap";

     a.innerText=project;
     var projectlist=document.getElementById('project-list-name');
     projectlist.appendChild(a);
     return true;
  }
