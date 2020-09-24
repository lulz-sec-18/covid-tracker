/* Template: Evolo - StartUp HTML Landing Page Template
   Author: Inovatik
   Created: June 2019
   Description: Custom JS file
*/


(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

	
	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
			
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	// jQuery for page scrolling feature 
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });

    /* Back To Top Button */
   
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);


///-------------------------->
//Email Subscription
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com",
		"x-rapidapi-key": "1d40027800msh74e8113ce106290p157b84jsn78311d0ac55a",
		"content-type": "application/json",
		"accept": "application/json"
	},
	"processData": false,
	"data": "{  \"personalizations\": [    {      \"to\": [        {          \"email\": \"john@example.com\"        }      ],      \"subject\": \"Hello, World!\"    }  ],  \"from\": {    \"email\": \"from_address@example.com\"  },  \"content\": [    {      \"type\": \"text/plain\",      \"value\": \"Hello, World!\"    }  ]}"
}

$.ajax(settings).done(function (response) {
	console.log(response);
});