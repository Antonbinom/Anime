import preloader from './scripts/preloader.js';
import slider from './scripts/slider.js';
import scrollToTop from './scripts/scrollToTop.js'
import modal from './scripts/modal.js';
import bgElements from './scripts/bgElements.js';
import getData from './scripts/getData.js';

preloader();
slider();
scrollToTop();
modal();
bgElements();
getData('../../db.json');