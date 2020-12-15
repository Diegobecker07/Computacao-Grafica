var scene;
var camera;
var renderer;
var createFloor;

var material;
var floor;

var cube;


var render = function() {
    requestAnimationFrame(render);
    renderer.render( scene, camera );
};

createFloor = () =>{
    var textureLoader = new THREE.TextureLoader();
    var floorTexture = textureLoader.load('assets/textura/terrain/floor.png');

    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 20, 20 );
    floorTexture.anisotropy = 16;
    floorTexture.encoding = THREE.sRGBEncoding;

    floor = new  THREE.Mesh(
        new THREE.PlaneGeometry(1050, 1050, 25,25),
        new THREE.MeshBasicMaterial({map : floorTexture})
    );

    floor.rotation.x -= Math.PI / 2;
    floor.position.y=-2;

    scene.add(floor);
};

window.onload = () =>{
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff);
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    //criação do chão
    createFloor();

    camera.position.z = 5;

    render();
}

