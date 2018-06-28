//scripts.js

var urlImages = "/content/" ;
var theBlack = $('.the-black');
var defaultTheBlack = theBlack.css('background-image');

/**********************************/
/********* projects hover *********/
/**********************************/

$(".project--link").on({
    click: function(event) {
      //event.preventDefault();

    },
    mouseenter: function() {
      const elem = $(this);
      const coverImage = $(this).attr('data-cover');
      const coverImageRoute = 'url("' + urlImages + coverImage + '")';

      theBlack.find('.image-containter').css('background-image', coverImageRoute);
      //theBlack.animate({param1: value1, param2: value2}, speed)
      $(".projects").find('.project--link').not($(this)).clearQueue().animate({opacity: 0.5}, "fast")


    },
    mouseleave: function() {
      theBlack.find('.image-containter').css('background-image', defaultTheBlack);
      $(".projects").find('.project--link').clearQueue().stop(true,true).animate({opacity: 1}, "fast")

    },
    touchstart: function() {


    },
    touchEnd: function() {


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

    },
    touchstart: function() {


    },
    touchEnd: function() {


    }
});

$(".info--panel").on({
    click: function(event) {
      const elem = $(this);
      const projectTitle = $('h2.project--title');
      const infoPanel = $('.project--info');

      event.preventDefault();

      infoPanel.toggle( "slide", function () {
        if (infoPanel.is(":visible")){
          elem.removeClass('dark-gray').addClass('white-90').text('Close');
          projectTitle.removeClass('dark-gray').addClass('white-90');
        } else {
          elem.removeClass('white-90').addClass('dark-gray').text('+ Info');
          projectTitle.removeClass('white-90').addClass('dark-gray');
        }

      } );


    },
    mouseenter: function() {


    },
    mouseleave: function() {


    },
    touchstart: function() {


    },
    touchEnd: function() {


    }
});


//RoyalSlider

// Important note! If you're adding CSS3 transition to slides, fadeInLoadedSlide should be disabled to avoid fade-conflicts.
jQuery(document).ready(function($) {
  var si = $('#gallery-1').royalSlider({
    addActiveClass: true,
    arrowsNav: false,
    controlNavigation: 'none',
    autoScaleSlider: true,
    autoScaleSliderWidth: 960,
    autoScaleSliderHeight: 340,
    loop: true,
    fadeinLoadedSlide: false,
    globalCaption: true,
    keyboardNavEnabled: true,
    globalCaptionInside: false,

    visibleNearby: {
      enabled: true,
      centerArea: 0.5,
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
