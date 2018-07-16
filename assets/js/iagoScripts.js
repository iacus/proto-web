$(".js-FocusElement").on({
  mouseenter: function() {
    const elem = $(this);
    const elemFirstClass = "." + $(this).attr('class').split(' ')[0];

    elem.css('opacity', '1');
    $(elemFirstClass).not($(this)).clearQueue().animate({opacity: 0.5}, "fast")

  },
  mouseleave: function() {
    const elemFirstClass = "." + $(this).attr('class').split(' ')[0];

    $(elemFirstClass).clearQueue().stop(true, true).delay(100).animate({opacity: 1}, "fast")

  }
});
