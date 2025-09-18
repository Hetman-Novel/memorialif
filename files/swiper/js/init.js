const lazyImages = document.querySelectorAll('img[loading="lazy"]'); // Get all images with the loading="lazy" attribute
function addLoadedClass(image) { // Function to add class to image parent after it is loaded
   const parentElement = image.parentElement;
   if (image.complete) { // Check if the image is loaded
      parentElement.classList.add('loaded');
   } else {
      image.addEventListener('load', function() { // Add a load event to add the class after the image has loaded
         parentElement.classList.add('loaded');
      });
   }
}
lazyImages.forEach(addLoadedClass); // Loop through all the images and call the addLoadedClass function for each one

/* === */

/* Before after slider -> */
const beforeAfterSlider = document.getElementById('before-after-slider');
if (beforeAfterSlider) {
   new Swiper(beforeAfterSlider, {
      autoHeight: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchOverflow: true,
      spaceBetween: 20,
      loop: false,
      speed: 800,
      effect: 'fade',
      fadeEffect: {
         crossFade: true
      },
      allowTouchMove: false,
      simulateTouch: false,
      touchRation: 0,
      touchAngle: 0,
      grabCursor: false,
      pagination: {
         el: '#before-after-slider-pagination',
         clickable: true,
      }
   });
}
/* <- Before after slider */

/* Latest news slider -> */
const gallerySlider = document.getElementById('gallery-slider');
if (gallerySlider) {
   new Swiper(gallerySlider, {
      navigation: {
         prevEl: '#gallery-slider-button-prev',
         nextEl: '#gallery-slider-button-next',
      },
      autoHeight: false,
      slidesPerView: 3,
      slidesPerGroup: 1,
      watchOverflow: true,
      spaceBetween: 20,
      loop: false,
      speed: 1000,
      effect: 'slide',
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      pagination: {
         el: '#gallery-swiper-pagination',
         clickable: true,
      },
      breakpoints: {
         0: {
            slidesPerView: 1,
         },
         576: {
            slidesPerView: 2,
         },
         861: {
            slidesPerView: 3,
         }
      },
   });
}
/* <- Latest news slider */

/* Latest news slider -> */
const latestNewsSlider = document.getElementById('latest-news-slider');
if (latestNewsSlider) {
   new Swiper(latestNewsSlider, {
      navigation: {
         prevEl: '#latest-news-slider-button-prev',
         nextEl: '#latest-news-slider-button-next',
      },
      autoHeight: false,
      slidesPerView: 3,
      slidesPerGroup: 1,
      watchOverflow: true,
      spaceBetween: 20,
      loop: false,
      speed: 1000,
      effect: 'slide',
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      breakpoints: {
         0: {
            slidesPerView: 1,
         },
         576: {
            slidesPerView: 2,
         },
         861: {
            slidesPerView: 3,
         }
      },
   });
}
/* <- Latest news slider */

/* Post slider -> */
let swiperInstance = null;
const breakpoint = 640;
const slider = document.getElementById('post-slider');

function initOrDestroySlider() {
   const screenWidth = Math.min(window.innerWidth, window.innerHeight); // учитываем ориентацию

   if (screenWidth <= breakpoint && !swiperInstance && slider) {
      
      swiperInstance = new Swiper(slider, {
         navigation: {
            prevEl: '#post-button-prev',
            nextEl: '#post-button-next',
         },
         autoHeight: false,
         slidesPerView: 1,
         slidesPerGroup: 1,
         watchOverflow: true,
         spaceBetween: 2,
         loop: true,
         speed: 1000,
         effect: 'fade',
         fadeEffect: {
            crossFade: true
         },
         preloadImages: false,
         lazy: {
            loadOnTransitionStart: true,
            loadPrewNext: true,
         },
         watchSlidesProgress: true,
         watchSlidesVisibility: true,
      });
   }

   if (screenWidth > breakpoint && swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
   }
}

// запустить при загрузке
window.addEventListener('load', initOrDestroySlider);
// пересчитывать при изменении размера или ориентации
window.addEventListener('resize', initOrDestroySlider);
window.addEventListener('orientationchange', initOrDestroySlider);
/* <- Post slider */