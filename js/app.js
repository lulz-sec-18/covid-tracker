
//   navbar scroll behaviour

$(document).scroll(function(){
  $('.navbar').toggleClass('scrolled', $(this).scrollTop() > $('.navbar').height())
});


/*var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
if (prevScrollpos > currentScrollPos) {
  document.getElementsByClassName("navbar").style.top = "0";
} else {
  
  document.getElementsByClassName("navbar").style.transition = "1s";
}
prevScrollpos = currentScrollPos;
}
*/
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
    $(".logo-src").attr("src","images/logo.svg");
    flag = 1;
  }
  else if(flag == 1) {
    $(".logo-src").attr("src","images/logo_white.svg");
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

document.getElementById('button').addEventListener('click', function(){
document.querySelector('.popup').style.display = 'flex';
});

document.getElementById('close').addEventListener('click', function(e){

document.querySelector('.popup').style.display='none';

});
document.getElementById('close2').addEventListener('click', function(e){

document.querySelector('.popup').style.display='none';

});

//Notification

  function removeNotifications(){
  const notifications = document.querySelectorAll('.visible')
  if(notifications.length >0){
    notifications.forEach((noti) =>{
      noti.classList.add('remove')
      setTimeout(() =>{
        noti.remove();
      }, 300);
    })
  }
}

function createNotification(){
  let noti = document.createElement('div')
  let h3 = document.createElement('h3')
  let p = document.createElement('p')
  h3.innerHTML = "Welcome to CoviTrax"
  p.innerHTML = 'Here you will get overall cencus of Covid-19'
  noti.className = 'notification'
  h3.className = 'noti-head'
  p.className = 'noti-body'
  noti.appendChild(h3)
  noti.appendChild(p)
  document.body.appendChild(noti)
  removeNotifications()
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
createNotification();







