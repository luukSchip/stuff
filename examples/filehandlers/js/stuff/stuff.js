//test//

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var yRotationFactor = 1;
var xRotation = 0;
var zPosition = 10.0;
var verbose = false;
var container, stats;
var orbitBox;
var camera, scene, renderer, objects;
var particleLight;
var stuffHeads = new Array();
var audio;
var gui;
var audioLevels = new Array();
//var preset = JSON.parse('[{"scale":1.0,"scrambleAmplitude":0.2,"scramble":true,"tweenSpeed":243.39042084703186,"posX":0,"posY":0,"posZ":0,"lowCut":0,"highCut":271.0431787576966},{"scale":1.0,"scrambleAmplitude":0.2,"scramble":true,"tweenSpeed":113.64270613107823,"posX":0,"posY":106.58263475233196,"posZ":7.32365815649581,"lowCut":203.28238406827242,"highCut":565.7618040873855},{"scale":1.0,"scrambleAmplitude":0.2,"scramble":true,"tweenSpeed":1,"posX":0,"posY":283.04303758937397,"posZ":-36.79144255276469,"lowCut":598.5536864232465,"highCut":1024}]');
var attributes = {
	camRotationX: 0.3,
	camRotationY: 0.07
};
//var modelFiles = ["1.dae","2.dae"];//["1.dae","2.dae","3.dae","4.dae","5.dae"];

window.onload = function() {
	init();
};

function exportPreset(){
	var attributesArray = new Array();
	for(var i = 0; i < stuffHeads.length; i++){
		attributesArray.push(stuffHeads[i].attributes);
	}
	window.prompt("Kopiëer en stuur naar Luuk:", JSON.stringify(attributesArray));
}

function importPreset(){
	var presetString = window.prompt("Plak hier uw preset", "");
	var attributesArray = JSON.parse(presetString);
	console.log(attributesArray);
	for(var i = 0; i < stuffHeads.length; i++){
		var head = stuffHeads[i];
		var presetAttributes = attributesArray[i];
		for(key in head.attributes){
			head.attributes[key] = presetAttributes[key];
		}
		head.refresh();
	}
}

function init() {
	initGui();
	initFileHandlers();
	initScene();
	animate();
	initMouseHandlers();
}

function loadModels(path){
	var loader = new THREE.ColladaLoader();
	//loader.options.convertUpAxis = true;
	loader.load( path , function ( collada ) {
		scene.add(collada.scene);
		for(var i = 0; i < collada.scene.children[0].children.length; i++){
			console.log(collada.scene.children[0].children.length);
			stuffHead(THREE).fromCollada(collada.scene.children[0].children[i],function(head){onLoadedHead(head,i)});
		}
	});
}

function initGui(){
	gui = new dat.GUI();
	gui.add(attributes, 'camRotationY', 0.0, 1.0).listen();
	gui.add(attributes, 'camRotationX', 0.0, 1.0).listen();
}

function initMouseHandlers(){
	document.onmousemove = function (oPssEvt2) {
	    var oMsEvent2 = oPssEvt2 || /* IE */ window.event;
	    yRotationFactor = 0.5 - (parseFloat(oMsEvent2.clientX) / parseFloat(window.innerWidth));
	    xRotation = 0.5 - (parseFloat(oMsEvent2.clientY) / parseFloat(window.innerHeight));
	};
	window.addWheelListener(document.body,function(e){
		console.log(e.deltaY);
		zPosition = e.deltaY > 0 ? Math.min(1000,zPosition * 1.1) : zPosition * 0.9;
	},false);
}

function initFileHandlers(){
	function handleAudioFileSelect(e) {
	    initAudio([URL.createObjectURL(e.target.files[0])],true);
	}
	function handleModelFileSelect(e) {
	    loadModels(URL.createObjectURL(e.target.files[0]),true);
	}
	document.getElementById('audio-file')
		.addEventListener('change', handleAudioFileSelect, false);
	document.getElementById('model-file')
		.addEventListener('change', handleModelFileSelect, false);
	document.getElementById('export-button').onclick = exportPreset;
	document.getElementById('import-button').onclick = importPreset;
}

function initAudio(filenames,absolute){
	audio = stuffAudio(filenames,absolute).init();
}

function initHeads(path){
	//for(var i = 0; i < 3; i++){
		(function(i){
			stuffHeads.push(stuffHead(THREE).create(function(head){onLoadedHead(head,i)}, path));
		}(stuffHeads.length))
	//}
}

function onLoadedHead(head,i){
	console.log("onLoadedHead " + i);
	console.log(head);
	audioLevels.push(0.0);
	stuffHeads.push(head);
	startTweens(i);
	// scene.add(head.mesh);
	var folder = gui.addFolder("head " + i);
	folder.add(head.attributes, 'scrambleAmplitude', 0.0, 1.0).listen();
	folder.add(head.attributes, 'tweenSpeed', 1, 1000).listen();
	folder.add(head.attributes, 'scale', 0, 5)
		.listen()
		.onChange(function(value){
			head.mesh.scale.set(value,value,value);
		});
	folder.add(head.attributes, 'posX', -500, 500)
		.listen()
		.onChange(function(value){
			head.mesh.position.x = value;
		});
	folder.add(head.attributes, 'posY', -500, 500)
		.listen()
		.onChange(function(value){
			head.mesh.position.y = value;
		});
	folder.add(head.attributes, 'posZ', -500, 500)
		.listen()
		.onChange(function(value){
			head.mesh.position.z = value;
		});
	folder.add(head.attributes, 'lowCut', 0, 1024).listen();
	folder.add(head.attributes, 'highCut', 0, 1024).listen();
}


function initScene(){
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	orbitBox = new THREE.Object3D()

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 2, 2, zPosition );
	orbitBox.add(camera);

	scene = new THREE.Scene();

	scene.add(orbitBox);

	particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 80, 80 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	scene.add( particleLight );

	// Lights

	//scene.add( new THREE.AmbientLight( 0x440000 ) );

	var directionalLight = new THREE.DirectionalLight(0xffffff );
	directionalLight.position.x = 800;
	directionalLight.position.y = 30;
	directionalLight.position.z = -50;
	//directionalLight.position.normalize();
	scene.add( directionalLight );

	var pointLight = new THREE.PointLight( 0xffffff, 4 );
	particleLight.add( pointLight );
	particleLight.position.x = -100;
	particleLight.position.y = 100;
	particleLight.position.z = 0;

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
	var amplitude = 1 - (0.5 - Math.random() * 2) * attributes.scrambleAmplitude * parseFloat(audioLevels[headIndex] / 100.0);
	if(attributes.scramble){
		new TWEEN.Tween({x:faceVertex.x, y:faceVertex.y, z:faceVertex.z})
		.to({
				x:originalFaceVertex.x * amplitude,
				y:originalFaceVertex.y * amplitude,
				z:originalFaceVertex.z * amplitude
			},Math.random() * attributes.tweenSpeed)
		.onUpdate(function(){
			faceVertex.x = this.x;
			faceVertex.y = this.y;
			faceVertex.z = this.z;
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
	TWEEN.update();
	render();
	analyzeAudio();
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

	orbitBox.rotateY(attributes.camRotationY * yRotationFactor);
	camera.position.y = 20 * xRotation * attributes.camRotationX;
	 camera.position.z = zPosition;
	camera.lookAt( scene.position );

	renderer.render( scene, camera );

}