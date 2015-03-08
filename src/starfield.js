/**
 * Originally based on Seb Lee Delisle's Three.js tutorial - see LICENCE.txt.
 */

require('../vendor/threejs-extras/Projector.js');
require('../vendor/threejs-extras/CanvasRenderer.js');
var TWEEN = require('tween.js');

console.log('THREE', THREE);

var Starfield = function() {

    var CAMERA_Z_RANGE = 100,
        camera,
        scene,
        renderer,
        particles,
        starTexture = THREE.ImageUtils.loadTexture('../images/star-round.png'),
        width = window.innerWidth,
        height = window.innerHeight;


    this.init = function() {

        camera = new THREE.PerspectiveCamera(75, width / height, 1, 5000 );
        camera.position.z = 0;

        scene = new THREE.Scene();
        scene.add(camera);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height );

        document.body.appendChild( renderer.domElement );

        makeParticles();

        animate();

    };

    this.moveCameraZ = function(delta) {

        var newZ = (-delta * CAMERA_Z_RANGE);

        console.log('Change camera z to', delta, newZ);

        new TWEEN.Tween( camera.position )
            .to( { z: newZ }, 1000 )
            .easing( TWEEN.Easing.Quadratic.InOut )
            .start();

//        camera.position.z -= amount;

    };

    /*
    this.moveCameraZ = function(amount) {

        new TWEEN.Tween( camera.position )
            .to( { z: camera.position.z + amount }, 1000 )
            .easing( TWEEN.Easing.Quadratic.InOut )
            .start();

//        camera.position.z -= amount;

    };
    */

    function animate(time) {

        TWEEN.update(time);

        renderer.render( scene, camera );

        requestAnimationFrame( animate );

    }

    /**
     * Creates a random field of Particle objects
     */
    function makeParticles() {

        var material,
            geometry = new THREE.Geometry();

        for( var i = 0; i < 50000; i ++ ) {

            var vertex = new THREE.Vector3();
            vertex.x = Math.random() * 2000 - 1000;
            vertex.y = Math.random() * 2000 - 1000;
            vertex.z = Math.random() * 2000 - 1000;

            geometry.vertices.push( vertex );

        }

        material = new THREE.PointCloudMaterial({
            size: 4,
            color: 0xffffff,
            map: starTexture,
            transparent: true,
            opacity: 0.5
        } );

        particles = new THREE.PointCloud( geometry, material );

        scene.add( particles );

    }

};

module.exports = new Starfield();

