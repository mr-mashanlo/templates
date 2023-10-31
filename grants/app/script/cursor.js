const cursorDot = document.querySelector( '.cursor-dot' );
const cursorOutline = document.querySelector( '.cursor-outline' );

window.addEventListener( 'mousemove', function( e ) {
  cursorDot.animate( { top: `${e.clientY}px`, left: `${e.clientX}px` }, { duration: 1000, fill: 'forwards' } );
  cursorOutline.animate( { top: `${e.clientY}px`, left: `${e.clientX}px` }, { duration: 500, fill: 'forwards' } );
} );

window.addEventListener( 'mouseover', function() {
  cursorDot.animate( { opacity: '1' }, { duration: 300, fill: 'forwards' } );
  cursorOutline.animate( { opacity: '1' }, { duration: 300, fill: 'forwards' } );
} );

window.addEventListener( 'mouseout', function() {
  cursorDot.animate( { opacity: '0' }, { duration: 300, fill: 'forwards' } );
  cursorOutline.animate( { opacity: '0' }, { duration: 300, fill: 'forwards' } );
} );
