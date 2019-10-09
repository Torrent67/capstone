var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var keyboard = {};
var aspect = window.innerWidth / window.innerHeight;
var player = { height:1.8, speed:1, turnSpeed:Math.PI*0.02 };
var d = 100;

//RENDERER
renderer = new THREE.WebGLRenderer({
	canvas: myCanvas,
	antialias: true
})
renderer.setClearColor("#51565a")
renderer.setSize(window.innerWidth, window.innerHeight);
function init(){

//CAMERA
//SCENE
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
        camera.rotation.y = 45/180*Math.PI;
        camera.position.x = 800;
        camera.position.y = 100;
        camera.position.z = 1000;
	controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', renderer);

//LIGHTS
hlight = new THREE.PointLight (0xffffff,100);
scene.add(hlight);
directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(0,4,0);
directionalLight.castShadow = false;
scene.add(directionalLight);


document.body.appendChild(renderer.domElement);

var loader = new THREE.GLTFLoader();
loader.load('models/rail_basic2_v1.glb', function(gltf){

	map = gltf.scene.children[0];
	map.scale.set(0.5,0.5,0.5);

	scene.add(gltf.scene);
	animate();
  });
}
function animate() {
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}



function animate() {









    requestAnimationFrame(animate);

    

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
    keyboard[event.keyCode] = false;
}

function keyUp(event) {
    keyboard[event.keyCode] = true;
}


window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
}),

    window.onload = init;