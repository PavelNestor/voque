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

var logo = document.getElementById("logo");
var logoWrapper = document.getElementById("logo-wrapper");
var menuImg = document.getElementById("menu-image");
var sections = Array.from(document.getElementsByTagName("section"));
var linesMenuItems = document.getElementsByClassName("lines-menu__item");

let currentSection = "";
let lastSection = "";
let windowHeight = 0;
let breakpoints = [];
let lastScrollPosition = 0;

const sectionOptions = [
  {
    id: "hero",
    logoUrl: "img/logo.svg",
    navbarClass: "hero",
    scrollClass: "hero",
    isInvert: false,
    isLogoVisible: false,
  },
  {
    id: "about",
    logoUrl: "img/logo-black.svg",
    navbarClass: "about",
    contentId: "about-content",
    scrollClass: "about",
    isLogoVisible: true,
    isInvert: true
  },
  {
    id: "services",
    logoUrl: "img/logo.svg",
    navbarClass: "about",
    scrollClass: "about",
    isLogoVisible: true,
    isInvert: false
  },
  {
    id: "development",
    logoUrl: "img/logo.svg",
    navbarClass: "about",
    scrollClass: "about",
    isLogoVisible: true,
    isInvert: false
  },
  {
    id: "outsource",
    logoUrl: "img/logo.svg",
    navbarClass: "about",
    scrollClass: "about",
    isLogoVisible: true,
    isInvert: false
  },
  {
    id: "outstaffing",
    logoUrl: "img/logo.svg",
    navbarClass: "about",
    scrollClass: "about",
    isLogoVisible: true,
    isInvert: false
  },
  {
    id: "contact",
    logoUrl: "img/logo.svg",
    navbarClass: "about",
    scrollClass: "about",
    isLogoVisible: true,
    isInvert: false
  }
];

function onResize() {
  breakpoints = [];
  windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const offset = Math.ceil(windowHeight / 2);

  sections.forEach(section => {
    breakpoints.push({
      id: section.id,
      breakpointTop: section.offsetTop - offset,
      breakpointBottom: section.offsetTop + section.offsetHeight
    });
  });
}

onResize();

window.addEventListener("resize", onResize);

window.addEventListener("scroll", function() {
  if (document.body.getBoundingClientRect().top > lastScrollPosition) {
    // UP SCROLL

    logoWrapper.style.top = "0";

    currentSection = findCurrentSection(pageYOffset, breakpoints);

    if (lastSection !== currentSection) {
      let current = sectionOptions.find(
        sectionOpt => sectionOpt.id === currentSection
      );

      // document.getElementById(current.contentId).classList.remove('hiddenContent');

      invert(linesMenuItems, current.isInvert);
      invert(menuImg, current.isInvert);

      setActiveLink(current);

      if (current.isLogoVisible) {
        logo.src = current.logoUrl;
        logoWrapper.classList.add("logo-visible");
      } else {
        logoWrapper.classList.remove("logo-visible");
      }

    }

    lastSection = currentSection;
  } else {
    // DOWN SCROLL

    logoWrapper.style.top = "-6rem";

    currentSection = findCurrentSection(pageYOffset, breakpoints);

    if (lastSection !== currentSection) {
      let current = sectionOptions.find(
        sectionOpt => sectionOpt.id === currentSection
      );

      invert(linesMenuItems, current.isInvert);
      invert(menuImg, current.isInvert);

      setActiveLink(current);

      if (current.isLogoVisible) {
        logo.src = current.logoUrl;
        logoWrapper.classList.add("logo-visible");
      } else {
        logoWrapper.classList.remove("logo-visible");
      }

    }

    lastSection = currentSection;
  }

  lastScrollPosition = document.body.getBoundingClientRect().top;

  // //parallax
  // var textParallax = document.getElementsByClassName("text-parallax");
  // var boxParallax = document.getElementsByClassName("box-parallax");
  // for (let index = 0; index < boxParallax.length; index++) {
  //   const box = boxParallax[index];
  //   const top = box.getBoundingClientRect().top;

  //   if (top < 200 && top > -900) {
  //     for (let index = 0; index < textParallax.length; index++) {
  //       const text = textParallax[index];
  //       if (
  //         index == 0 ||
  //         index == 1 ||
  //         index == 4 ||
  //         index == 5 ||
  //         index == 8 ||
  //         index == 9
  //       ) {
  //         text.style.transform =
  //           "scale(-1, -1) translate3d(0, " + pageYOffset * 0.1 + "px, 0)";
  //       } else {
  //         text.style.transform =
  //           "scale(-1, -1) translate3d(0, " + pageYOffset * -0.1 + "px, 0)";
  //       }
  //     }
  //   }
  // }

  // //parallax mobile
  // var textParallaxMobile = document.getElementsByClassName(
  //   "text-parallax-mobile"
  // );

  // for (let index = 0; index < textParallaxMobile.length; index++) {
  //   const text = textParallaxMobile[index];

  //   if (index == 2 || index == 3 || index == 6 || index == 7) {
  //     text.style.transform =
  //       "scale(-1, -1) translate3d(0, " + calculateTranslateTop(pageYOffset, index) + "px, 0)";
  //   } else {
  //     text.style.transform =
  //       "scale(-1, -1) translate3d(0, " + calculateTranslateBottom(pageYOffset, index) + "px, 0)";
  //   }
  // }
});

