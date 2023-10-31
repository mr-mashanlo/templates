import jQuery from 'jquery';
// eslint-disable-next-line no-unused-vars
import accordionjs from 'accordionjs';

document.addEventListener( 'DOMContentLoaded', () => {
  jQuery( '.question-accordeon' ).accordionjs( {
    slideSpeed: 500,
    activeIndex: false,
    closeAble: true,
  } );
} );
