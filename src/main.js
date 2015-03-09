var starfield = require('./starfield'),
    impress = require('impress');

var impressRoot = document.getElementById('impress'),
    slideElements = impressRoot.querySelectorAll('.slide'),
    numberOfSlides = slideElements.length;

impress().init();
starfield.init();

document.addEventListener('impress:stepleave', function(event) {

    /*
    console.log('event', event);

    var hiddenFragments = event.target.querySelectorAll('.fragment:not(.show)');

    console.log('hiddenFragments', hiddenFragments);

    if( hiddenFragments.length > 0 ) {
        hiddenFragments[0].classList.add('show');

        console.log('trying to stop slide from changing');

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
    */

    onSlideChange();

});

function onSlideChange() {

    var currentSlide = getCurrentSlide();

    if( currentSlide ) {

        var newSlideIndex = getSlideIndex( currentSlide );

        console.log('slide changed to', newSlideIndex);

        moveStarField( newSlideIndex / numberOfSlides );

    } else {
        console.warn('Unable to get current slide');
    }

}

function moveStarField( delta ) {

    console.log( 'move star field', delta );

    starfield.moveCameraZ( delta );
}

/*
function moveStarFieldForwards() {
    starfield.moveCameraZ( -STAR_FIELD_MOVE_AMOUNT );
}

function isFirstSlide() {
    console.log('is first slide?', getCurrentSlide(), getSlideIndex(getCurrentSlide()));
    return getSlideIndex(getCurrentSlide()) === 0;
}

function isLastSlide() {
    console.log('is last slide?', getCurrentSlide(), getSlideIndex(getCurrentSlide()), numberOfSlides);
    return getSlideIndex(getCurrentSlide()) === numberOfSlides;
}
*/

function getCurrentSlide() {
    return document.getElementById('impress').querySelector('.active');
}

function getSlideIndex(slide) {
    return Array.prototype.indexOf.call( slideElements, slide );
}

/**
 * TODO also handle touch control, hash change etc!
 */
/*
document.addEventListener("keyup", function ( event ) {
    if ( event.keyCode === 9 || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
        switch( event.keyCode ) {
            case 33: // pg up
            case 37: // left
            case 38: // up
                onSlideChange();
                break;
            case 9:  // tab
            case 32: // space
            case 34: // pg down
            case 39: // right
            case 40: // down
                onSlideChange();
                break;
        }

        event.preventDefault();
    }
}, false);
*/
