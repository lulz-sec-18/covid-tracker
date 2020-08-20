//   navbar scroll behaviour

$(document).scroll(function(){
    $('.navbar').toggleClass('scrolled', $(this).scrollTop() > $('.navbar').height())
  });

  
  var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-60px";
    document.getElementById("navbar").style.transition = "1s";
  }
  prevScrollpos = currentScrollPos;
}
const btn = document.querySelector('.btn-toggle');

// Listen for a click on the button
btn.addEventListener('click', function() {
  // Then toggle (add/remove) the .dark-theme class to the body
  document.body.classList.toggle('dark-theme');  
})