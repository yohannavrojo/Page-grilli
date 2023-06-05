'use strict';


// PRELOAD 
// loading will be end after document is loaded
// la carga finalizará después de cargar el documento

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load" ,function(){
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

// add event listener on multiple elements

const addEventOnElements = function(elements,eventType,callback) {
    for(let i=0, len=elements.length; i< len; i++) {
        elements[i].addEventListener(eventType,callback);
    }
    
}


// NAVBAR

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);


/**
 * HEADER & BACK TOP BTN
 */

const header =document.querySelector("[data-header]");

let lastScrollPos = 0;

const hideHeader =function (){
const isScrollBottom = lastScrollPos < window.scrollY;
    if(isScrollBottom){
        header.classList.add("hide");

    }else{
        header.classList.remove("hide");
    }
    lastScrollPos= window.scrollY;
}

window.addEventListener("scroll",function(){
    if(window.scrollY >= 50){
        header.classList.add("active");
        hideHeader();
    }else{
        header.classList.remove("active");
    }
})

// HERO SLIDER 
const heroSLider=document.querySelector("[data-hero-slider]")
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSLiderPos=0;

let lastActiveSLiderItem = heroSliderItems[0];

const updateSliderPos = function (){
    lastActiveSLiderItem.classList.remove("active");
    heroSliderItems[currentSLiderPos].classList.add("active");
    lastActiveSLiderItem = heroSliderItems[currentSLiderPos]
}

const slideNext = function(){
    if(currentSLiderPos >= heroSliderItems.length - 1){
        currentSLiderPos = 0;
    }else{
        currentSLiderPos++;
    }
    updateSliderPos();
}

heroSliderNextBtn.addEventListener("clik",slideNext);

const sliderPrev =function(){
    if (currentSLiderPos <= 0) {
        currentSLiderPos = heroSLider.length -1
    } else {
        currentSLiderPos--
    }
    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", sliderPrev)

// auto SLider

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);

/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});