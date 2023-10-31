document.addEventListener( 'DOMContentLoaded', () => {

  const foods = [ 'Apple', 'Banana', 'Cake', 'Hamburger', 'Cookie' ];

  let id = 0;

  function printAllNames() {
    const name = foods[id++];

    if ( !name ) {
      return;
    }

    console.log( name );
    setTimeout( printAllNames, 100 );
  }
  printAllNames();

} );