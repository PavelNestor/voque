const handlerToogleMenu = function(user) {
  "use strict";

  var menuImg = document.getElementById("menu-image");
  var menuClose = document.getElementById("menu-close");
  var menuContent = document.getElementById("menu-content");

  const onToogleMenu = () => {
    menuContent.classList.toggle("menu-show");
  };

  menuImg.addEventListener("click", onToogleMenu);
  menuImg.addEventListener("touch", onToogleMenu);
  menuClose.addEventListener("click", onToogleMenu);
  // menu.removeEventListener("click", onToogleMenu)
};

handlerToogleMenu();

window.addEventListener("scroll", function() {
  var logo = document.getElementById("logo");
  var logoWrapper = document.getElementById("logo-wrapper");
  var menuImg = document.getElementById("menu-image");
  var sections = document.getElementsByTagName("section");
  var linesMenuItems = document.getElementsByClassName("lines-menu__item");

  //lines-menu-active
  for (let index = 0; index < sections.length; index++) {
    const section = sections[index];
    const sectionId = section.getAttribute("data-id");

    console.log('sectionId', sectionId);

    if (pageYOffset > section.offsetTop - 100) {

    
    for (let InnerIndex = 0; InnerIndex < linesMenuItems.length; InnerIndex++) {
      const linesMenuItem = linesMenuItems[InnerIndex];
      const linkId = linesMenuItem.getAttribute("data-link");

      console.log('linkId', linkId);

      if(linkId === sectionId) {
        linesMenuItem.classList.add("lines-menu__item-active");
      } else {
        linesMenuItem.classList.remove("lines-menu__item-active");
      }
    }

    };
  }

  //parallax
  var textParallax = document.getElementsByClassName("text-parallax");
  var boxParallax = document.getElementsByClassName("box-parallax");
  for (let index = 0; index < boxParallax.length; index++) {
    const box = boxParallax[index];
    const top = box.getBoundingClientRect().top;

    if (top < 200 && top > -900) {
      for (let index = 0; index < textParallax.length; index++) {
        const text = textParallax[index];
        if(index == 0 || index == 1 || index == 4 || index == 5 || index == 8 || index == 9) {
          text.style.transform =
            "scale(-1, -1) translate3d(0, " + (pageYOffset * 0.1) + "px, 0)";
        } else {
          text.style.transform =
            "scale(-1, -1) translate3d(0, " + (pageYOffset * - 0.1) + "px, 0)";
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

  // logo change
  for (var index = 0; index < sections.length; index++) {
    var section = sections[index];
    if (pageYOffset > section.offsetTop - 34) {
      var logoUrl = section.getAttribute("data-logo");
      var isVisible = section.getAttribute("data-logo-visibility");
      var menuUrl = section.getAttribute("data-menu");

      menuImg.src = menuUrl;

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


// form validation
var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('email');
var formName = document.getElementById('name');
var errorEmail = document.querySelector('.form-email-error');
var errorName = document.querySelector('.form-name-error');

email.addEventListener("input", function (event) {
  errorEmail.innerHTML = "";
  errorEmail.className = "form-email-error";
}, false);

formName.addEventListener("input", function (event) {
  errorName.innerHTML = "";
  errorName.className = "form-name-error";
}, false);

form.addEventListener("submit", function (event) {
  var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isEmail = email.value.length !== 0 && emailRegExp.test(email.value);
  var isName = formName.value.length === 0;

  if (!isEmail) {
    errorEmail.innerHTML = "error";
    errorEmail.className = "form-email-error form-error_active";
    event.preventDefault();
    return false;
  } else {
    errorEmail.innerHTML = "";
    errorEmail.className = "form-email-error";
  }
    debugger
  if (isName) {
    errorName.innerHTML = "error";
    errorName.className = "form-name-error form-error_active";
    event.preventDefault();
    return false;
  } else {
    errorName.innerHTML = "";
    errorName.className = "form-name-error";
  }
}, false);