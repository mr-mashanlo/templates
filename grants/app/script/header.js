document.addEventListener( 'DOMContentLoaded', () => {

  const hamburger = document.querySelectorAll( '.hamburger' );
  const headerNav = document.querySelector( '.header-nav' );
  const hasSubmenuLink = document.querySelectorAll( '.has-submenu > .menu__link' );

  window.addEventListener( 'scroll', function () {
    const intElemScrollTop = window.pageYOffset;
    const pageYPositions = [ 0 ];
    pageYPositions.push( Math.floor( pageYPositions ) );
    console.log( intElemScrollTop );
  } );

  hasSubmenuLink.forEach( element => {
    element.addEventListener( 'click', function ( event ) {
      event.preventDefault();
      this.parentElement.classList.toggle( 'active' );
    } );
  } );

  hamburger.forEach( element => {
    element.addEventListener( 'click', function () {
      headerNav.classList.toggle( 'active' );
    } );
  } );

} );
