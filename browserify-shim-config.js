module.exports = {
    "three": { exports: "global:THREE" },
    "vendor/threejs-extras/CanvasRenderer.js": { depends: {"three": null}, exports: "global:THREE.CanvasRenderer" },
    "vendor/threejs-extras/Projector.js": { depends: {"three": null}, exports: "global:THREE.Projector" },
    "impress": { exports: "impress" }
};
