if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var verbose = false;
var container, stats;
var camera, scene, renderer, objects;
var particleLight;
var stuffHeads = new Array();
var audio;
var gui;
var audioLevels = [0.0,0.0,0.0];
var preset = JSON.parse('[{"scrambleAmplitude":12.13165269504664,"scramble":true,"tweenSpeed":243.39042084703186,"posX":-175,"posY":0,"posZ":0,"lowCut":0,"highCut":271.0431787576966},{"scrambleAmplitude":24.814744148959036,"scramble":true,"tweenSpeed":113.64270613107823,"posX":0,"posY":106.58263475233196,"posZ":7.32365815649581,"lowCut":203.28238406827242,"highCut":565.7618040873855},{"scrambleAmplitude":40.02818886539817,"scramble":true,"tweenSpeed":1,"posX":172.75528581622268,"posY":283.04303758937397,"posZ":-36.79144255276469,"lowCut":598.5536864232465,"highCut":1024}]');
window.onload = function() {
	gui = new dat.GUI();
	init();
};


function init() {
	initFileHandlers();
	initScene();
	animate();

}

function initFileHandlers(){
	function handleAudioFileSelect(e) {
	    initAudio([URL.createObjectURL(e.target.files[0])],true);
	}
	function handleModelFileSelect(e) {
	    initHeads(URL.createObjectURL(e.target.files[0]),true);
	}
	document.getElementById('audio-file')
		.addEventListener('change', handleAudioFileSelect, false);
	document.getElementById('model-file')
		.addEventListener('change', handleModelFileSelect, false);
}

function initAudio(filenames,absolute){
	audio = stuffAudio(filenames,absolute).init();
}

function initHeads(path){
	for(var i = 0; i < 3; i++){
		(function(i){
			stuffHeads.push(stuffHead(THREE).create(function(head){
				startTweens(i);
				scene.add(head.scene);
				//var preset = JSON.parse(preset);
				//console.log(preset);
				//head.attributes = preset[i];
				head.mesh.position.x = head.attributes.posX;
				head.mesh.position.y = head.attributes.posY;
				head.mesh.position.z = head.attributes.posZ;
				var folder = gui.addFolder("head " + i);
				folder.add(head.attributes, 'scrambleAmplitude', 0.0, 50.0);
				folder.add(head.attributes, 'tweenSpeed', 1, 1000);
				folder.add(head.attributes, 'posX', -500, 500)
					.onChange(function(value){
						head.mesh.position.x = value;
					});
				folder.add(head.attributes, 'posY', -500, 500)
					.onChange(function(value){
						head.mesh.position.y = value;
					});
				folder.add(head.attributes, 'posZ', -500, 500)
					.onChange(function(value){
						head.mesh.position.z = value;
					});
				folder.add(head.attributes, 'lowCut', 0, 1024);
				folder.add(head.attributes, 'highCut', 0, 1024);


				//head.mesh.translateX(i*200);
			}, path));
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
	particleLight.position.z = -50;

	renderer = new THREE.WebGLRenderer({antialiasing: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

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
				x:originalFaceVertex.x + (Math.random() - 0.5) * attributes.scrambleAmplitude * parseFloat(audioLevels[headIndex] / 100.0),
				y:originalFaceVertex.y + (Math.random() - 0.5) * attributes.scrambleAmplitude * parseFloat(audioLevels[headIndex] / 100.0)
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
	//stats.update();
	analyzeAudio();
	//adjustSizes();
}

function adjustSizes(){
	for(var i = 0; i < stuffHeads.length; i++){
		var mesh = stuffHeads[i].mesh;
		mesh.scale.x = audioLevels[i] / 200;
	}
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
		if(audio){
			if(audio.analysers.length > 0){
				var analyser = audio.analysers[0];
				var dataArray = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(dataArray);
				var average = 0;
				var head = stuffHeads[i];
				var lowCut = parseInt(Math.min(head.attributes.lowCut,head.attributes.highCut));
				var highCut = parseInt(Math.max(head.attributes.lowCut,head.attributes.highCut));
				var bandWidth = Math.abs(highCut - lowCut);
				for(var j=lowCut; j<highCut; j++) {
				    average += parseFloat(dataArray[j]);
				}
				average = average/bandWidth;
				audioLevels[i] = average;
				if(verbose){
					var logStuff = {
						dataArray: dataArray,
						bandWidth: bandWidth,
						lowCut: lowCut, 
						highCut: highCut,
						average: average
					};
					console.log(logStuff);
				}
			}
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