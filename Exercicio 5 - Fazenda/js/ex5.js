var scene;
var camera;
var renderer;

var velocity = 0.1;

var ground;

var objLoader;
var textureLoader;

var spotLight;

var obj; //objeto dinamico.

var vaca = [];
var vaca1 = [];
var ptero = [];
var dog = [];
var girafa = [];


var guiFunction = function(){
    const gui = new dat.GUI();

    var parametroQualquer;
	param = {
		animais: ""
	};    
	var posAnimal = gui.add(param, 'animais', ['vaca', 'vaca1', 'vaca2', 'ptero', 'panda']).name("animais");
	posAnimal.onChange(function(parametroQualquer){
		if (parametroQualquer == 'vaca'){
			camera.lookAt(vaca.position);
		} else if (parametroQualquer == 'vaca1'){
			camera.lookAt(vaca1.position);
		} else if (parametroQualquer == 'vaca2'){
			camera.lookAt(vaca2.position);
		} else if (parametroQualquer == 'ptero'){
			camera.lookAt(ptero.position);
		} else if (parametroQualquer == 'panda'){
			camera.lookAt(panda.position);
		}
    });
    
	gui.open();
};


var criaGround = function (){

    textureLoader = new THREE.TextureLoader();
    groundTexture = textureLoader.load('assets/textura/terrain/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 20, 20 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    ground = new  THREE.Mesh(
        new THREE.PlaneGeometry(1050, 1050, 25,25),
        new THREE.MeshBasicMaterial({map : groundTexture})
    );

    ground.rotation.x -= Math.PI / 2;
    ground.position.y=-2;

    scene.add(ground);
};

var loadObj = function(){
    objLoader = new THREE.OBJLoader();

    objLoader.load(
        'assets/Cow.obj', //arquivo que vamos carregar
        function(object){
            vaca = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0xD5CE12");
                        }
                    });

            vaca.position.z = 0;
            vaca.position.x = 0;
            vaca.position.y = 0;

            vaca.castShadow = true;

            scene.add(vaca);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    objLoader.load(
        'assets/Cow.obj', //arquivo que vamos carregar
        function(object){
            vaca1 = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0x212E2E");
                        }
                    });

            vaca1.position.z = 12;
            vaca1.position.x = 20;
            vaca1.position.y = 0;

            vaca1.castShadow = true;

            scene.add(vaca1);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    objLoader.load(
        'assets/Cow.obj', //arquivo que vamos carregar
        function(object){
            vaca2 = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0xD91919");
                        }
                    });

                    vaca2.position.z = 212;
                    vaca2.position.x = 20;
                    vaca2.position.y = 0;

                    vaca2.castShadow = true;

            scene.add(vaca2);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    objLoader.load(
        'assets/Pterodactyl.obj', //arquivo que vamos carregar
        function(object){
            ptero = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0x2619D9");
                        }
                    });

            ptero.position.z = 2;
            ptero.position.x = 100;
            ptero.position.y = 20;
            ptero.rotation.x = 1;

            ptero.castShadow = true;

            scene.add(ptero);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    
    
    objLoader.load(
        'assets/Panda.obj', //arquivo que vamos carregar
        function(object){
            panda = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0x003484");
                        }
                    });

            panda.position.z = -1;
            panda.position.x = -90;
            panda.position.y = -2;

            panda.castShadow = true;

            scene.add(panda);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );


}

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 140 );

    renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  

    //createACube();

    loadObj();

    camera.position.z = 100;
    camera.position.y = 30;


    //Iluminação 
    //Não se preocupe com essa parte por enquanto, apenas usem :)
    spotLight = new THREE.SpotLight( 0xffffff );
    scene.add(spotLight);
    spotLight.position.set( 100, 100, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 99;
    spotLight.shadow.camera.fov = 40;

    renderer.shadowMap.enable = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;


    
    scene.add(new THREE.AmbientLight( 0xffffff ));


    criaGround();

    guiFunction();

    render();
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyDown = function(e){
    console.log(e.keyCode);
    if(e.keyCode == 37){
        obj.position.x-=velocity;
    }
    if(e.keyCode == 38){
        if (camera.position.y >=0)
            camera.position.y-= 1;
    }
    if(e.keyCode == 40){
        camera.position.y+= 1;
    }
    if (e.keyCode == 32){ //espaço -> rotação pelo pivo.
        
        console.log("Z: "+ pivot.rotation.z);
        if (pivot.rotation.z > 1.7 || pivot.rotation.z < -1){
            rotationVelocity*=-1;
        }
        obj.rotation.z+=rotationVelocity; 
       // pivo.rotation.y+=0.1;
    }
    if (e.keyCode == 187){ // +
        braco1.scale.x+=0.1;
        braco1.scale.y+=0.1;
        braco1.scale.z+=0.1;

       
    }
    if (e.keyCode == 189){ // -
        braco1.scale.x-=0.1;
        braco1.scale.y-=0.1;
        braco1.scale.z-=0.1;

        braco1.position.x+=1;

        // ground.scale.x -=0.1;
        // ground.scale.y -=0.1;
    }
}


var posicaoMouser = { //controla a posição do mouser
    x: 0,
    y: 0
};

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser

var onMouseDown = function(e){
    cliquePressionado = true;
    //console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
  //  console.log("SOltou o clique");
}


var onMouseMouse = function (e){
    if (cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }

        //cube.position.x += deltaMovimento.x*0.01;
        //cube.position.y += deltaMovimento.y*0.01*-1;

        objCarregado.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        objCarregado.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
    }

    posicaoMouser = {  //nova posição do mouser
        x : e.offsetX,
        y : e.offsetY
    };
}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}