var scene, camera, renderer, createFloor, loadObj, activeAction, lastAction;

var animationActions = Array();

var material, floor;
var pontos = 0;

var velocidade = false;
var velocidade1 = 0.3;
var velocidade2 = 0.08;

var iniciar = false;
var esquerda = false;
var direita = false;
var cima = false;
var baixo = false;

var objetosCarregados = [];

function verifica() {
  if(cima){
    camera.position.z -= 0.5;
      objetosCarregados[0].position.z -= 0.5;
      //console.log("Pos carro Z: " + objetosCarregados[0].position.z);
      if(objetosCarregados[0].position.z == -70){
          objetosCarregados[0].position.z = 0;
          camera.position.z = 10;
      }
  }
  if(direita){
    objetosCarregados[0].position.x += velocidade2;
    direita = false;
  }
  if(esquerda){
    objetosCarregados[0].position.x -= velocidade2;
    esquerda = false;
  }   

  if(objetosCarregados[0].position.z == -60){
    let a = Math.floor(Math.random() * 2);
        if(a == 1){
          objetosCarregados[1].position.x = Math.floor(Math.random() * 5);
        }
        else{
          objetosCarregados[1].position.x = Math.floor(Math.random() * -5);
        }
  }
  //console.log("Pos carro X: " + objetosCarregados[0].position.x);
}

function colisao(){
  
}

var render = () => {
  requestAnimationFrame(render);
  //document.getElementById("points").innerHTML = pontos + " Pontos";
  //pontos++;
  verifica();
  colisao();
  renderer.render(scene, camera);
};

createFloor = () => {
  var textureLoader = new THREE.TextureLoader();
  var floorTexture = textureLoader.load("assets/textura/terrain/floor.png");

  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(20, 20);
  floorTexture.anisotropy = 16;
  floorTexture.encoding = THREE.sRGBEncoding;

  floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 25, 25),
    new THREE.MeshBasicMaterial({ map: floorTexture })
  );

  floor.rotation.x -= Math.PI / 2;
  floor.position.y = -2;

  scene.add(floor);
};

loadObj = () => {
  var fbxLoader = new THREE.FBXLoader();
  var textureLoader = new THREE.TextureLoader();
  fbxLoader.load(
    "assets/models//plc/Police Car.fbx",
    (object) => {
      objetosCarregados[0] = object;

      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          console.log(child);
          child.material.map = textureLoader.load(
            "assets/models/plc/UVPoliceCar.png"
          );
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
    },
    (andamento) => {
      console.log((andamento.loaded / andamento.total) * 100 + "% pronto!");
    },
    (error) => {
      console.log("Deu caca: " + error);
    }
  );
    
    fbxLoader.load(
      "assets/models/tree/ChristmasTree.fbx",
      (object) => {
        objetosCarregados[1] = object;
  
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            console.log(child);
            child.material.map = textureLoader.load(
              "assets/models/tree/UV Christmas Tree.png"
            );
            child.material.shininess = 0;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
  
        object.scale.x = 0.004;
        object.scale.y = 0.004;
        object.scale.z = 0.004;
        object.position.y = -1.5;
        object.position.z = -50;

        let a = Math.floor(Math.random() * 2);
        if(a == 1){
          object.position.x = Math.floor(Math.random() * 5);
        }
        else{
          object.position.x = Math.floor(Math.random() * -5);
        }

        

        scene.add(object);
      },
      (andamento) => {
        console.log((andamento.loaded / andamento.total) * 100 + "% pronto!");
      },
      (error) => {
        console.log("Deu caca: " + error);
      }
    );

  cima = true;
};

window.onload = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcce0ff);
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  loadObj();

  camera.position.x = 0;
  camera.position.z = 10;
  camera.position.y = 2;
  scene.add(camera);

  //criação do chão
  createFloor();

  var light = new THREE.PointLight(0xffffff);
  light.position.set(1, 10, 40);
  scene.add(light);

  document.addEventListener("keydown", (event) => {
    event = event || window.event;
    var keycode = event.keyCode;
    switch (keycode) {
      case 37:
        esquerda = true;
        velocidade = true;
        break;
      case 38:
        cima = true;
        velocidade = true;
        break;
      case 39:
        direita = true;
        velocidade = true;
        break;
      case 40:
        baixo = true;
        velocidade = true;
        break;
    }
  });
  document.addEventListener("keyup", () => {
    event = event || window.event;
    var keycode = event.keyCode;
    switch (keycode) {
      case 37:
        console.log("Largou esq");
        esquerda = false;
        velocidade = false;
        break;
      case 38:
        console.log("Largou cima");
        cima = false;
        velocidade = false;
        break;
      case 39:
        console.log("Largou direita");
        direita = false;
        velocidade = false;
        break;
      case 40:
        console.log("Largou baixo");
        baixo = false;
        velocidade = false;
        break;
    }
  });

  render();
};
