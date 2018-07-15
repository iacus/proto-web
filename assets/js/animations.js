
// The Black animation loader
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


// Projects load on home
var animateTheProjects = anime({
  targets: '.projects li',
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


var loadGallery = anime({
  targets: '.project__gallery',
  opacity: 1,
  autoplay: true,
  delay: 100,
  easing: 'easeInOutSine'
});

//Panel info toggle
var animateInfoPanel = anime({
  targets: '.project--info',
  opacity: 1,
  translateX: [-2000, 0],
  easing: 'easeInOutSine',
  autoplay: false
});

function showInfoPanel() {
  if (!animateInfoPanel.reversed) animateInfoPanel.reverse();
  animateInfoPanel.play();
}

function hideInfoPanel() {
  if (animateInfoPanel.reversed) animateInfoPanel.reverse();
  console.log(animateInfoPanel);
  animateInfoPanel.play();

}
