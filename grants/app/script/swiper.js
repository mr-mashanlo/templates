import Swiper from 'swiper/bundle';

document.addEventListener( 'DOMContentLoaded', () => {

  new Swiper( '.project-swiper', {
    spaceBetween: 24,
    speed: 600,
    loop: false,
    breakpoints: {
      320: { slidesPerView: 1.1, },
      768: { slidesPerView: 2.1, },
      1024: { slidesPerView: 3.1, },
      1260: { slidesPerView: 3, },
    },
  } );

  new Swiper( '.category-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 600,
    loop: false,
    centered: true
  } );

  function setSliderSettings() {
    const swiper = document.querySelector( '.category-swiper .swiper-wrapper' );

    if ( !swiper ) { return; }

    const slides = document.querySelectorAll( '.swiper-slide' );
    const container = swiper.closest( '.container' );

    let totalWidth = 0;

    slides.forEach( item => {
      totalWidth = totalWidth + ( item.offsetWidth + 10 );
    } );

    if ( totalWidth < container.offsetWidth ) {
      swiper.classList.add( 'category-swiper--large' );
    }
  }

  setSliderSettings();

} );

