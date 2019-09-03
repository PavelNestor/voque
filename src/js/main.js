const handlerToogleMenu = function(user) {
  "use strict";

  var menu = document.getElementById("menu");
  var menuClose = document.getElementById("menu-close");
  var menuContent = document.getElementById("menu-content");

  const onToogleMenu = () => {
    menuContent.classList.toggle("menu-show");
  };

  menu.addEventListener("click", onToogleMenu);
  menu.addEventListener("touch", onToogleMenu);
  menuClose.addEventListener("click", onToogleMenu);
  // menu.removeEventListener("click", onToogleMenu)
};

handlerToogleMenu();

window.addEventListener("scroll", function() {
  var logo = document.getElementById("logo");
  var logoWrapper = document.getElementById("logo-wrapper");
  var menu = document.getElementById("menu");
  var sections = document.getElementsByTagName("section");

  //parallax
  var textParallax = document.getElementsByClassName("text-parallax");
  var boxParallax = document.getElementsByClassName("box-parallax");
  for (let index = 0; index < boxParallax.length; index++) {
    const box = boxParallax[index];
    const top = box.getBoundingClientRect().top;

    if (top < 200 && top > -900) {
      for (let index = 0; index < textParallax.length; index++) {
        const text = textParallax[index];
        console.log('top', top);
        
        if(index == 2 || index == 3 || index == 6 || index == 7) {
          text.style.transform =
            "scale(-1, -1) translate3d(0, " + (top * 0.1) + "px, 0)";
        } else {
          text.style.transform =
            "scale(-1, -1) translate3d(0, " + (- top * 0.1) + "px, 0)";
        }
      }
      
    }
  }

  //parallax mobile
  var textParallaxMobile = document.getElementsByClassName(
    "text-parallax-mobile"
  );
  for (let index = 0; index < textParallaxMobile.length; index++) {
    const text = textParallaxMobile[index];

    if(index == 2 || index == 3 || index == 6 || index == 7) {
      text.style.transform =
        "scale(-1, -1) translate3d(0, " + calculateTranslateTop(pageYOffset, index) + "px, 0)";
    } else {
      text.style.transform =
        "scale(-1, -1) translate3d(0, " + calculateTranslateBottom(pageYOffset, index) + "px, 0)";
    }
  }

  for (var index = 0; index < sections.length; index++) {
    var section = sections[index];
    if (pageYOffset > section.offsetTop - 34) {
      var logoUrl = section.getAttribute("data-logo");
      var isVisible = section.getAttribute("data-logo-visibility");
      var menuUrl = section.getAttribute("data-menu");

      menu.src = menuUrl;

      if (isVisible) {
        logo.src = logoUrl;
        logoWrapper.classList.add("logo-visible");
      } else {
        logoWrapper.classList.remove("logo-visible");
      }
    }
  }
});

function calculateTranslateTop(pageYOffset, index) {
  return (
    pageYOffset * -0.1 + ((index + 1) % 2 !== 0 ? (index + 1) * 40 : index * 40)
  );
}

function calculateTranslateBottom(pageYOffset, index) {
  return (
    pageYOffset * 0.1 - ((index + 1) % 2 !== 0 ? (index + 1) * 100 : index * 100)
  );
}
