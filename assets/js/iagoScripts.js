$(".js-FocusElement").on({
  mouseenter: function() {
    const elem = $(this);
    const elemFirstClass = "." + $(this).attr('class').split(' ')[0];

    $(this).clearQueue().animate({opacity: 1}, "fast");
    $(elemFirstClass).not($(this)).clearQueue().animate({opacity: 0.3}, "fast")

  },
  mouseleave: function() {
    const elemFirstClass = "." + $(this).attr('class').split(' ')[0];

    $(elemFirstClass).clearQueue().stop(true, true).delay(100).animate({opacity: 1}, "fast")

  }
});
