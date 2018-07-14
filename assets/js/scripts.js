//scripts.js

//Global variables
var urlImages = "/content/" ;
var theBlack = $('.the-black');
var theBlackJs = document.querySelector('.the-black');
var defaultTheBlack = theBlack.css('background-image');


//Preloader

$(document).ready(function() {

  if (theBlack.parents('.visible-the-black').length) {
    setTimeout(function(){
        animateTheBlack('46%');
      }, 1500);
  }

});

//Animate The-black transition

$(".theBlackToBlack").on({
    click: function(event) {
      event.preventDefault();
      const thisLink = $(this).attr('href');
      var fullWidth = window.innerWidth;

      animateTheBlack(fullWidth,thisLink);

      console.log("Animate to Black");
      console.log(thisLink);

    }
});

$(".theBlackToWhite").on({
    click: function(event) {
      event.preventDefault();
      const thisLink = $(this).attr('href');

      animateTheBlack(0,thisLink);

      console.log("Animate to White");
      console.log(thisLink);

    }
});


function animateTheBlack(bgPosition,thisLink) {
  //Funcion para borrar el target
  //anime.remove(theBlackJs);

  if (thisLink === undefined) thisLink = "noLink";

  anime({
    targets: theBlackJs,
    width: bgPosition,
    easing: 'easeInOutSine',
    complete: function(anim) {
      console.log("Animacion completa");
      console.log(thisLink);

      if (thisLink != "noLink") {
        location.href = thisLink;

      }

      loadHomeContent();

    }
  });
}

  //Animate home projects
  function loadHomeContent() {
      console.log("Loading projects home");


      animateTheProjects.play();


  }


  
  var theProjects = document.querySelectorAll('.projects li');

  var animateTheProjects = anime({
    targets: theProjects,
    opacity: {
      value: 1,
      delay: function(el, i, l) {
        return i * 80;
        console.log("ojete");
      },
    },
    translateY: {
      value: 40,
      //easing: 'linear',
      delay: function(el, i, l) {
        return i * 50;
      }
    },
    autoplay: false
  });





/**********************************/
/********* projects hover *********/
/**********************************/



$(".project--link").on({
    click: function(event) {

      //Por alguna extraña razón no puedo lanzar el método
      //de la animación. Así que lo lanzo a través de la
      //función de carga de los proyectos
      loadHomeContent();
      animateTheProjects.reverse();

      event.preventDefault();




    },
    mouseenter: function() {
      const elem = $(this);
      const coverImage = $(this).attr('data-cover');
      const coverImageRoute = 'url("' + urlImages + coverImage + '")';

      theBlack.find('.image-containter').stop(true, true).delay(1000).fadeIn().css('background-image', coverImageRoute);
      $(".projects").find('.project--link').not($(this)).clearQueue().animate({opacity: 0.5}, "fast")


    },
    mouseleave: function() {
      theBlack.find('.image-containter').stop(true,true).delay(5000).clearQueue().fadeOut().css('background-image', defaultTheBlack);
      $(".projects").find('.project--link').clearQueue().delay(300).animate({opacity: 1}, "fast")

    },
    touchstart: function() {


    },
    touchEnd: function() {


    }
});

//Professionals illustrations
$(".bio__block__item").on({
    click: function(event) {
      event.preventDefault();

    },
    mouseenter: function() {
      const elem = $(this);
      const elemFirstClass = "." + $(this).attr('class').split(' ')[0];
      const coverImage = $(this).attr('data-cover');
      const coverImageRoute = 'url("' + urlImages + coverImage + '")';

      console.log(elemFirstClass);


      theBlack.find('.image-containter').delay(100).stop(true, true).fadeIn().css('background-image', coverImageRoute);
      $(elemFirstClass).not($(this)).clearQueue().animate({opacity: 0.5}, "fast")

    },
    mouseleave: function() {
      const elemFirstClass = "." + $(this).attr('class').split(' ')[0];

      theBlack.find('.image-containter').fadeOut().css('background-image', defaultTheBlack);
      $(elemFirstClass).clearQueue().stop(true,true).delay(100).animate({opacity: 1}, "fast")

    }
});


