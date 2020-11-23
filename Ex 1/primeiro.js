var scene;
var camera;
var renderer;

var cube;
var velocidadeCuboX = 0.1;
var velocidadeCuboY = 0.1;

var criaCubo = function ()
{
    var geometria = new THREE.SphereGeometry(2, 200, 200);
    var material = new THREE.MeshBasicMaterial({color: "white"});
    cube = new THREE.Mesh(geometria, material);

    scene.add(cube);
};

var render = function()
{
    requestAnimationFrame(render);

    animaCubo();

    renderer.render(scene, camera);
}

var animaCubo = function ()
{
    if(this.cube.position.x >= 30 || this.cube.position.x <= -30)
    {
        velocidadeCuboX =velocidadeCuboX * -1
    }
    if(this.cube.position.y >= 10 || this.cube.position.y <= -10)
    {
        velocidadeCuboY =velocidadeCuboY * -1
    }
    this.cube.position.x+= velocidadeCuboX;
    this.cube.position.y+= velocidadeCuboY;
    console.log("X = " + this.cube.position.x + " Y = " + this.cube.position.y);
}



var init = function()
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 50;

    criaCubo();

    render();

    renderer.render(scene, camera);
};

window.onload = this.init;