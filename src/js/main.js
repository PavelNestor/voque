"use strict";

var logo = document.getElementById("logo");
var logoWrapper = document.getElementById("logo-wrapper");
var menuImg = document.getElementById("menu-image");
var sections = Array.from(document.getElementsByTagName("section"));
var linesMenuItems = Array.from(document.getElementsByClassName("lines-menu__item"));
var side = document.getElementById("side");
var contact = document.getElementById("contact");
var sideTextBottom = document.getElementById("side-text-bottom");
var contactLink = document.getElementById("contact-link");

const sectionOptions = fillOptions(sections);

let currentSection = "";
let currentSectionForMenu = "";
let currentSectionForEffects = "";
let lastSection = "";
let lastSectionForMenu = "";
let lastSectionForEffects = "";
let lastScrollPosition = "";
let lastBlock;
let windowHeight = 0;
let breakpoints = [];
let isPage = document.getElementById('page') !== null;
let isMobie = false;

const scrollWatchers = [];

(function() {
  const parent = document.body;
  const menuClose = document.getElementById("menu-close");
  const menuContent = document.getElementById("menu-content");

  contactLink.addEventListener('click', () => menuContent.classList.toggle("menu-show"));

  const onToogleMenu = () => {
    menuContent.classList.toggle("menu-show");
  };

  menuImg.addEventListener("click", onToogleMenu);
  menuClose.addEventListener("click", onToogleMenu);

  menuImg.addEventListener('mouseover', () => {
    parent.classList.add('navbar-trigger_active');
  });

  menuImg.addEventListener('mouseout', () => {
    parent.classList.remove('navbar-trigger_active');
  });
})();

class SectionChangeWatcher {
  constructor(options) {
    const DEFAULT_OPTIONS = {
      breakpoints: [],
      currentSection: null,
      name: null,
      offsetBottom: 0,
      offsetTop: 0,
      onChange: () => {},
      scrollTrigger: true,
    }
    options = Object.assign({}, DEFAULT_OPTIONS, options);
    Object.assign(this, options);
  }

  _init() {
    if (this.scrollTrigger) {
      const scrollPosition = document.body.getBoundingClientRect().top;
      window.addEventListener('scroll', () => this.onScroll(scrollPosition));
    }
  }

  setBreakpoints(array) {
    if (!Array.isArray(array)) {
      console.warn('"breakpoints" should be an array.')
    }
    this.breakpoints = array;
  }

  setOffsets(top, bottom) {
    this.offsetTop = top || this.offsetTop;
    this.offsetBottom = bottom || top;
  }

  findCurrentSection(breakpoints, scrollPosition, isScrollDirectionBackwards) {
    if (isScrollDirectionBackwards) {
      scrollPosition += this.offsetTop;
      for (let i = breakpoints.length - 1; i >= 0; i--) {
        if ( breakpoints[i].breakpointTop < scrollPosition ) {
          return breakpoints[i];
        }
      }
    } else {
      scrollPosition += this.offsetTop;
      for (let i = 0; i < breakpoints.length; i++) {
        if ( breakpoints[i].breakpointTop > scrollPosition ) {
          return breakpoints[i - 1];
        }
      }
    }

    return isScrollDirectionBackwards ?
      breakpoints[0] :
      breakpoints[breakpoints.length - 1];
  }

  onScroll(scrollPosition) {
    const currentSection = this.findCurrentSection(
      this.breakpoints,
      scrollPosition,
      this.scrollPosition < scrollPosition
    );

    this.scrollPosition = scrollPosition;
    if (this.currentSection === currentSection) {
      return;
    }

    this.currentSection = currentSection;
    
    this.onChange(currentSection);
  }
}

function fillOptions(items) {
  let result = [];
  items.map(section => {
    result.push({
      contentId: `${section.id}-content`,
      id: section.id,
      logoUrl: section.id === 'about' ? '/img/logo-black.svg' : '/img/logo.svg',
      logoMobileUrl: '/img/logo-black.svg',
      isLogoVisible: section.id !== 'hero',
      isInvert: section.id === 'about',
    })
  });

  return result;
}

