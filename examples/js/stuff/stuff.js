if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer, objects;
var particleLight;
var stuffHeads = new Array();
var audio;
var gui;
var audioLevels = [0.0,0.0,0.0];

window.onload = function() {
	gui = new dat.GUI();
	init();
};


function init() {
	initHeads();
	initAudio(["on.mp3"]);
	initScene();
	animate();

}

function initAudio(filenames){
	audio = stuffAudio(filenames).init();
};

function initHeads(){
	for(var i = 0; i < 3; i++){
		(function(i){
			stuffHeads.push(stuffHead(THREE).create(function(head){
				startTweens(i);
				scene.add(head.scene);
				head.attributes.posX = -175 + i * 175;
				head.mesh.position.x = head.attributes.posX;
				var folder = gui.addFolder("head " + i);
				folder.add(head.attributes, 'randomFaceFactor', 0.0, 50.0);
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
}


function initScene(){
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 2, 2, 9 );

	scene = new THREE.Scene();

	particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 80, 80 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	scene.add( particleLight );

	// Lights

	//scene.add( new THREE.AmbientLight( 0x440000 ) );

	var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0x9999ff );
	directionalLight.position.x = 100;
	directionalLight.position.y = 100;
	directionalLight.position.z = 30;
	//directionalLight.position.normalize();
	scene.add( directionalLight );

	var pointLight = new THREE.PointLight( 0x441922, 4 );
	particleLight.add( pointLight );
	particleLight.position.x = -100;
	particleLight.position.y = 100;
	particleLight.position.z = 0;

	renderer = new THREE.WebGLRenderer({antialiasing: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
};

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function startTweens(headIndex){
	var head = stuffHeads[headIndex];
	var faceVertices = head.faceVertices;
	var originalFaceVertices = head.originalFaceVertices;
	for(var i = 0; i < faceVertices.length; i++){
		var faceVertex = faceVertices[i];
		var originalFaceVertex = originalFaceVertices[i];
		tweenVertex(headIndex, faceVertex, originalFaceVertex);
	}
}

function tweenVertex(headIndex, faceVertex, originalFaceVertex){
	var faceGeometry = stuffHeads[headIndex].mesh.geometry;
	var attributes = stuffHeads[headIndex].attributes;
	if(attributes.scramble){
		new TWEEN.Tween({x:faceVertex.x, y:faceVertex.y})
		.to({
				x:originalFaceVertex.x + (Math.random() - 0.5) * attributes.randomFaceFactor * parseFloat(audioLevels[headIndex] / 100.0),
				y:originalFaceVertex.y + (Math.random() - 0.5) * attributes.randomFaceFactor * parseFloat(audioLevels[headIndex] / 100.0)
			},Math.random() * attributes.tweenSpeed)
		.onUpdate(function(){
			faceVertex.x = this.x;
			faceVertex.y = this.y;
			faceGeometry.verticesNeedUpdate = true;

			faceGeometry.normalsNeedUpdate = true;
		})
		.onComplete(function(){
			tweenVertex(headIndex, faceVertex, originalFaceVertex);
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
	analyzeAudio();
}

function analyzeAudio(){
	// for(var i = 0; i < audio.analysers.length; i++){
	// 	//var buffer = audio.sources[i].buffer;
	// 	var analyser = audio.analysers[i];
	// 	var dataArray = new Uint8Array(analyser.frequencyBinCount);
	// 	analyser.getByteFrequencyData(dataArray);
	// 	var average = 0;
	// 	for(var j=0; j<dataArray.length; j++) {
	// 	    average += parseFloat(dataArray[j]);
	// 	}
	// 	average = average/dataArray.length;
	// 	audioLevels[i] = average;
	// }
	for(var i = 0; i < stuffHeads.length; i++){
		if(audio.analysers.length > 0){
			var analyser = audio.analysers[0];
			var dataArray = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(dataArray);
			var average = 0;
			for(var j=i*(dataArray.length / stuffHeads.length); j<(i+1)*(dataArray.length / stuffHeads.length); j++) {
			    average += parseFloat(dataArray[j]);
			    console.log
			}
			average = average/dataArray.length;
			audioLevels[i] = average;
		}
	}
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