function setActiveLink(current) {
  for (let index = 0; index < linesMenuItems.length; index++) {
    const linesMenuItem = linesMenuItems[index];
    const linkId = linesMenuItem.dataset.link;
    if (linkId === current.id) {
      linesMenuItem.classList.add("lines-menu__item-active");
    } else {
      linesMenuItem.classList.remove("lines-menu__item-active");
    }
  }
}

function findCurrentSection(pageYOffset, breakpoints) {
  for (let index = 0; index < breakpoints.length; index++) {
    const breakpoint = breakpoints[index];
    if (
      pageYOffset > breakpoint.breakpointTop &&
      breakpoints[index + 1] ? pageYOffset < breakpoints[index + 1].breakpointTop : true
    ) {
      return breakpoint.id;
    }
  }
}

function invert(items, isInvert) {
  if (isInvert) {
    if (items.length) {
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        item.classList.add("invert");
      }
    } else {
      items.classList.add("invert");
    }
  } else {
    if (items.length) {
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        item.classList.remove("invert");
      }
    } else {
      items.classList.remove("invert");
    }
  }
  return;
}

function calculateTranslateTop(pageYOffset, index) {
  return (
    pageYOffset * -0.1 + ((index + 1) % 2 !== 0 ? (index + 1) * 40 : index * 40)
  );
}

function calculateTranslateBottom(pageYOffset, index) {
  return (
    pageYOffset * 0.1 -
    ((index + 1) % 2 !== 0 ? (index + 1) * 100 : index * 100)
  );
}

// form validation
var form = document.getElementsByTagName("form")[0];
var email = document.getElementById("email");
var formName = document.getElementById("name");
var errorEmail = document.querySelector(".form-email-error");
var errorName = document.querySelector(".form-name-error");

email.addEventListener(
  "input",
  function(event) {
    errorEmail.innerHTML = "";
    errorEmail.className = "form-email-error";
  },
  false
);

formName.addEventListener(
  "input",
  function(event) {
    errorName.innerHTML = "";
    errorName.className = "form-name-error";
  },
  false
);

form.addEventListener(
  "submit",
  function(event) {
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
    debugger;
    if (isName) {
      errorName.innerHTML = "error";
      errorName.className = "form-name-error form-error_active";
      event.preventDefault();
      return false;
    } else {
      errorName.innerHTML = "";
      errorName.className = "form-name-error";
    }
  },
  false
);
