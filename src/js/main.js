// import { browser } from './browser';
// import { dialog } from './dialog';

// browser();

const handlerToogleMenu = (function (user) {
  'use strict';

  var menu = document.getElementById("menu");
  var menuClose = document.getElementById("menu-close");
  var menuContent = document.getElementById("menu-content");

  const onToogleMenu = () => {
    menuContent.classList.toggle("menu-show");
  }

  menu.addEventListener("click", onToogleMenu);
  menuClose.addEventListener("click", onToogleMenu);
  // menu.removeEventListener("click", onToogleMenu)
});

handlerToogleMenu();

window.addEventListener('scroll', function () {
  var logo = document.getElementById("logo");
  var menu = document.getElementById("menu");
  var sections = document.getElementsByTagName('section');

  for (var index = 0; index < sections.length; index++) {
    var section = sections[index];
    if (pageYOffset > section.offsetTop - 34) {
      var logoUrl = section.getAttribute("data-logo");
      var menuUrl = section.getAttribute("data-menu");
      var bgColor = section.getAttribute("data-bg");
      logo.src = logoUrl;
      menu.src = menuUrl;
      // section.style.background = bgColor;
    }
  }
});
