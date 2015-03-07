/**
 * Based on Seb Lee Delisle's Three.js tutorial - see LICENCE.txt.
 */

require('../vendor/threejs-extras/Projector.js');
require('../vendor/threejs-extras/CanvasRenderer.js');

console.log('THREE', THREE);

var Starfield = function() {

    var camera,
        scene,
        renderer,
        particles = [],
        width = window.innerWidth,
        height = window.innerHeight;

    this.init = function() {

        camera = new THREE.PerspectiveCamera(80, width / height, 1, 4000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();
        scene.add(camera);

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( width, height );

        document.body.appendChild( renderer.domElement );

        makeParticles();

        animate();

    };

    function animate() {

        updateParticles();

        // and render the scene from the perspective of the camera
        renderer.render( scene, camera );

        requestAnimationFrame( animate );

    }

    /**
     * Creates a random field of Particle objects
     */
    function makeParticles() {

        var particles,
            material,
            geometry;

        geometry = new THREE.Geometry();

        for( var i = 0; i < 20000; i ++ ) {

            var vertex = new THREE.Vector3();
            vertex.x = Math.random() * 2000 - 1000;
            vertex.y = Math.random() * 2000 - 1000;
            vertex.z = Math.random() * 2000 - 1000;

            geometry.vertices.push( vertex );

        }

        // we make a particle material and pass through the
        // colour and custom particle render function we defined.
        material = new THREE.PointCloudMaterial( { color: 0xffffff } );

        // make the particle
        particles = new THREE.PointCloud( geometry, material );

        // add it to the scene
        scene.add( particles );

    }

    function updateParticles() {

        // TODO

    }

};

module.exports = new Starfield();

