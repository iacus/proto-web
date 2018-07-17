//scripts.js
//Global variables
var urlImages = "proto-web/content/";
var theBlack = $('.the-black');
var theBlackJs = document.querySelector('.the-black');
var defaultTheBlack = theBlack.css('background-image');

//Preloader

$(document).ready(function() {

  if (theBlack.parents('.visible-the-black').length) {

    setTimeout(function() {
      if (theBlack.parents('.the-black-0').length) {
        animateTheBlack('0%');
      } else {
        animateTheBlack('46%');
      }

    }, 1500);
  }

});

//Animate The-black transition
$(".theBlackToBlack").on({
  click: function(event) {
    event.preventDefault();
    const thisLink = $(this).attr('href');
    var fullWidth = window.innerWidth;

    animateTheBlack(fullWidth, thisLink);

    console.log("Animate to Black");
    console.log(thisLink);

  }
});

$(".theBlackToWhite").on({
  click: function(event) {
    event.preventDefault();
    const thisLink = $(this).attr('href');

    animateTheBlack(0, thisLink);

    console.log("Animate to White");
    console.log(thisLink);

  }
});

//Animate home projects
function loadHomeContent() {
  console.log("Loading projects home");

  animateTheProjects.play();

}

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

  }
});


$(".js-buttonMenuResponsive").on({
  click: function(event) {
    const menuResponsive = $('.menuResponsive');
    event.preventDefault();

    menuResponsive.toggleClass('js-hidden');

    if (menuResponsive.is('.js-hidden'))
      showMenuResponsive();
    else
      hideMenuResponsive();

    }
  });





$(".js-theBlackImage").on({
  mouseenter: function() {
    const coverImage = $(this).attr('data-cover');
    const coverImageRoute = 'url("' + urlImages + coverImage + '")';

    emptyTheBlack();
    theBlack.find('.image-containter').stop(true, true).delay(600).fadeIn().css('background-image', coverImageRoute);

  },
  mouseleave: function() {
    theBlack.find('.image-containter').stop(true, true).delay(2000).clearQueue().fadeOut().css('background-image', defaultTheBlack);
  }
});


function theBlackMap() {
  const coverImage = "map.png";
  const coverImageRoute = 'url("' + urlImages + coverImage + '")';

  theBlack.find('.image-containter').stop(true, true).delay(600).fadeIn().css('background-image', coverImageRoute);

}

function emptyTheBlack() {
  theBlack.find('.image-containter').stop(true, true).delay(2000).clearQueue().fadeOut().css('background-image', defaultTheBlack);
}

function theBlackProfessional() {
  const items = $('.bio__block__item');
  const firstItem = items.first();
  const coverImage = firstItem.attr('data-cover');
  const coverImageRoute = 'url("' + urlImages + coverImage + '")';
  console.log(coverImage);
  console.log($(this));

  items.first().css('opacity', '1');
  items.not(items.first()).delay(300).animate({opacity: 0.3}, "slow");
  theBlack.find('.image-containter').delay(200).fadeIn("fast").css('background-image', coverImageRoute);

}



//Info panel
$(".info--panel").on({
  click: function(event) {
    const projectInfo = $('.project--info');
    event.preventDefault();

    projectInfo.toggleClass('js-hidden');

    if (projectInfo.is('.js-hidden'))
      showInfoPanel();
    else
      hideInfoPanel();

    }
  });

//flash

$(document).ready(function() {

  var winWidth = $(window).width();
  var winHeight = $(window).height();
  var divider = 1 / $(document).height();

  if (winWidth < 600) {
    var size = winHeight < winWidth
      ? winWidth
      : winHeight;
    $('.flash').css({
      width: size * 2,
      height: size * 2,
      marginTop: -size,
      marginLeft: -size
    });
  }

  // $(document).scroll(function(){
  // 	scrollTop = $(document).scrollTop();
  // 	scale = 1 - (scrollTop * divider);
  // 	$('.flash').css({'transform':'scale(' + scale + ')'});
  // });

  $(document).mousemove(function(e) {
    $('.flash').css({
      top: e.pageY - $(document).scrollTop(),
      left: e.pageX - 800
    });
  });

  document.addEventListener('touchmove', function(e) {
    $('.flash, .flash-white').css({top: e.pageY, left: e.pageX});
    e.preventDefault();
  }, false);

  document.addEventListener('touchstart', function(e) {
    if (!$(e.target).hasClass('link')) {
      $('.flash, .flash-white').css({top: e.pageY, left: e.pageX});
      e.preventDefault();
    }
  }, false);

  document.addEventListener('touchend', function(e) {
    if (!$(e.target).hasClass('link')) {
      colourIndex = colourIndex === 5
        ? colourIndex = 0
        : colourIndex + 1;
      $('.flash').addClass(colours[colourIndex]).removeClass('flashing flash-black');
      $('.flash').show();
      e.preventDefault();
    }
  }, false);

});

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
