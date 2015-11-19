if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer, objects;
var particleLight;

// var attributes = new function() {
// 	this.randomFaceFactor = 3.0;
// 	this.scramble = false;
// 	this.tweenSpeed = 500;
// };
var stuffHeads = new Array();
var gui;



window.onload = function() {
	gui = new dat.GUI();
	// gui.add(attributes, 'randomFaceFactor', 0.0, 50.0);
	// gui.add(attributes, 'scramble');
	// gui.add(attributes, 'tweenSpeed', 1, 1000);
};

init();


for(var i = 0; i < 3; i++){
	(function(i){
		stuffHeads.push(stuffHead(THREE).create(function(head){
			startTweens(head);
			scene.add(head.scene);
			head.attributes.posX = -175 + i * 175;
			head.mesh.position.x = head.attributes.posX;
			var folder = gui.addFolder("head " + i);
			folder.add(head.attributes, 'randomFaceFactor', 0.0, 50.0);
			folder.add(head.attributes, 'scramble')
				.onChange(function(scrable){
					if(scrable){
						startTweens(head);
					}
				});
			folder.add(head.attributes, 'tweenSpeed', 1, 1000);
			folder.add(head.attributes, 'posX', -500, 500)
				.onChange(function(value){
					head.mesh.position.x = value;
				});
			folder.add(head.attributes, 'posY', -500, 500)
				.onChange(function(value){
					head.mesh.position.y = value;
				});;
			folder.add(head.attributes, 'posZ', -500, 500)
				.onChange(function(value){
					head.mesh.position.z = value;
				});;

			//head.mesh.translateX(i*200);
		}));
	}(i))
}
function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 2, 2, 9 );

	scene = new THREE.Scene();

	particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 80, 80 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	scene.add( particleLight );

	// Lights

	scene.add( new THREE.AmbientLight( 0xcccccc ) );

	var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
	directionalLight.position.x = (Math.random() - 0.5) + 100;
	directionalLight.position.y = (Math.random() - 0.5) + 100;
	directionalLight.position.z = (Math.random() - 0.5) + 100;
	directionalLight.position.normalize();
	scene.add( directionalLight );

	var pointLight = new THREE.PointLight( 0xffffff, 4 );
	particleLight.add( pointLight );
	particleLight.position.x = 10000;
	particleLight.position.y = 10000;
	particleLight.position.z = 10000;

	renderer = new THREE.WebGLRenderer({antialiasing: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );
	animate();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function startTweens(head){
	var faceVertices = head.faceVertices;
	var originalFaceVertices = head.originalFaceVertices;
	for(var i = 0; i < faceVertices.length; i++){
		var faceVertex = faceVertices[i];
		var originalFaceVertex = originalFaceVertices[i];
		tweenVertex(faceVertex, originalFaceVertex, head.mesh.geometry, head.attributes);
	}
}

function tweenVertex(faceVertex, originalFaceVertex,faceGeometry, attributes){
	if(attributes.scramble){
		new TWEEN.Tween({x:faceVertex.x, y:faceVertex.y})
		.to({
				x:originalFaceVertex.x + (Math.random() - 0.5) * attributes.randomFaceFactor,
				y:originalFaceVertex.y + (Math.random() - 0.5) * attributes.randomFaceFactor
			},Math.random() * attributes.tweenSpeed)
		.onUpdate(function(){
			faceVertex.x = this.x;
			faceVertex.y = this.y;
			faceGeometry.verticesNeedUpdate = true;

			faceGeometry.normalsNeedUpdate = true;
		})
		.onComplete(function(){
			tweenVertex(faceVertex, originalFaceVertex,faceGeometry, attributes);
		})
		.start();
	}
}


function animate() {
	requestAnimationFrame( animate );
	// if(attributes.scramble){
	// 	TWEEN.update();
	// }
	TWEEN.update();
	render();
	stats.update();

}

var clock = new THREE.Clock();

function render() {

	var timer = Date.now() * 0.0005;

	 camera.lookAt( scene.position );

	// particleLight.position.x = Math.sin( timer * 4 ) * 10000;
	// particleLight.position.y = Math.cos( timer * 5 ) * 10000;
	// particleLight.position.z = Math.cos( timer * 4 ) * 10000;

	//THREE.AnimationHandler.update( clock.getDelta() );

	renderer.render( scene, camera );

}