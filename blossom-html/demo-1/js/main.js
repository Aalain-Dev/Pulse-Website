/*-----------------------------------------------------------------------------------*/
/* 		Mian Js Start 
/*-----------------------------------------------------------------------------------*/
$(document).ready(function ($) {
	"use strict"

	/*-----------------------------------------------------------------------------------*/
	/* 		CLIENTS LOGO SLIDE
	/*-----------------------------------------------------------------------------------*/
	$(".services-slide").owlCarousel({
		autoplay: true,
		autoplayHoverPause: true,
		singleItem: true,
		navText: ["<i class='ion-ios-arrow-thin-left'></i>", "<i class='ion-ios-arrow-thin-right'></i>"],
		lazyLoad: true,
		nav: true,
		loop: true,
		margin: 30,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1200: {
				items: 3
			},
		}
	});

	/*-----------------------------------------------------------------------------------
		TESTI SLIDERS
	/*-----------------------------------------------------------------------------------*/
	$(".testi-slides").owlCarousel({
		items: 1,
		autoplay: true,
		autoplayHoverPause: true,
		singleItem: true,
		navText: ["<i class='ion-ios-arrow-thin-left'></i>", "<i class='ion-ios-arrow-thin-right'></i>"],
		lazyLoad: true,
		nav: true,
		loop: true,
		animateOut: 'fadeOut'
	});

	/*-----------------------------------------------------------------------------------
		Animated progress bars
	/*-----------------------------------------------------------------------------------*/
	$('.progress-bars').waypoint(function () {
		$('.progress').each(function () {
			$(this).find('.progress-bar').animate({
				width: $(this).attr('data-percent')
			}, 500);
		});
	},
		{
			offset: '100%',
			triggerOnce: true
		});

	/*-----------------------------------------------------------------------------------*/
	/*	ISOTOPE PORTFOLIO
	/*-----------------------------------------------------------------------------------*/
	var $container = $('.port-wrap .items');
	$container.imagesLoaded(function () {
		$container.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry'
		});
	});
	$('.filter li a').on('click', function () {
		$('.filter li a').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector
		});
		return false;
	});

	/*-----------------------------------------------------------------------------------*/
	/*  SLIDER REVOLUTION
	/*-----------------------------------------------------------------------------------*/
	jQuery('.tp-banner').show().revolution({
		dottedOverlay: "none",
		delay: 10000,
		startwidth: 1170,
		startheight: 900,
		navigationType: "bullet",
		navigationArrows: "solo",
		navigationStyle: "preview4",
		parallax: "mouse",
		parallaxBgFreeze: "on",
		parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],
		keyboardNavigation: "on",
		shadow: 0,
		fullWidth: "on",
		fullScreen: "off",
		shuffle: "off",
		autoHeight: "off",
		forceFullWidth: "off",
		fullScreenOffsetContainer: ""
	});

	/*-----------------------------------------------------------------------------------*/
	/*  POP UP MENU
	/*-----------------------------------------------------------------------------------*/
	var is_bouncy_nav_animating = false;
	//open bouncy navigation
	$('.cd-bouncy-nav-trigger').on('click', function () {
		triggerBouncyNav(true);
	});
	//close bouncy navigation
	$('.cd-bouncy-nav-modal .cd-close').on('click', function () {
		triggerBouncyNav(false);
	});
	$('.cd-bouncy-nav-modal').on('click', function (event) {
		if ($(event.target).is('.cd-bouncy-nav-modal')) {
			triggerBouncyNav(false);
		}
	});
	function triggerBouncyNav($bool) {
		//check if no nav animation is ongoing
		if (!is_bouncy_nav_animating) {
			is_bouncy_nav_animating = true;
			//toggle list items animation
			$('.cd-bouncy-nav-modal').toggleClass('fade-in', $bool).toggleClass('fade-out', !$bool).find('li:last-child').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
				$('.cd-bouncy-nav-modal').toggleClass('is-visible', $bool);
				if (!$bool) $('.cd-bouncy-nav-modal').removeClass('fade-out');
				is_bouncy_nav_animating = false;
			});
			//check if CSS animations are supported... 
			if ($('.cd-bouncy-nav-trigger').parents('.no-csstransitions').length > 0) {
				$('.cd-bouncy-nav-modal').toggleClass('is-visible', $bool);
				is_bouncy_nav_animating = false;
			}
		}
	}
});

