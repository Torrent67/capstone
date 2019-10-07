var loadingScreen = {
	scene: new THREE.Scene(),
	camere: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshLambertMaterial({ colo:0x4444ff})
	)
};

//Loading screen
var RESOURSE_LOADED = false;

function init(){

loadingScreen.box.position.set(0,0,5);
loadingScreen.camere.lookAt(loadingScreen.box.position);
loadingScreen.scene.add(loadingScreen.box);

function animate() {

    if( RESOURSE_LOADED == false){
        requestAnimationFrame(animate);
        loadingScreen.box.rotation.y -= 0.04;
        loadingScreen.box.rotation.x += 0.04;
        
        renderer.render(loadingScreen.scene, loadingScreen.camere);
        return;
    }
}
};