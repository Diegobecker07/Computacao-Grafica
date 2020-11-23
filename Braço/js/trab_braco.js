var scene;
var camera;
var renderer;
var velocidadeCuboX = 0.1;
var velocidadeCuboY = 0.1;

var criaCubo = function() {
	var geometry = new THREE.CylinderGeometry( 1, 1, 12, 10 );
	red = new THREE.Color(1, 0, 0);
	green = new THREE.Color(0, 1, 0);
	blue = new THREE.Color(0, 0, 1);

	var colors = [red, green, blue];

	for (var i = 0; i < 3; i++){
		geometry.faces[4*i].color = colors[i];
		geometry.faces[4*i+1].color = colors[i];
		geometry.faces[4*i+2].color = colors[i];
		geometry.faces[4*i+3].color = colors[i];
		geometry.faces[4*i+4].color = colors[i];
		geometry.faces[4*i+5].color = colors[i];
		geometry.faces[4*i+6].color = colors[i];
		geometry.faces[4*i+7].color = colors[i];
	}

	var material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: true});
	braco = new THREE.Mesh(geometry, material);

	var geocot = new THREE.SphereGeometry(2, 32, 32); //cotovelo
	var matcot = new THREE.MeshBasicMaterial( { color: 0x006400 } );
	var matombro = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

	cotovelo = new THREE.Mesh(geocot, matcot);
	cotovelo.position.y -= 5;
	braco.add(cotovelo);
	antebraco = new THREE.Mesh(geometry, material);
	ombro = new THREE.Mesh(geocot, matombro);
	antebraco.position.y -= 5;
	ombro.position.y -= 7;
	antebraco.add(ombro);
	pivot = new THREE.Group();
	pivot.position.set(0,0,0);
	pivot.add(antebraco);
	pivot1 = new THREE.Group();
	pivot1.position.set(0, 0, 0);
	pivot1.add(braco);
	pivot.add(pivot1);
	scene.add(pivot);
	braco.position.y += pivot1.position.x+5;
};

var animaCubo = function() {
	matrizRotacao = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0,1,0,1), Math.PI/30.0)
};

function toRadians(angle){
	return angle * (Math.PI / 180);
}

var cliquePressionado = false;

var onMouseMove = function(e){
	if (cliquePressionado){
		var deltaMovimento = {
			x: e.offsetX - posicaoMouser.x,
			y: e.offsetY - posicaoMouser.y,
		}

		pivot1.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
		pivot1.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
	}

	posicaoMouser = {
		x: e.offsetX,
		y: e.offsetY
	};
}

var ci = 0;

var onMouseUp = function(e){
	cliquePressionado = false;
}

var onMouseDown = function(e){
	cliquePressionado = true;
}

var render = function() {
	requestAnimationFrame(render);
	animaCubo();
	renderer.render(scene, camera);
};

var rotationVelocity = 0.1;

function keyDownHandler(event) {
	console.log(event.keyCode)
	if (event.keyCode == 87){
		if (pivot1.rotation.x > 0 || pivot1.rotation.x < -1){
			rotationVelocity *=-1;
		}
		pivot1.rotation.x += rotationVelocity;
	}
	else if(event.keyCode == 65){
		if (pivot1.rotation.z > 0 || pivot1.rotation.z < -3){
			rotationVelocity *=-1;
		}
		pivot1.rotation.z += rotationVelocity;

	}
}

var init = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	this.criaCubo();
	camera.position.z = 100;
	render();

	document.addEventListener('mousedown', onMouseDown);
	document.addEventListener('mouseup', onMouseUp);
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('keydown', keyDownHandler, false);	
};

window.onload = this.init;
