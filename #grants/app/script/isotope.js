import isotope from 'isotope-layout';

document.addEventListener( 'DOMContentLoaded', () => {

  const container = document.querySelector( '.grid--filter' );
  const buttons = document.querySelectorAll( '.button--filter' );

  if ( container && buttons ) {

    new isotope( container, {
      itemSelector: '.grid__item',
      layoutMode: 'fitRows',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid__item',
      }
    } );

  }

} );