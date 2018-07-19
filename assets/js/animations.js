
// The Black animation loader
function animateTheBlack(bgPosition,thisLink) {
  //Funcion para borrar el target
  anime.remove(theBlackJs);

  if (thisLink === undefined) thisLink = "noLink";

  anime({
    targets: theBlackJs,
    width: bgPosition,
    easing: 'easeInOutSine',
    begin: function(anim) {
      //Before move The Black, empties the image
      emptyTheBlack();
    },
    complete: function(anim) {
      console.log("Animacion completa");
      console.log(thisLink);

      if (thisLink != "noLink") {
        location.href = thisLink;
      }

      if (theBlack.parents('.home').length) {
        console.log("home page");
        loadHomeContent();
      }


      if (theBlack.parents('.contact').length) {
        console.log("contact page");
        theBlackMap();
      }

      if (theBlack.parents('.professionals').length) {
        console.log("contact page");
        theBlackProfessional();
      }

      if (theBlack.parents('.procedure').length) {
        console.log("procedure page");

        //If the scroll isn't on top we light the first items
        if ($(document).scrollTop() <= 150) {

          focusElementAndFix('.procedure__block__item');
          focusElementAndFix('.procedure__item');
        }

      }

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
  opacity: {
    value: 1,
    duration: 20
  },
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


//Menu responsive
var animateMenuResponsive = anime({
  targets: '.menuResponsive',
  opacity: {
    value: 1,
    duration: 20
  },
  translateX: [-3000, 0],
  easing: 'easeInOutSine',
  duration: 400,
  autoplay: false
});

function showMenuResponsive() {
  if (!animateMenuResponsive.reversed) animateMenuResponsive.reverse();
  animateMenuResponsive.play();
}

function hideMenuResponsive() {
  if (animateMenuResponsive.reversed) animateMenuResponsive.reverse();
  console.log(animateMenuResponsive);
  animateMenuResponsive.play();

}

//Smooth Scroll with anime
const ScrollLinks = {
  scrollAnimation: null,
  init(selector) {
    const links = document.querySelectorAll(selector);

    [].forEach.call(links, link =>
      link.addEventListener("click", function(e) {
        const href = this.getAttribute("href");

        if (href[0] !== "#") return;
        e.preventDefault();

        if (href === "#") ScrollLinks.to(0);
        else ScrollLinks.to(href);

        history.replaceState(null, null, href);
      })
    );

    const pause = () => this.scrollAnimation && this.scrollAnimation.pause();
    window.addEventListener("wheel", pause);
    window.addEventListener("touchstart", pause);
  },
  to(selectorOrNumber) {
    let scrollTop = 0;



    if (typeof selectorOrNumber === "number") {
      scrollTop = selectorOrNumber;
    } else {
      const element = document.querySelector(selectorOrNumber);

      console.log(selectorOrNumber);
      console.log(element);

      const stickySideBarPosition = $('.sticky').css('top').split('px')[0];
      console.log(stickySideBarPosition);

      scrollTop =
        (window.scrollY || document.documentElement.scrollTop) +
        element.getBoundingClientRect().top - stickySideBarPosition + 2;
    }

    this.scrollAnimation = anime({
      targets: [document.body, document.documentElement],
      scrollTop,
      duration: 600,
      easing: "easeInOutQuart"
    });
  }
};

ScrollLinks.init(".js-ItemScrollToBlock");
