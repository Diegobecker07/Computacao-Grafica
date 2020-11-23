var scene;
var camera;
var renderer;

var create = function() {
    var box = new THREE.BoxGeometry( 2, 10, 2 );
    var cone = new THREE.DodecahedronGeometry(7);
    var cilindro = new THREE.CylinderGeometry(4, 4, 10, 50);
    var chao = new THREE.PlaneGeometry(300,300);

    var corVerde = new THREE.MeshBasicMaterial( { color: 0x42FF33, vertexColors: true } );
    var corVermelha = new THREE.MeshBasicMaterial( { color: 0xFF0B0E, vertexColors: true } );
    var corRosa = new THREE.MeshBasicMaterial( { color: 0xFF0BDE, vertexColors: true } );
    var corAmarela = new THREE.MeshBasicMaterial( { color: 0xF4FF0B, vertexColors: true } );
    var corBranca = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, vertexColors: true } );

    box0 = new THREE.Mesh(box, corVerde);
    box1 = new THREE.Mesh(box, corVermelha);
    box2 = new THREE.Mesh(box, corRosa);
    box3 = new THREE.Mesh(box, corAmarela);
    box4 = new THREE.Mesh(box, corBranca);
    
    scene.add(box0);
    scene.add(box1);
    scene.add(box2);
    scene.add(box3);
    scene.add(box4);

    cone0 = new THREE.Mesh(cone, corVerde);
    cone1 = new THREE.Mesh(cone, corVermelha);
    cone2 = new THREE.Mesh(cone, corRosa);
    cone3 = new THREE.Mesh(cone, corAmarela);
    cone4 = new THREE.Mesh(cone, corBranca);

    scene.add(cone0);
    scene.add(cone1);
    scene.add(cone2);
    scene.add(cone3);
    scene.add(cone4);

    cilindro0 = new THREE.Mesh(cilindro, corVerde);
    cilindro1 = new THREE.Mesh(cilindro, corVermelha);
    cilindro2 = new THREE.Mesh(cilindro, corRosa);
    cilindro3 = new THREE.Mesh(cilindro, corAmarela);
    cilindro4 = new THREE.Mesh(cilindro, corBranca);
    chao = new THREE.Mesh( chao, corVerde);

    scene.add(cilindro0);
    scene.add(cilindro1);
    scene.add(cilindro2);
    scene.add(cilindro3);
    scene.add(cilindro4);
    scene.add(chao)

    box0.position.x= 1
    box0.position.y= 1
    box0.position.z= 10

    box1.position.x= 30
    box1.position.y= -10
    box1.position.z= 10

    box2.position.x= 50
    box2.position.y= -34
    box2.position.z= 10

    box3.position.x= 34
    box3.position.y= -37
    box3.position.z= 10

    box4.position.x= 80
    box4.position.y= -60
    box4.position.z= 10

    cone0.position.x= 1
    cone0.position.y= 90
    cone0.position.z= 10

    cone1.position.x= -10
    cone1.position.y= 5
    cone1.position.z= 10

    cone2.position.x= -30
    cone2.position.y= -10
    cone2.position.z= 10

    cone3.position.x= 44
    cone3.position.y= 20
    cone3.position.z= 10

    cone4.position.x= 33
    cone4.position.y= -28
    cone4.position.z= 10

    cilindro0.position.x= 13
    cilindro0.position.y= -30
    cilindro0.position.z= 10

    cilindro1.position.x= 33
    cilindro1.position.y= -28
    cilindro1.position.z= 10

    cilindro2.position.x= 33
    cilindro2.position.y= -28
    cilindro2.position.z= 10

    cilindro3.position.x= 33
    cilindro3.position.y= -28
    cilindro3.position.z= 10

    cilindro4.position.x= 33
    cilindro4.position.y= -28
    cilindro4.position.z= 10

    chao.position.y-=50
    chao.rotateX(toRadians(-90))
};

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.create();

    camera.position.z = 100;

    render();

    document.addEventListener('keydown', onKeyDown ); 

};

var render = function() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
};


var onKeyDown = function(e){
    if (e.keyCode == 32){
        camera.rotateY(toRadians(0.1))
    }
    if (e.keyCode == 37){
        camera.position.x-= 0.5
    }
    if (e.keyCode == 38){
        camera.position.y+= 0.5
    }
    if (e.keyCode == 39){
        camera.position.x+= 0.5
    }
    if (e.keyCode == 40){
        camera.position.y-= 0.5
    }
    if (e.keyCode == 65){
        camera.position.z-= 0.5
    }
    if (e.keyCode == 81){
        camera.position.z+= 0.5
    } 
}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}