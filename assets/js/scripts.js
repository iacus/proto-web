//scripts.js


var urlImages = "/content/" ;
var theBlack = $('.the-black');
var defaultTheBlack = theBlack.css('background-image');


/**********************************/
/********* projects hover *********/
/**********************************/

$(".project--link").on({
    click: function(event) {
      event.preventDefault();

    },
    mouseenter: function() {
      const elem = $(this);
      const coverImage = $(this).attr('data-cover');
      const coverImageRoute = 'url("' + urlImages + coverImage + '")';

      theBlack.css('background-image', coverImageRoute);
      //theBlack.animate({param1: value1, param2: value2}, speed)
      $(".projects").find('.project--link').not($(this)).clearQueue().animate({opacity: 0.5}, "fast")


    },
    mouseleave: function() {
      theBlack.css('background-image', defaultTheBlack);
      $(".projects").find('.project--link').clearQueue().stop(true,true).animate({opacity: 1}, "fast")

    },
    touchstart: function() {


    },
    touchEnd: function() {


    }
});
