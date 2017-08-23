 var config = {
    apiKey: "AIzaSyAmKtlVr0v38VXyzO3YU-Fjo7A4zxJQL1k",
    authDomain: "manage-1d80d.firebaseapp.com",
    databaseURL: "https://manage-1d80d.firebaseio.com",
    projectId: "manage-1d80d",
    storageBucket: "manage-1d80d.appspot.com",
    messagingSenderId: "768654120261"
  };
  firebase.initializeApp(config);

  $('#signout').click(
    function(){
      firebase.auth().signOut().then(function() {
         window.location.href="../index.html";
      }).catch(function(error) {
        alert('error occured while signing you out!');
      });
    }
  );
