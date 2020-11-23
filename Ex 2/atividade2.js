var criaCubo = function ()
{
    var geometria = new THREE.BoxGeometry(3, 3, 3);

    red = new THREE.Color(1, 0, 0);
    green = new THREE.Color(0, 1, 0);
    blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue];

    for( var i = 0; i < 3; i++)
    {
        geometria.faces[4 * i].color = colors[i];
        geometria.faces[4 * i + 1].color = colors[i];
        geometria.faces[4 * i + 2].color = colors[i];
        geometria.faces[4 * i + 3].color = colors[i];
    }

    var material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: true});

    cube = new THREE.Mesh(geometria, material);

    scene.add(cube);
};

var scene;
var camera;
var renderer;
var cube;
var velocidadeCuboX = 0.1;
var velocidadeCuboY = 0.1;

var render = function()
{
    requestAnimationFrame(render);

    //animaCubo();

    document.addEventListener('keydown', leDoTeclado);

    renderer.render(scene, camera);
};

var animaCubo = function ()
{
//    if(cube.position.x >= 30 || cube.position.x <= -30)
//    {
//        velocidadeCuboX =velocidadeCuboX * -1
//    }
//    if(cube.position.y >= 10 || cube.position.y <= -10)
//    {
//        velocidadeCuboY =velocidadeCuboY * -1
//    }
//    cube.position.x+= velocidadeCuboX;
//    cube.position.y+= velocidadeCuboY;
    //console.log("X = " + cube.position.x + " Y = " + cube.position.y);
    //tecla cima 38
    //baixo 40
    //direita 39
    //esquerda 37
    
    //rodaCubo();
};

var leDoTeclado = function(e)
{
    console.log(e.keyCode);
    if(e.keyCode == 32)
    {
        rodaCubo();
    }
    if(e.keyCode == 37)
    {
        if(cube.position.x <= -30){}
        else cube.position.x -= 0.8;
    }
    if(e.keyCode == 38)
    {
        if(cube.position.y >= 30){}
        else cube.position.y += 0.8;
    }
    if(e.keyCode == 39)
    {
        if(cube.position.x >= 30){}
        else cube.position.x += 0.8;
    }
    if(e.keyCode == 40)
    {
        if(cube.position.y <= -30){}
        else cube.position.y -= 0.8;
    }
}

var limitadorDeRotacao = 0;
var rodaCubo = function()
{
    var rotacaoQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.03, 0.03, 0, 'XYZ'));
    cube.quaternion.multiplyQuaternions(rotacaoQuaternion, cube.quaternion);

};

var init = function()
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 100;

    criaCubo();

    render();

    renderer.render(scene, camera);
};

window.onload = this.init;