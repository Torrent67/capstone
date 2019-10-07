var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var keyboard = {};
var mouse = new THREE.Vector2();
var player = { height:1.8, speed:1, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = true;
var aspect = window.innerWidth / window.innerHeight;
var d = 100;


//Loading screen
var loadingScreen = {
	scene: new THREE.Scene(),
	camere: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshLambertMaterial({ colo:0x4444ff})
	)
};

//Loading screen
var LOADING_MANAGER = null;
var RESOURSE_LOADED = false;

function init(){

loadingScreen.box.position.set(0,0,5);
loadingScreen.camere.lookAt(loadingScreen.box.position);
loadingScreen.scene.add(loadingScreen.box);

loadingManager = new THREE.LoadingManager();

	scene = new THREE.Scene();
	camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
	
	mesh = new THREE.Mesh(
		new THREE.TorusGeometry(30, 2, 20, 100 ),
		new THREE.MeshBasicMaterial({color:0xff4444, wireframe:true})
	);
	mesh.position.y += 1;
	// The cube can have shadows cast onto it, and it can cast shadows
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(mesh);
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(300,300, 300,300),
		// MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
		new THREE.MeshLambertMaterial({color:0x238dd3, wireframe:USE_WIREFRAME})
		// See threejs.org/examples/ for other material types
	);
	meshFloor.rotation.x -= Math.PI / 2;
	// Floor can have shadows cast onto it
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);
	
	
	// LIGHTS
	ambientLight = new THREE.AmbientLight(0xffffff, 1);
	scene.add(ambientLight);
	
	light = new THREE.PointLight(0xff4444, 0.8, 0.8);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	// Will not light anything closer than 0.1 units or further than 25 units
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 50;
	scene.add(light);
	
	
	camera.position.set( 80, 80, 80 );
	camera.rotation.order = 'YXZ';
	camera.rotation.y = - Math.PI / 4;
	camera.rotation.x = Math.atan( - 2 / Math.sqrt( 4) );
	
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor("#51565a")
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	// Enable Shadows in the Renderer
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	
	document.body.appendChild(renderer.domElement);

	// Model/material loading!
	// var mtlLoader = new THREE.MTLLoader(loadingManager);
	// mtlLoader.load("models/Brown_Waterfall_01.mtl", function(materials){
		
	// 	materials.preload();
	// 	var objLoader = new THREE.OBJLoader(loadingManager);
	// 	objLoader.setMaterials(materials);
		
	// 	objLoader.load("models/Brown_Waterfall_01.obj", function(mesh){
		
	// 		mesh.traverse(function(node){
	// 			if( node instanceof THREE.Mesh ){
	// 				node.castShadow = false;
	// 				node.receiveShadow = false;
	// 			}
	// 		});
		
	// 		scene.add(mesh); 
	// 		mesh.position.set(-4, 0, 4);
	// 		mesh.rotation.y = -Math.PI/4;
	// 	});
		
	// });
	


    animate();
}

function animate() {

	//loadscreen work in progress set to false to see a cube
if( RESOURSE_LOADED == true){
	requestAnimationFrame(animate);
	loadingScreen.box.rotation.y -= 0.04;
	loadingScreen.box.rotation.x += 0.04;
	
	renderer.render(loadingScreen.scene, loadingScreen.camere);
	return;
}






    requestAnimationFrame(animate);

    mesh.rotation.y += 0.01;
    mesh.rotation.z += 2;

    	// Keyboard movement inputs
	if(keyboard[68]){ // D key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[87]){ // W key
		// Redirect motion by 90 degrees
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
    }
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	
    }
    renderer.render(scene, camera);
}



function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

function onMouseMove(event) {
	event.preventDefault();
	loadingScreen.box.rotation.y -= 0.04;
	loadingScreen.box.rotation.x += 0.04;
	mouse.x = RESOURCES_LOADED = true;
	return;
}

window.addEventListener('click', onMouseMove);
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
}),

    window.onload = init;