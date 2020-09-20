
//   navbar scroll behaviour

$(document).scroll(function(){
  $('.navbar').toggleClass('scrolled', $(this).scrollTop() > $('.navbar').height())
});



const btn = document.querySelector('.btn-toggle');

// Listen for a click on the button
btn.addEventListener('click', function() {
// Then toggle (add/remove) the .dark-theme class to the body
document.body.classList.toggle('dark-theme');  

//logo text color change in dark mode
})
$(document).ready(function(){
var flag = 0;  
$("input.btn-toggle").click(function(){
  if(flag == 0) {
    $(".logo-src").attr("src","images/logo_white.svg");
    flag = 1;
  }
  else if(flag == 1) {
    $(".logo-src").attr("src","images/logo.svg");
    flag = 0;
  }
});
});

/*form display class toggle*/

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
container.classList.remove("right-panel-active");
});

// document.getElementsById('userButton').addEventListener('click', function(){ // show form by changing display property
// document.querySelector('.popup').style.display = 'flex';
// });
function showForm(){
  document.querySelector('.popup').style.display = 'flex';
  document.querySelector('.frame-prof').style.display='none'
}

document.getElementById('close').addEventListener('click', function(e){ // closes form on clicking cross

document.querySelector('.popup').style.display='none';

});
document.getElementById('close2').addEventListener('click', function(e){

document.querySelector('.popup').style.display='none';

});
//on submit event functions
function signup(){
  document.querySelector('.popup').style.display='none';//hide form
 
  let head = "Sign Up Successful"
  let body_text = "You are subscribed to daily corona updates"
  createCustomNotification(head,body_text) // notification on signing up

}
function signin(name,photoUrl){
  document.querySelector('.popup').style.display='none';//hide form
 
  let head = "Sign in Successful"
  let body_text = "Welcome  to covitrax " + name;
  
  createCustomNotification(head,body_text)
  document.querySelector('.name').innerText = name;
  document.querySelector('.prof-img').setAttribute('src',photoUrl); // notification on signing in

}


//Notification

  function removeNotifications(){
  const notifications = document.querySelectorAll('.visible') // All elements with visible class
  if(notifications.length >0){
    notifications.forEach((noti) =>{ 
      noti.classList.add('remove')
      setTimeout(() =>{
        noti.remove(); // removing element
      }, 300);
    })
  }
}

//notification div maker function

function createCustomNotification(head,body_text){
  let noti = document.createElement('div')
  let h3 = document.createElement('h3')//creates Elements
  let p = document.createElement('p')
  h3.innerHTML = head
  p.innerHTML = body_text
  noti.className = 'notification'//Add Classes
  h3.className = 'noti-head'
  p.className = 'noti-body'
  noti.appendChild(h3) //appending to parent element
  noti.appendChild(p)
  document.body.appendChild(noti)
  removeNotifications() //hiding After timeout
  setTimeout(() => {
    noti.classList.add('visible')
  }, 10);

  setTimeout(() =>{
    noti.classList.add('remove')
    setTimeout(() =>{
      noti.remove()
    }, 300);
  }, 2500);
  
}
let onLoadHead = "Welcome to CoviTrax"
let onLoadBody = 'Here you will get overall cencus of Covid-19' // variable stored content
createCustomNotification(onLoadHead,onLoadBody)

function boto () {
  let js = document.createElement('script');
  js.type = 'text/javascript';
  js.async = 1;
  js.src = 'https://go.botmaker.com/rest/webchat/p/74NGS7JADrcb/init.js?l=en&t=w';
  document.body.appendChild(js);
}
boto();

// User Authentication--------------------------------------------------------------------->

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    // document.getElementById("user_div").style.display = "block";
    // document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      // var email_id = user.email;
      // document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});
formDrop = (Head,Body)=>{
  document.querySelector('.popup').style.display='none';
  createCustomNotification(Head,Body);
}
//Forgot PassWord------------>

forgotPass = () =>{
  var auth = firebase.auth();
var emailAddress = document.getElementById("email_field").value;
if(emailAddress.value != null){
  auth.sendPasswordResetEmail(emailAddress).then(function() {
  formDrop("Don't Take Stress","We have sent reset link to your email");
}).catch(function(error) {
  // An error happened.
  window.alert("Error :" + error.message );
});
}  

}
//Forgot Password Ends---------->


 function login(){

var userEmail = document.getElementById("email_field").value;
var userPass = document.getElementById("password_field").value;
console.log("login pressed");
var flag = 1;

firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  
// // //     // Handle Errors here.

 var errorCode = error.code;
 var errorMessage = error.message;

 window.alert("Error : " + errorMessage);
 flag = 0;

// ...
 });
 

}




// new code starts here


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    // document.getElementById("ser_div").style.display = "block";
    // document.getElementById("ogin_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;

      // document.getElementById("ser_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    // document.getElementById("ser_div").style.display = "none";
    // document.getElementById("ogin_div").style.display = "block";

  }
});
document.getElementById('prof-close').addEventListener('click', function(e){ // closes Details on clicking cross

  document.querySelector('.frame-prof').style.display='none';
  
  });//detail box closing function


showDetails = () =>   document.querySelector('.frame-prof').style.display='flex';

function ogin(){

  var userEmail = document.getElementById("mail_field").value;
  var userPass = document.getElementById("assword_field").value;
  

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
  document.querySelector('#logOut').innerText = "LogIn";
  document.querySelector('.name').innerText = "user";
  document.querySelector('.prof-img').setAttribute('src','images/profile.png');
}
//details Login button

if(document.querySelector("#logOut").innerText == "LogIn"){
  document.querySelector("#logOut").setAttribute('onclick', 'showForm()')
}
else{
  document.querySelector("#logOut").setAttribute('onclick', 'logout()')
}


// google signin

googleSignIn = () => {
  base_provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(base_provider).then(function(result){
    console.log(result)
    console.log("success google account linked")
    var user = result.user;
    document.querySelector('#logOut').innerText = "LogOut";
    signin(user.displayName,user.photoURL);
    
  }).catch(function(err){
    console.log(err)
    console.log("Failed to do")
  })
}


// facebook sign in

// {
//   status: 'connected',
//   authResponse: {
//       accessToken: '...',
//       expiresIn:'...',
//       signedRequest:'...',
//       userID:'...'
//   }
// }

// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }

facebookSignIn = () => {
  base_provider = new firebase.auth.FacebookAuthProvider()
  
  firebase.auth().signInWithPopup(base_provider).then(function(result){
    console.log(result)
    console.log("success facebook account linked")
    signin(result.displayName) //display Name in notification 
  }).catch(function(err){
    console.log(err)
    console.log("Failed to do")
  })
}
//Make form and details card draggable

$( function() {
  $( "#draggable" ).draggable(); //draggable jquery
} );
$( function() {
  $( "#draggable-prof" ).draggable();//draggable jquery
} );

////////////////////////////////////////////---------->






