//navbar scroll behaviour---------------------------------------------------------->

$(document).scroll(function () {
  $(".navbar").toggleClass(
    "scrolled",
    $(this).scrollTop() > $(".navbar").height()
  );
});

window.onscroll = function () {
  if ($(".navbar").offset().top > 60) {
    $(".dropdown-menu").removeClass("top-collapse");
  } else {
    $(".dropdown-menu").addClass("top-collapse");
  }
};
//NAVBAR END------------------------------------------------------------------------->

//DARK MODE -------------------------------------------------------------------------->

//Toggle the button binding
const btn = document.querySelector(".btn-toggle");
btn.addEventListener("click", function () {
  // Then toggle (add/remove) the .dark-theme class to the body
  document.body.classList.toggle("dark-theme");

  //logo text color change in dark mode
});
$(document).ready(function () {
  var flag = 0;
  $("input.btn-toggle").click(function () {
    if (flag == 0) {
      $(".logo-src").attr("src", "images/logo_white.svg");
      flag = 1;
    } else if (flag == 1) {
      $(".logo-src").attr("src", "images/logo.svg");
      flag = 0;
    }
  });
});

//DARK MODE END----------------------------------------------------------------->

//lOGIN/SINGUP FORM-------------------------------------------------------------->

//form signup to login or vice-versa class toggle

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

//display form on click at login

function showForm() {
  document.querySelector(".popup").style.display = "flex";
  document.querySelector(".frame-prof").style.display = "none";
}

// closes form on clicking cross

document.getElementById("close").addEventListener("click", function (e) {
  document.querySelector(".popup").style.display = "none";
});
// closes details on clicking cross

document.getElementById("close2").addEventListener("click", function (e) {
  document.querySelector(".popup").style.display = "none";
});

//on submit event functions
function signup() {
  document.querySelector(".popup").style.display = "none"; //hide form

  let head = "Sign Up Successful";
  let body_text = "You are subscribed to daily corona updates";
  createCustomNotification(head, body_text); // notification on signing up
}

function signin(name, photoUrl, email, verification) {
  document.querySelector(".popup").style.display = "none"; //hide form

  let head = "Sign in Successful";
  let body_text = "Welcome  to covitrax " + name;

  createCustomNotification(head, body_text);
  document.querySelector(".name").innerText = name;
  document.querySelector(".prof-img").setAttribute("src", photoUrl); // notification on signing in
  document.querySelector(".user-email").innerText = email;
  if (verification) {
    document.querySelector(".btn-verify").innerText = "Verified";
    document.querySelector(".btn-verify").style.backgroundColor = "#23DC3D";
    document.querySelector(".btn-verify").style.borderColor = "#23DC3D";
  } else {
    document.querySelector(".btn-verify").innerText = "Verify";
    document.querySelector(".btn-verify").style.backgroundColor = "#fa3e2b";
    document.querySelector(".btn-verify").style.borderColor = "#fa3e2b";
  }

  if (photoUrl == null) {
    $(".prof-img").attr("src", "images/profile.png");
  }
}
//END--------------------------------------------------------------------------->

//NOTIFICATION------------------------------------------------------------------>

//TO REMOVE NOTIFICATION

function removeNotifications() {
  const notifications = document.querySelectorAll(".visible"); // All elements with visible class
  if (notifications.length > 0) {
    notifications.forEach((noti) => {
      noti.classList.add("remove");
      setTimeout(() => {
        noti.remove(); // removing element
      }, 300);
    });
  }
}

//notification div maker function

function createCustomNotification(head, body_text) {
  let noti = document.createElement("div");
  let h3 = document.createElement("h3"); //creates Elements
  let p = document.createElement("p");
  h3.innerHTML = head;
  p.innerHTML = body_text;
  noti.className = "notification"; //Add Classes
  h3.className = "noti-head";
  p.className = "noti-body";
  noti.appendChild(h3); //appending to parent element
  noti.appendChild(p);
  document.body.appendChild(noti);
  removeNotifications(); //hiding After timeout
  setTimeout(() => {
    noti.classList.add("visible");
  }, 10);

  setTimeout(() => {
    noti.classList.add("remove");
    setTimeout(() => {
      noti.remove();
    }, 300);
  }, 2500);
}
let onLoadHead = "Welcome to CoviTrax";
let onLoadBody = "Here you will get overall cencus of Covid-19"; // variable stored content
createCustomNotification(onLoadHead, onLoadBody);

