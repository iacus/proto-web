$(".js-FocusElement").on({
  mouseenter: function() {
    const elem = $(this);
    const elemFirstClass = "." + $(this).attr('class').split(' ')[0];

    console.log("focus");

    $(this).clearQueue().animate({opacity: 1}, "fast");
    $(elemFirstClass).not($(this)).clearQueue().animate({opacity: 0.3}, "fast")

  },
  mouseleave: function() {
    const elemFirstClass = "." + $(this).attr('class').split(' ')[0];

    console.log("out focus");

    if ($(elemFirstClass).is('.focus')) {
      $(elemFirstClass).clearQueue().stop(true, true).delay(100).animate({opacity: 0.3}, "fast");

    } else {
      $(elemFirstClass).clearQueue().stop(true, true).delay(100).animate({opacity: 1}, "fast")

    }


  }
});


$(".js-FocusElementAndFix").on({
  mouseenter: function() {
    const elem = $(this);
    const elemFirstClass = "." + $(this).attr('class').split(' ')[0];

    $(this).clearQueue().animate({opacity: 1}, "fast").addClass('focus');
    $(elemFirstClass).not($(this)).clearQueue().animate({opacity: 0.3}, "fast").removeClass('focus').addClass('not-focus')

  },
  mouseleave: function() {
    //const elemFirstClass = "." + $(this).attr('class').split(' ')[0];

    //$(elemFirstClass).clearQueue().stop(true, true).delay(100).animate({opacity: 1}, "fast")

  }
});



function focusElementAndFix(classItemsToFocus) {
  const items = $(classItemsToFocus);

  console.log("focus");
  items.not(items.first()).delay(100).animate({opacity: 0.3}, "slow", function () {
    items.first().addClass('focus');
    items.not(items.first()).addClass('not-focus');
  });

}


$(".js-ItemScrollToBlock").on({
  click: function() {
    const thisItem = $(this);
    const itemsFirstClass = "." + $(this).attr('class').split(' ')[0];
    const blockId = $(this).attr('href');
    const blocksFirstClass = "." + $(blockId).attr('class').split(' ')[0];


    //Fix this item on sticky navigation
    //Da problemas con el scroll, desactivado por ahora
    //$(this).clearQueue().animate({opacity: 1}, "fast").removeClass('not-focus').addClass('focus');
    //$(itemsFirstClass).not($(this)).clearQueue().animate({opacity: 0.3}, "fast").removeClass('focus').addClass('not-focus');

    //Fix relative by ID block item
    //Da problemas con el scroll, desactivado por ahora
    //$(blockId).delay(100).removeClass('not-focus').addClass('focus');
    //$(blocksFirstClass).not($(blockId)).clearQueue().stop(true, true).delay(100).removeClass('focus').addClass('not-focus');

  }
});

//Finally this function is not being used. You can't interact with click with the blocks
$(".js-BlockScrollToItem").on({
  click: function() {
    const thisBlock = $(this);
    const blockId = "#" + $(this).attr('id');
    const itemClass = "." + $(this).attr('id');
    const blocksFirstClass = "." + $(blockId).attr('class').split(' ')[0];
    const itemsFirstClass = "." + $(itemClass).attr('class').split(' ')[0];

    console.log(itemsFirstClass);
    //Fix this block item
    $(blockId).clearQueue().animate({opacity: 1}, "fast").removeClass('not-focus').addClass('focus');
    $(blocksFirstClass).not($(blockId)).clearQueue().animate({opacity: 0.3}, "fast").removeClass('focus').addClass('not-focus');

    //Fix relative item by ID on sticky navigation
    $(itemsFirstClass).clearQueue().animate({opacity: 0.3}, "fast").removeClass('focus').addClass('not-focus');
    $(itemClass).clearQueue().animate({opacity: 1}, "fast").removeClass('not-focus').addClass('focus');


  }
});


$(".js-ShowSubmenu").on({
  click: function(e) {
    e.preventDefault();

    if ($(this).next('.submenu').is('.collapsed')) {
      $(this).next('.submenu').removeClass('collapsed');
    } else {
      $(this).next('.submenu').addClass('collapsed');
    }

  }
});


function initScroll(menuSelector) {
    var scrollPosition = $(document).scrollTop();
    const scrollCorrect = 270;

    menuSelector.each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        const refElementFirstClass = "." + $(refElement).attr('class').split(' ')[0];

        if (refElement.position().top <= scrollPosition + scrollCorrect && refElement.position().top + refElement.height() > scrollPosition + scrollCorrect) {
          console.log("activa");

            currLink.clearQueue().stop(true,true).delay(200).css('opacity', '0.3').removeClass('not-focus').addClass('focus');
            $(refElement).clearQueue().stop(true,true).delay(200).css('opacity', '0.3').removeClass('not-focus').addClass('focus');
        }
        else {

            currLink.clearQueue().stop(true,true).css('opacity', '0.3').removeClass('focus').addClass('not-focus');
            $(refElement).clearQueue().stop(true,true).css('opacity', '0.3').removeClass('focus').addClass('not-focus');
        }
    });
}


function initScrollProfessionals(menuSelector) {
    var scrollPosition = $(document).scrollTop();
    const scrollCorrect = 270;

    menuSelector.each(function () {
        var currLink = $(this);

        if (currLink.position().top <= scrollPosition + scrollCorrect && currLink.position().top + currLink.height() > scrollPosition + scrollCorrect) {

            currLink.clearQueue().stop(true,true).delay(200).css('opacity', '0.3').removeClass('not-focus').addClass('focus');
        }
        else {
            currLink.clearQueue().stop(true,true).css('opacity', '0.3').removeClass('focus').addClass('not-focus');
        }
    });
}

//Testing function
function focusElement(elem) {
  const elemFirstClass = "." + elem.attr('class').split(' ')[0];

  console.log("focus");

  elem.clearQueue().animate({opacity: 1}, "fast");
  $(elemFirstClass).not(elem).clearQueue().animate({opacity: 0.3}, "fast")
}

//Testing function
function deFocusElement(elem) {
  const elemFirstClass = "." + elem.attr('class').split(' ')[0];

  console.log("out focus");

  if ($(elemFirstClass).is('.focus')) {
    $(elemFirstClass).clearQueue().stop(true, true).delay(100).animate({opacity: 0.3}, "fast");

  } else {
    $(elemFirstClass).clearQueue().stop(true, true).delay(100).animate({opacity: 1}, "fast")

  }
}
