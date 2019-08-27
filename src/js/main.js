// import { browser } from './browser';
// import { dialog } from './dialog';

// browser();

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
      console.log('section', section);
      
      section.style.background = bgColor;
    }
  }
});