function onResize() {
  isMobie = document.documentElement.clientWidth < 1024;
  breakpoints = [];
  windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const offset = Math.ceil(windowHeight / 2);

    sections.forEach(section => {
      breakpoints.push({
        id: section.id,
        breakpointTop: section.offsetTop,
        offset
      });
    });

  scrollWatchers.forEach(scrollWatcher => {
    scrollWatcher.setBreakpoints(breakpoints);
    scrollWatcher.setOffsets( offset );
  });
}

function sideTextMove() {
  side.style.transform = `scale(-1, -1) translateY(${document.body.getBoundingClientRect().top}px)`;

  if (contact.getBoundingClientRect().top < windowHeight) {
    sideTextBottom.style.transform = `scale(-1, -1) translateY(${windowHeight - contact.getBoundingClientRect().top}px)`;
  } else {
    sideTextBottom.style.transform = `scale(-1, -1)`;
  }
}

function onScroll() {
  const scrollPosition = document.body.getBoundingClientRect().top;
  const isScrollDirectionBackwards = scrollPosition > lastScrollPosition;
  let currentSection;
  let currentBlock = findCurrentBlock(breakpoints, -scrollPosition, isScrollDirectionBackwards);

  scrollWatchers.forEach(scrollWatcher => {
    scrollWatcher.onScroll(-scrollPosition);
  });
  
  if (isPage) {
    sideTextMove();
  }

  currentSection = findCurrentSection(pageYOffset, breakpoints);
  currentSectionForMenu = findCurrentSectionForMenu(pageYOffset, breakpoints);
  currentSectionForEffects = findCurrentSectionForEffects(pageYOffset, breakpoints);

  if (isScrollDirectionBackwards) {
    // UP SCROLL
    if (isMobie) {
      logoWrapper.style.top = "0";
      invert(menuImg, currentSection !== 'hero');
    } else {
      invert(menuImg, currentSection === 'about');
    }
  } else {
    // DOWN SCROLL
    logoWrapper.style.top = "-6rem";
    invert(menuImg, currentSection === 'about');
  }

  if (lastSection !== currentSection) {
    let current = sectionOptions.find(
      sectionOpt => sectionOpt.id === currentSection
    );

    setActiveLink(current);

    if (current.isLogoVisible) {
      logo.src = isMobie ? current.logoMobileUrl : current.logoUrl
      logoWrapper.classList.add("logo-visible");
    } else {
      logoWrapper.classList.remove("logo-visible");
    }
  }

  if (lastSectionForMenu !== currentSectionForMenu) {
    let current = sectionOptions.find(
      sectionOpt => sectionOpt.id === currentSectionForMenu
    );

    invert(linesMenuItems, current.isInvert);
    lastSectionForEffects = current.contentId;
  }


  lastSectionForMenu = currentSectionForMenu;
  lastScrollPosition = scrollPosition;
  lastSection = currentSection;
  lastBlock = currentBlock;
}

window.addEventListener('resize', onResize);

window.addEventListener('scroll', onScroll);

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
      return breakpoint && breakpoint.id;
    }
  }
}

function findCurrentSectionForMenu(pageYOffset, breakpoints) {
  for (let index = 0; index < breakpoints.length; index++) {
    const breakpoint = breakpoints[index];
    if (
      pageYOffset > breakpoint.breakpointTop &&
      breakpoints[index + 1] ? pageYOffset < breakpoints[index + 1].breakpointTop - breakpoints[index + 1].offset : true
    ) {
      return breakpoint.id;
    }
  }
}

function findCurrentSectionForEffects(pageYOffset, breakpoints) {
  for (let index = 0; index < breakpoints.length; index++) {
    const breakpoint = breakpoints[index];
    if (
      pageYOffset > breakpoint.breakpointTop + windowHeight &&
      breakpoints[index + 1] ? pageYOffset < breakpoints[index + 1].breakpointTop - breakpoints[index + 1].offset : true
    ) {
      return breakpoint.id;
    }
  }
}