formDrop = (Head, Body) => {
  document.querySelector(".popup").style.display = "none";
  createCustomNotification(Head, Body);
};
DetailsDrop = (Head, Body) => {
  document.querySelector(".frame-prof").style.display = "none";
  createCustomNotification(Head, Body);
};

//END-------------------------------------------------------------------------------->

// function boto () {
//   let js = document.createElement('script');
//   js.type = 'text/javascript';
//   js.async = 1;
//   js.src = 'https://go.botmaker.com/rest/webchat/p/74NGS7JADrcb/init.js?l=en&t=w';
//   document.body.appendChild(js);
// }
// boto();
// var flag2 = 0

// USER AUTHENTICATION--------------------------------------------------------------------->

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;

    if (user != null) {
      flag2 = 1;

      $("#logOut").attr("disabled", false);
      document.querySelector(".login-item").style.display = "none";
      document.querySelector(".detail-item").style.display = "flex";
      signin(user.displayName, user.photoURL, user.email, user.emailVerified);
    }
  } else {
    // No user is signed in.
    document.querySelector(".login-item").style.display = "flex";
    document.querySelector(".detail-item").style.display = "none";
  }
});

//Forgot PassWord

forgotPass = () => {
  var auth = firebase.auth();
  var emailAddress = document.getElementById("email_field").value;
  if (emailAddress != null) {
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        formDrop(
          "Don't Take Stress",
          "We have sent Password reset link to your email"
        );
      })
      .catch(function (error) {
        // An error happened.
        window.alert("Error :" + error.message);
      });
  }
};
//Forgot Password Ends

//signin

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
 
  var flag = 1;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .catch(function (error) {
      // // //     // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);
      flag = 0;

      // ...
    });
  var user = firebase.auth().currentUser;
  signin(user.displayName, user.photoURL, user.email, user.emailVerified);
}

//sign Up

function ogin() {
  var userEmail = document.getElementById("mail_field").value;
  var userPass = document.getElementById("assword_field").value;
  var userName = document.getElementById("userName").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPass)
    .then(function () {
      var user = firebase.auth().currentUser;

      user
        .updateProfile({
          displayName: userName,
        })
        .then(function () {
          signin(
            user.displayName,
            user.photoURL,
            user.email,
            user.emailVerified
          ); // Update successful.
        })
        .catch(function (error) {
          // An error happened.
        });
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);

      // ...
    });
}
//Logout

function logout() {
  firebase.auth().signOut();
  document.querySelector(".name").innerText = "user";
  document.querySelector(".prof-img").setAttribute("src", "images/profile.png");
  $("#logOut").attr("disabled", true);
  document.querySelector(".user-email").innerText = "Email";
  DetailsDrop("LogOut Successful", "Come back again ,Thank you");
}

// google signin

googleSignIn = () => {
  base_provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(base_provider)
    .then(function (result) {
     
      var user = result.user;
      document.querySelector("#logOut").innerText = "LogOut";
      signin(user.displayName, user.photoURL, user.email, user.emailVerified);
    })
    .catch(function (err) {
     
    });
};

//facebook sign in

facebookSignIn = () => {
  base_provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(base_provider)
    .then(function (result) {
      var user = result.user;
      signin(user.displayName, user.photoURL, user.email, user.emailVerified); //display Name in notification
    })
    .catch(function (err) {
     
    });
};

//Verify user by sending verification email

function verifyUser() {
  var user = firebase.auth().currentUser;
  if (!user.emailVerified) {
    user
      .sendEmailVerification()
      .then(function () {
        DetailsDrop(
          "Verification Email Sent",
          "Go to your inbox to verify your email"
        );
      })
      .catch(function (error) {
        // An error happened.
      });
  }
}

//END------------------------------------------------------------------------->

//DETAILS BOX----------------------------------------------------------------->

// detail box closing function

document.getElementById("prof-close").addEventListener("click", function (e) {
  // closes Details on clicking cross
  document.querySelector(".frame-prof").style.display = "none";
});

//detail box opening function

showDetails = () =>
  (document.querySelector(".frame-prof").style.display = "flex");

//EXTRA JQUERY--------------------------------------------------------------------->

//Make form and details card draggable

$(function () {
  $("#draggable").draggable(); //draggable jquery
});
$(function () {
  $("#draggable-prof").draggable(); //draggable jquery
});
