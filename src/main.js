var starfield = require('./starfield'),
    impress = require('impress');

impress().init();

starfield.init();

var slideElements = document.getElementById('impress').querySelectorAll('.slide');

/*
document.addEventListener('impress:stepleave', function(e) {

    console.log('step leave', e);

    var currentSlide = e.target;

    console.log('child nodes', slideElements);
    console.log('current slide', currentSlide);

    var currentSlideNumber = Array.prototype.indexOf.call(slideElements, currentSlide);

    console.log('current slide number', currentSlideNumber);

});
*/

function onPrevSlide() {
    starfield.moveCameraZ(10);
}

function onNextSlide() {
    starfield.moveCameraZ(-10);
}

/**
 * TODO also handle hash change!
 */
document.addEventListener("keyup", function ( event ) {
    if ( event.keyCode === 9 || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
        switch( event.keyCode ) {
            case 33: // pg up
            case 37: // left
            case 38: // up
                onPrevSlide();
                break;
            case 9:  // tab
            case 32: // space
            case 34: // pg down
            case 39: // right
            case 40: // down
                onNextSlide();
                break;
        }

        event.preventDefault();
    }
}, false);

