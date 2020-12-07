var scene;
var camera;
var renderer;
var controls;

var velocity = 0.1;

var ground;

var objLoader;
var textureLoader;

var spotLight;

var obj; //objeto dinamico.

var objCarregado = [];

var char = [];

const clock = new THREE.Clock();
var mixer,action;




var guiFunction = function(){
    const gui = new dat.GUI();

    var parametroQualquer;

    var param = {
        campoTexto: "Teste Texturas",
        escala: 1,
        cor: "#000000",
        x:0,
        y:0,
        z:0,
        animais: ""
    };    

    gui.add(param, 'campoTexto').name("nome obj");
    
    var scale = gui.add(param, 'escala').min(0.1).max(5).step(0.1).name("escala");
    scale.onChange(function (parametroQualquer){
        objCarregado.scale.x = parametroQualquer;
        objCarregado.scale.y = parametroQualquer;
        objCarregado.scale.z = parametroQualquer;
    });


    var colore = gui.addColor(param, 'cor').name("Cor Obj");
    colore.onChange(function (parametroQualquer){
        console.log(objCarregado);
        objCarregado.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.color.setHex(parametroQualquer.replace("#", "0x"));
            }
        });
        //cotovelo.material.color.setHex(parametroQualquer.replace("#", "0x"));
    });


    var pastaPosicao = gui.addFolder("Posicao");

    var posX = pastaPosicao.add(param, 'x').min(-30).max(30).step(1).name("x");
    posX.onChange(function (parametroQualquer){
        objCarregado.position.x = parametroQualquer;
    });

    var posY = pastaPosicao.add(param, 'y').min(-30).max(30).step(1).name("y");
    posY.onChange(function (parametroQualquer){
        objCarregado.position.y = parametroQualquer;
    });

    var posZ = pastaPosicao.add(param, 'z').min(-30).max(30).step(1).name("z");
    posZ.onChange(function (parametroQualquer){
        objCarregado.position.z = parametroQualquer;
    });
    
    var chGeometry = gui.add(param, 'animais', ['Vaca', 'Vaca1', 'Ptero', 'Casa', 'Carro', 'Urso', 'Hamster', 'Ovelha', 'Ovelha1']).name("Elementos");
    chGeometry.onChange(function(parametroQualquer){
        
        if (parametroQualquer == 'Vaca'){
            camera.lookAt(objCarregado[0].position);
        }else if (parametroQualquer == 'Vaca1'){
            camera.lookAt(objCarregado[8].position);
        } else if (parametroQualquer == 'Ptero'){
            camera.lookAt(objCarregado[1].position);
        }else if (parametroQualquer == 'Casa'){
            camera.lookAt(objCarregado[2].position);
        }
        else if (parametroQualquer == 'Carro'){
            camera.lookAt(objCarregado[3].position);
        }
        else if (parametroQualquer == 'Urso'){
            camera.lookAt(objCarregado[4].position);
        }
        else if (parametroQualquer == 'Hamster'){
            camera.lookAt(objCarregado[5].position);
        }
        else if (parametroQualquer == 'Ovelha'){
            camera.lookAt(objCarregado[6].position);
        }
        else if (parametroQualquer == 'Ovelha1'){
            camera.lookAt(objCarregado[7].position);
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
    material = new THREE.MeshBasicMaterial({map : groundTexture});
    
    material.normalMap =  textureLoader.load('assets/textura/terrain/grasslight-big-nm.jpg');

    ground = new  THREE.Mesh(
        new THREE.PlaneGeometry(1050, 1050, 25,25),
        material
    );

    ground.rotation.x -= Math.PI / 2;
    ground.position.y=-2;

    scene.add(ground);
};

var loadObj = function(){
    objLoader = new THREE.OBJLoader();
    var fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();
 

    for (var i=0; i<7; i++){
        objLoader.load(
            'assets/models/tree.obj', //arquivo que vamos carregar
            function(object){
                
                object.traverse( function ( child ) {
                            if ( child instanceof THREE.Mesh ) {
                                child.material.map = textureLoader.load("assets/textura/Wood.jpg");
                                //child.material.shininess = 0;
                            }
                        });

                object.scale.x =50;
                object.scale.y = 50;
                object.scale.z = 50;

                object.position.z = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
                object.position.x = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
                
                object.position.y = -1;


                //object.rotation.y += 1;

                object.castShadow = true;

            // camera.lookAt(objCarregado.position)

                scene.add(object);    
            },//metodo, tudo deu certo
            function( andamento) {
                console.log((andamento.loaded / andamento.total *100) + "% pronto!");
            },//metodo executa enquanto carrega
            function (error){
                console.log("Deu caca: " + error);
            } //metodo deu merda
        );
    }

    fbxLoader.load(
        'assets/models/Cow.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[0] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UVCow.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.1;
            object.scale.y = 0.1;
            object.scale.z = 0.1;

            object.position.z = 0;
            object.position.x = 5;
            object.position.y = 1;


            object.rotation.y += 1;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Cow.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[8] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UVCow.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.06;
            object.scale.y = 0.06;
            object.scale.z = 0.06;

            object.position.z = -50;
            object.position.x = 30;
            object.position.y = 1;


            object.rotation.y += 1;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Pterodactyl.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[1] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UV Pterodactyl.png");
                            child.material.normalMap = 
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.01;
            object.scale.y = 0.01;
            object.scale.z = 0.01;

            object.position.z = -20;
            object.position.x = 15;
            object.position.y = 35;


            object.rotation.y -= 1.25;
            object.rotation.x -= 0.85;
            object.rotation.z -= 0.15;


            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/1Fantasy_House.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[2] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/House2_low_03 - Default_AlbedoTransparency.png");
                            child.material.normalMap = 
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 10;
            object.scale.y = 10;
            object.scale.z = 10;

            object.position.z = -100;
            object.position.x = -100;
            object.position.y = 00;

            object.rotation.z += 4.2;
            object.rotation.x += 4.6;
            object.rotation.y += -0.01;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/1Futuristic Car.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[3] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UV Car.png");
                            child.material.normalMap = 
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.07;
            object.scale.y = 0.07;
            object.scale.z = 0.07;

            object.position.z = -100;
            object.position.x = -120;
            object.position.y = 00;

            object.rotation.y += 2;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/1Bear_low.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[4] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/Bear_low_02 - Default_AlbedoTransparency.png");
                            child.material.normalMap = 
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 14;
            object.scale.y = 14;
            object.scale.z = 14;

            object.position.z = 10;
            object.position.x = 420;
            object.position.y = 00;

            object.rotation.y += 2;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/1Humster.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[5] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/h.png");
                            child.material.normalMap = 
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 14;
            object.scale.y = 14;
            object.scale.z = 14;

            object.position.z = 10;
            object.position.x = 20;
            object.position.y = 00;


            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/1Sheep.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[6] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UVSheep.png");
                            child.material.normalMap = 
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.1;
            object.scale.y = 0.1;
            object.scale.z = 0.1;

            object.position.z = -10;
            object.position.x = -220;
            object.position.y = 00;


            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/1Sheep.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[7] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UVSheep.png");
                            child.material.normalMap = 
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.1;
            object.scale.y = 0.1;
            object.scale.z = 0.1;

            object.position.z = 5;
            object.position.x = -170;
            object.position.y = 00;


            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
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

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

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

    //controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    scene.add(new THREE.AmbientLight( 0x888888 ));


    criaGround();

    guiFunction();
    
    scene.fog = new THREE.Fog( 0xcce0ff, 200, 500 );

    render();
    //  synchronizeCrossFade( ) ;
    


    document.addEventListener('keydown', onKeyDown ); 

    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    const delta = clock.getDelta();

	if ( mixer ) mixer.update( delta );
    
   // controls.update();
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
       camera.lookAt(objCarregado[1].position);
    }
    if(e.keyCode == 87){
        camera.position.z-= 0.5;
    }
    if(e.keyCode == 83){
        camera.position.z+= 0.5;
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

      // camera.rotation.x += toRadians(deltaMovimento.y*0.5)*0.1;
       camera.rotation.y += toRadians(deltaMovimento.x*0.1)*0.1;
      
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

var stop = false;