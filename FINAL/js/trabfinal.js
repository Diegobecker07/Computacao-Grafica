var scene,camera, renderer, createFloor, loadObj, activeAction, lastAction;

var animationActions = Array();

var material,floor;
var pontos = 0;

var iniciar = false;
var esquerda = false;
var direita = false;
var cima = false;
var baixo = false;

var objetosCarregados = [];

var render = () => {
    requestAnimationFrame(render);
    //document.getElementById("points").innerHTML = pontos + " Pontos";
    //pontos++;
    verifica();
    renderer.render(scene, camera);
};

createFloor = () =>{
    var textureLoader = new THREE.TextureLoader();
    var floorTexture = textureLoader.load('assets/textura/terrain/floor.png');

    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(20, 20);
    floorTexture.anisotropy = 16;
    floorTexture.encoding = THREE.sRGBEncoding;

    floor = new  THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 25,25),
        new THREE.MeshBasicMaterial({map : floorTexture})
    );

    floor.rotation.x -= Math.PI / 2;
    floor.position.y=-2;

    scene.add(floor);
};

loadObj = () =>{
    var fbxLoader = new THREE.FBXLoader();
    var textureLoader = new THREE.TextureLoader();
    fbxLoader.load('assets/models/Police Car.fbx', (object) =>{
            objetosCarregados[0] = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/models/UVPoliceCar.png");
                    child.material.shininess = 0;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            object.scale.x = 0.01;
            object.scale.y = 0.01;
            object.scale.z = 0.01;

            object.position.z = 0;
            object.position.x = 0;
            object.position.y = 0;


            object.rotation.y += 6.3;

            object.castShadow = true;

            scene.add(object);    
        },(andamento) => {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },(error) => {
            console.log("Deu caca: " + error);
        });
};

function verifica(){
    if(esquerda){
        if(objetosCarregados[0].position.x <= -5){
            console.log("Limite atingido");
        }
        else{
            objetosCarregados[0].position.x -= 0.04;
            console.log("Pos carro X: " + objetosCarregados[0].position.x);
        }   
    }

    else if(direita){
        if(objetosCarregados[0].position.x >= 5){
            console.log("Limite atingido");
        }
        else{
            objetosCarregados[0].position.x += 0.04;
            console.log("Pos carro X: " + objetosCarregados[0].position.x);
        }   
    }
    
    else if(cima){
        camera.position.z -= 0.5;
        objetosCarregados[0].position.z -= 0.5;
        console.log("Pos carro Z: " + objetosCarregados[0].position.z);
        if(objetosCarregados[0].position.z == -300){
            objetosCarregados[0].position.z = 0;
            camera.position.z = 10;
        }
    }
    else if(baixo){
        
    }
}

window.onload = () =>{

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff);
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    
    camera.position.x = 0;
    camera.position.z = 10;
    camera.position.y = 2;
	scene.add(camera);
    
    //criação do chão
    createFloor();
    
    var light = new THREE.PointLight(0xFFFFFF);
	light.position.set(1, 10, 40);
	scene.add(light);


    loadObj();

    document.addEventListener('keydown', (event)=>{
        event = event || window.event;
		var keycode = event.keyCode;
		switch(keycode)
		{
			case 37:
                console.log("Apertou seta esquerda");
                esquerda = true;
				break;
			case 38:
                console.log("Apertou seta cima");
                cima = true;
				break;
			case 39:
                console.log("Apertou seta direita");
                direita = true;
				break;
			case 40:
                console.log("Apertou seta baixo");
                baixo = true;
				break;
			}
    });
	document.addEventListener('keyup', () =>{
        event = event || window.event;
		var keycode = event.keyCode;
		switch(keycode)
		{
			case 37:
                console.log("Largou esq");
                esquerda = false;
				break;
			case 38:
                console.log("Largou cima");
                cima = false;
				break;
			case 39:
                console.log("Largou direita");
                direita = false;
				break;
			case 40:
                console.log("Largou baixo");
                baixo = false;
				break;
			}
    });

    render();
}