$("footer").find('.secondary-nav a').on({
    click: function(event) {

    },
    mouseenter: function() {
      const elem = $(this);

      elem.css('opacity', '1');
      $("footer").find('.secondary-nav a').not(elem).clearQueue().stop(true,true).animate({opacity: 0.5}, "fast")
    },
    mouseleave: function() {
      $("footer").find('.secondary-nav a').clearQueue().stop(true,true).css('opacity', '1');

    }
});


//Info panel
$(".info--panel").on({
    click: function(event) {
      const elem = $(this);
      const projectTitle = $('h2.project--title');
      const infoPanel = $('.project--info');

      event.preventDefault();

      infoPanel.toggle( "slide", function () {
        if (infoPanel.is(":visible")){
          //elem.removeClass('dark-gray').addClass('white-90');
          //projectTitle.removeClass('dark-gray').addClass('white-90');
        } else {
          //elem.removeClass('white-90').addClass('dark-gray');
          //projectTitle.removeClass('white-90').addClass('dark-gray');
        }

      } );

    },

});



//flash
/*
$(document).ready(function(){

	var winWidth = $(window).width();
	var winHeight = $(window).height();
	var divider = 1/$(document).height();

	if(winWidth < 600){
		var size = winHeight < winWidth ? winWidth : winHeight;
		$('.flash').css({
			width:size*2,
			height:size*2,
			marginTop:-size,
			marginLeft:-size
		});
	}

	// $(document).scroll(function(){
	// 	scrollTop = $(document).scrollTop();
	// 	scale = 1 - (scrollTop * divider);
	// 	$('.flash').css({'transform':'scale(' + scale + ')'});
	// });

	$(document).mousemove(function(e){
		$('.flash').css({
			top:e.pageY - $(document).scrollTop(),
			left:e.pageX - 800
		});
	});

	document.addEventListener('touchmove', function(e){
		$('.flash, .flash-white').css({
			top:e.pageY,
			left:e.pageX
		});
		e.preventDefault();
	}, false);

	document.addEventListener('touchstart', function(e){
		if(!$(e.target).hasClass('link')){
			$('.flash, .flash-white').css({
				top:e.pageY,
				left:e.pageX
			});
			e.preventDefault();
		}
	}, false);

	document.addEventListener('touchend', function(e){
		if(!$(e.target).hasClass('link')){
			colourIndex = colourIndex === 5 ? colourIndex = 0 : colourIndex + 1;
			$('.flash').addClass(colours[colourIndex]).removeClass('flashing flash-black');
			$('.flash').show();
			e.preventDefault();
		}
	}, false);

});
*/
//RoyalSlider

// Important note! If you're adding CSS3 transition to slides, fadeInLoadedSlide should be disabled to avoid fade-conflicts.
jQuery(document).ready(function($) {
  var si = $('#gallery-1').royalSlider({
    addActiveClass: true,
    arrowsNav: false,
    controlNavigation: 'none',
    autoScaleSlider: true,
    autoScaleSliderWidth: true,
    autoScaleSliderHeight: true,
    loop: true,
    fadeinLoadedSlide: false,
    globalCaption: false,
    keyboardNavEnabled: true,
    globalCaptionInside: false,
    autoHeight: false,
    usePreloader: true,

    visibleNearby: {
      enabled: true,
      centerArea: 0.6,
      center: true,
      breakpoint: 650,
      breakpointCenterArea: 0.64,
      navigateByCenterClick: true
    }
  }).data('royalSlider');

  // link to fifth slide from slider description.
  $('.slide4link').click(function(e) {
    si.goTo(4);
    return false;
  });
});
