import Macy from 'macy/dist/macy';

document.addEventListener( 'DOMContentLoaded', () => {
  Macy( {
    container: '.testimonial-list',
    mobileFirst: true,
    columns: 3,
    breakAt: {
      320: { margin: 10 },
      834: { margin: 20 },
      1200: { margin: 30 }
    }
  } );
} );