function invert(items, isInvert) {
  const action = isInvert ? 'add' : 'remove';
  items = Array.isArray(items) ? items : [items];

  items.forEach(item => item.classList[action]('invert'));
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

// loading status
const loading = {
  avgTime: 3000,
  finished: false,
  preloader: document.querySelector('.preloader'),
  preloaderBar: document.querySelector('.preloader > .preloaderBar'),
  state: 0,
  trg: 1,

  loaded: function (force) {
    if(++loading.state === loading.trg || force === true) {
      loading.status(1);
      setTimeout(loading.done, 500);
    } else {
      loading.status(loading.state / loading.trg / 1.1);
    }
  },

  status: function (mult) {
    if (loading.finished) {
      return;
    }
    const value = Math.ceil(mult * 100);
    loading.preloaderBar.style.width = `${value}%`;
  },

  restart: function () {
    loading.status(0);
    loading.preloader.classList.remove('preloader_loaded');
  },

  done: function () {
    if (loading.finished) {
      return;
    }

    // hide preloader
    loading.preloader.classList.add('preloader_loaded');
    loading.status(0);
    loading.finished = true;

  }
};

// force loading status
setTimeout(function () {
  loading.loaded(true);
}, 10000);

// on load
window.onload = function() {
  loading.loaded(true);
};

// on ready
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  const images = Array.from( document.querySelectorAll('img') );
  images.forEach(image => {
    if (image.complete) {
      return;
    }
    loading.trg++;
    image.addEventListener('load', loading.loaded);
  });

  const links = Array.from( document.querySelectorAll('a') );
  links.forEach(link => {
    const href = link.getAttribute('href');
    const ifNoReload = new RegExp('^#|mailto|tel').test(href);

    if (!href || ifNoReload) {
      return;
    }

    link.addEventListener('click', e => {
      loading.restart();
      e.preventDefault();

      setTimeout(() => {
        document.location.href = href;
      }, 400);
    });
  });

  scrollWatchers.push( new SectionChangeWatcher({
    name: 'animations',
    onChange: data => {
      setActiveSection(data.id, sections);
    },
    scrollTrigger: false,
  }));

  onResize();
  onScroll();
});

function findCurrentBlock(breakpoints, scrollPosition, isScrollDirectionBackwards, offset) {
  if (!Array.isArray(offset)) {
    offset = [0, 0];
  }

  if (isScrollDirectionBackwards) {
    for (let i = breakpoints.length - 1; i >= 0; i--) {
      if ( breakpoints[i].breakpointTop < scrollPosition ) {
        return breakpoints[i];
      }
    }
  } else {
    for (let i = 0; i < breakpoints.length; i++) {
      if ( breakpoints[i].breakpointTop > scrollPosition ) {
        return breakpoints[i - 1];
      }
    }
  }

  return isScrollDirectionBackwards ?
    breakpoints[0] :
    breakpoints[breakpoints.length - 1];
}

function setActiveSection(id, sections) {
  let isActiveSet;

  sections.forEach(section => {
    const STATE_CLASSES = ['section_active', 'section_higher', 'section_lower'];
    let currentState;

    if (section.id === id) {
      currentState = 0;
      isActiveSet = true;
    } else if (isActiveSet) {
      currentState = 2;
    } else {
      currentState = 1;
    }

    STATE_CLASSES.map((className, i, array) => {
      const action = i === currentState ? 'add' : 'remove';
      section.classList[action](className);
    });
  })
}

(function () {
  const trigger = document.querySelector('.navbar-trigger');
  const parent = document.body;

  trigger.addEventListener('mouseover', () => {
    parent.classList.add('navbar-trigger_active');
  });

  trigger.addEventListener('mouseout', () => {
    parent.classList.remove('navbar-trigger_active');
  });

})();
