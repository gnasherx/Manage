var firebaseRef=firebase.database().ref();


function pushBtn(){
  var ref=firebaseRef.child("users").push().set("Akshay");
}