/*-----------------------------------------------------------------------------------*/
/*    CONTACT FORM
/*-----------------------------------------------------------------------------------*/
function checkmail(input) {
	var pattern1 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if (pattern1.test(input)) { return true; } else { return false; }
}
function proceed() {
	var name = document.getElementById("name");
	var email = document.getElementById("email");
	var company = document.getElementById("company");
	var web = document.getElementById("website");
	var msg = document.getElementById("message");
	var errors = "";
	if (name.value === "") {
		name.className = 'error';
		return false;
	}
	else if (email.value === "") {
		email.className = 'error';
		return false;
	}
	else if (checkmail(email.value) === false) {
		alert('Please provide a valid email address.');
		return false;
	}
	else if (company.value === "") {
		company.className = 'error';
		return false;
	}
	else if (web.value === "") {
		web.className = 'error';
		return false;
	}
	else if (msg.value === "") {
		msg.className = 'error';
		return false;
	}
	else {
		$.ajax({
			type: "POST",
			url: "php/submit.php",
			data: $("#contact_form").serialize(),
			success: function (msg) {
				//alert(msg);
				if (msg) {
					$('#contact_form').fadeOut(1000);
					$('#contact_message').fadeIn(1000);
					document.getElementById("contact_message");
					return true;
				}
			}
		});
	}
};

// Step 1: IDs for buttons and modals
var read_more_btn = ["btn1", "btn2", "btn3"];
var modal = ["modal1", "modal2", "modal3"];

// Step 2: Convert ID names into actual elements
var find_read_more = read_more_btn.map((name) => document.querySelector("#" + name));
var modal_map = modal.map((name) => document.querySelector("#" + name));
console.log(find_read_more);

// Step 3: Loop through all buttons
find_read_more.forEach((button, index) => {
  // On click of each button
  button.addEventListener("click", () => {
    // Show the modal with the same index
    modal_map[index].style.display = "block";
  });
});

// Step 4: Add close functionality for each modal
modal_map.forEach((modalElement) => {
  // Find the close button inside each modal (assumes a .close-btn class)
  var closeBtn = modalElement.querySelector(".close-btn");

  // When close button is clicked, hide the modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modalElement.style.display = "none";
    });
  }

  // Optional: close modal when clicking outside content area
  window.addEventListener("click", (event) => {
    if (event.target === modalElement) {
      modalElement.style.display = "none";
    }
  });
});

const lenis = new Lenis({
  duration: 1.2, // Adjust for desired scroll speed (lower = slower)
  easing: (t) => 1 - Math.pow(1 - t, 3), // Custom easing function for a smooth stop
  smooth: true,
  smoothTouch: false, // Set to true for smooth scrolling on touch devices
  lerp: 0.1, // Controls the interpolation between scroll positions (lower = smoother)
});

// Update Lenis instance on scroll events
lenis.on('scroll', (e) => {
  // Optional: Log scroll events or perform other actions
  console.log(e);
});

// Use requestAnimationFrame to update Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


var data = [{
  values: [50, 30, 20],
  labels: ['Startups', 'SMEs', 'Real Estate & Infrastructure'],
  type: 'pie',
  marker: {
    colors: ['#242552', '#5153b8', '#d9d9d9'] // custom colors
  }
}];

var layout = {
  height: 400,
  width: 500
};
Plotly.newPlot('myDiv', data, layout, { displayModeBar: false });
Plotly.newPlot('myDiv', data, layout);
