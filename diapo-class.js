class Modal {

  background;
  closeBtn;

  openModal() {

    const main;

    if ( !document.querySelector( '#modal-fond' ) ) {
      this.background = document.createElement( 'div' );
      main = document.createElement( 'div' );
      main.className = 'main';
      this.background.id = 'modal-fond';
      this.background.appendChild( main );

      this.createCloseBtn();
      this.background.appendChild( this.closeBtn );

      document.body.appendChild( this.background );

      setTimeout( function () {
        this.background.style.opacity = '100';
      }, 100 );
    } else {
      this.background = document.querySelector( '#modal-fond' );
    }

    this.closeBtn.addEventListener( 'click', this.closeModal );

    document.addEventListener( 'keydown', function ( e ) {
      if ( e.defaultPrevented ) {
        return;
      }
      switch ( e.key ) {
        case 'Escape':
          this.closeModal();
          break;

        default:
          return;
      }
      e.preventDefault();
    }, true );
  }

  createCloseBtn() {

    if ( !document.querySelector( '.btn-close-modal' ) ) {
      this.closeBtn = document.createElement( 'button' );
      this.closeBtn.className = 'btn-close-modal';
    } else {
      this.closeBtn = document.querySelector( '.btn-close-modal' );
    }

    return this.closeBtn;
  }

  closeModal() {
    this.background.style.opacity = '0';
    setTimeout( function () {
      document.body.removeChild( this.background );
    }, 1000 );
  }
}

class Slider {

  slides = [];
  container;

  caretL;
  caretR;
  puces = [];

  constructor( slides, container ) {
    this.slides = slides;
    this.container = container;
  }

  static createNavigation() {

    this.caretL = document.createElement( 'p' );
    this.caretR = document.createElement( 'p' );
      
    let ul = document.createElement( 'ul' );

    this.slides[ 0 ].hasAttribut( 'displaying' ) ? '' : this.slides[ 0 ].setAttribute( 'displaying', true );

    this.caretL.className = 'caretL';
    this.caretR.className = 'caretR';
    this.caretL.innerHTML = '<i class="fas fa-chevron-left fa-3x"></i>';
    this.caretR.innerHTML = '<i class="fas fa-chevron-right fa-3x"></i>';

    ul.className = 'diapoList';

    for ( var i = 0; i < this.slides.length; i++ ) {
      var li = document.createElement( 'li' );
      if ( this.slides[ i ].getAttribute( 'displaying' ) ) {
        li.className = 'diapoPuceSelect';
      } else {
        li.className = 'diapoPuce';
      }
      li.classList.add( 'diapoPuceListe' );
      li.setAttribute( 'data-puce', i );
      ul.appendChild( li );
      this.puces.push(li);
    }

    this.container.appendChild( this.caretL );
    this.container.appendChild( this.caretR );
    this.container.appendChild( ul );
  }

  slide() {
    function searchAttribut(element) {
      return element.hasAttribut('displaying');
    }

    let diapo = this.slides.every(searchAttribut);
    let pos = parseInt( diapo.getAttribute( 'data-pos' ) );

    if ( pos === 0 ) {
      this.caretL.style.display = 'none';
    } else if ( pos === diapos.length ) {
      this.caretR.style.display = 'none';
    }

    setTimeout( () => {
      let width = document.body.offsetWidth;
      diapos.forEach( diap => {
        let diapWidth = diap.offsetWidth;
        let pad = ( width - diapWidth ) / 2;
        diap.style.paddingLeft = '' + pad + 'px';
        diap.style.paddingRight = '' + pad + 'px';

        let transLength = diap.offsetWidth;
        diap.style.transform = 'translateX(-' + ( pos * transLength ) + 'px)';
      } );
    }, 300 );

    this.puces.forEach( puce => {
      puce.addEventListener( 'click', () => {
        pos = parseInt( puce.getAttribute( 'data-puce' ) );

        for ( let i = 0; i < this.slides.length; i++ ) {
          if ( parseInt( this.slides[ i ].getAttribute( 'data-pos' ) ) === pos ) {
            this.slides[ i ].setAttribute( 'displaying', true );
            transLength = this.slides[ i ].offsetWidth;
          } else {
            this.slides[ i ].setAttribute( 'displaying', false );
          }

          this.slides[ i ].style.transform = 'translateX(-' + ( pos * transLength ) + 'px)';
        }

        for ( let i = 0; i < this.puces.length; i++ ) {
          if ( parseInt( this.puces[ i ].getAttribute( 'data-puce' ) ) === pos ) {
            this.puces[ i ].classList.add( 'diapoPuceSelect' );
            this.puces[ i ].classList.remove( 'diapoPuce' );
          } else {
            this.puces[ i ].classList.add( 'diapoPuce' );
            this.puces[ i ].classList.remove( 'diapoPuceSelect' );
          }
        }

        if ( pos === 0 ) {
          this.caretL.style.display = 'none';
          this.caretR.style.display = 'initial';
        } else if ( pos === diapos.length - 1 ) {
          this.caretR.style.display = 'none';
          this.caretL.style.display = 'initial';
        } else {
          this.caretL.style.display = 'initial';
          this.caretR.style.display = 'initial';
        }

      } );

    } );
  }

}