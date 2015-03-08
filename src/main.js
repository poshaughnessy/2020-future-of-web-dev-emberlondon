var starfield = require('./starfield'),
    impress = require('impress');

impress().init();

starfield.init();

var STAR_FIELD_MOVE_AMOUNT = 10;
    slideElements = document.getElementById('impress').querySelectorAll('.slide'),
    numberOfSlides = slideElements.length;

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

    if( !isFirstSlide() ) {
        moveStarFieldBackwards();
    } else {
        moveStarFieldForwards();
    }

}


function onNextSlide() {

    if( !isLastSlide() ) {
        moveStarFieldForwards();
    } else {
        moveStarFieldBackwards();
    }

}


function moveStarFieldBackwards() {
    starfield.moveCameraZ( -STAR_FIELD_MOVE_AMOUNT );
}

function moveStarFieldForwards() {
    starfield.moveCameraZ( STAR_FIELD_MOVE_AMOUNT );
}

function isFirstSlide() {
    return getSlideIndex(getCurrentSlide()) === 0;
}

function isLastSlide() {
    return getSlideIndex(getCurrentSlide()) === numberOfSlides - 1;
}

function getCurrentSlide() {
    return document.getElementById('impress').querySelector('.active');
}

function getSlideIndex(slide) {
    return Array.prototype.indexOf.call( slideElements, slide );
}

/**
 * TODO also handle touch control, hash change etc!
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

