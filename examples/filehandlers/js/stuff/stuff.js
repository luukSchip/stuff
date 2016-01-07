//test//

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var yRotationFactor = 1;
var xRotation = 0;
var zPosition = 10.0;
var verbose = false;
var container, stats;
var orbitBox;
var camera, scene, renderer;
var particleLight;
var people = [];
var audio;
var gui;
var audioLevels = [];
var attributes = {
	camRotationX: 0.3,
	camRotationY: 0.07
};

window.onload = function() {
	init();
};


function exportPreset(e){
	console.log(e);
	var attributesArray = [];
	for(var i = 0; i < people.length; i++){
		attributesArray.push(people[i].attributes);
	}
	var fileParts = [JSON.stringify(attributesArray)];
	var myBlob = new Blob(fileParts, {type : 'application/json'});
	var myFile = utils.blobToFile(myBlob,"preset.json");
	var objectUrl = URL.createObjectURL(myFile);
	var fileName = window.prompt("Filename", "preset.json");
	e.target.href = objectUrl;
	e.target.download = fileName;
}

function importPreset(presetFile){
	var reader = new FileReader();
	reader.onload = (function(theFile) {
	  return function(e) {
		var presetString = e.target.result;
		var attributesArray = JSON.parse(presetString);
		console.log(attributesArray);
		for(var i = 0; i < people.length; i++){
			var person = people[i];
			var presetAttributes = attributesArray[i];
			for(key in person.attributes){
				person.attributes[key] = presetAttributes[key];
			}
			person.refresh();
		}
	  };
	})(presetFile);
	reader.readAsBinaryString(presetFile);
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
	loader.load( path , function ( collada ) {
		scene.add(collada.scene);
		for(var i = 0; i < collada.scene.children[0].children.length; i++){
			console.log(collada.scene.children[0].children.length);
			stuffObject(THREE).fromSingleObject(collada.scene.children[0].children[i],function(head){onLoadedPerson(head,i)});
		}
	});
}

function initGui(){
	gui = new dat.GUI();
	gui.add(attributes, 'camRotationY', 0.0, 1.0).listen();
	gui.add(attributes, 'camRotationX', 0.0, 1.0).listen();

	$(".menu-container .title").each(function(){
		$(this).click(minimizeMenu);
	});


	function minimizeMenu(e){
		var $el = $(e.target).closest(".menu-container").find(".menu");
		if($el.is(':visible')){
			$el.hide();
		}else{
			$el.show();
		}
		return false;
	}
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
	function handlePresetFileSelect(e) {
	    importPreset(e.target.files[0]);
	}
	document.getElementById('audio-file')
		.addEventListener('change', handleAudioFileSelect, false);
	document.getElementById('model-file')
		.addEventListener('change', handleModelFileSelect, false);
	document.getElementById('preset-file')
		.addEventListener('change', handlePresetFileSelect, false);
	document.getElementById('export-button').onclick = exportPreset;
}

function initAudio(filenames,absolute){
	audio = stuffAudio(filenames,absolute).init();
}

function initPeople(path){
	(function(i){
		people.push(stuffObject(THREE).create(function(head){onLoadedPerson(head,i)}, path));
	}(people.length))
}

function onLoadedPerson(person, i){
	console.log("onLoadedPerson " + i);
	console.log(person);
	audioLevels.push(0.0);
	people.push(person);
	startTweens(i);
    person.startAnimations();
	var folder = gui.addFolder("person " + i);
	folder.add(person.attributes, 'scrambleAmplitude', 0.0, 1.0).listen();
	folder.add(person.attributes, 'tweenSpeed', 1, 1000).listen();
	folder.add(person.attributes, 'scale', 0, 5)
		.listen()
		.onChange(function(value){
			person.mesh.scale.set(value,value,value);
		});
	folder.add(person.attributes, 'posX', -500, 500)
		.listen()
		.onChange(function(value){
			person.mesh.position.x = value;
		});
	folder.add(person.attributes, 'posY', -500, 500)
		.listen()
		.onChange(function(value){
			person.mesh.position.y = value;
		});
	folder.add(person.attributes, 'posZ', -500, 500)
		.listen()
		.onChange(function(value){
			person.mesh.position.z = value;
		});
	folder.add(person.attributes, 'lowCut', 0, 1024).listen();
	folder.add(person.attributes, 'highCut', 0, 1024).listen();
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

	var directionalLight = new THREE.DirectionalLight(0xffffff );
	directionalLight.position.x = 800;
	directionalLight.position.y = 30;
	directionalLight.position.z = -50;
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
	var head = people[headIndex];
	var faceVertices = head.faceVertices;
	var originalFaceVertices = head.originalFaceVertices;
	for(var i = 0; i < faceVertices.length; i++){
		var faceVertex = faceVertices[i];
		var originalFaceVertex = originalFaceVertices[i];
		tweenVertex(headIndex, faceVertex, originalFaceVertex);
	}
}

function tweenVertex(headIndex, faceVertex, originalFaceVertex){
	var faceGeometry = people[headIndex].mesh.geometry;
	var attributes = people[headIndex].attributes;
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


function updateAnimations() {
    for(var i = 0; i < people.length; i++){
        people[i].updateAnimations();
    }
}

function animate() {
	requestAnimationFrame( animate );
	TWEEN.update();
	render();
	analyzeAudio();
    updateAnimations();
}

function adjustSizes(){
	for(var i = 0; i < people.length; i++){
		var mesh = people[i].mesh;
		mesh.scale.x = audioLevels[i] / 200;
	}
}

function analyzeAudio(){
	for(var i = 0; i < people.length; i++){
		if(audio){
			if(audio.analysers.length > 0){
				var analyser = audio.analysers[0];
				var dataArray = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(dataArray);
				var average = 0;
				var head = people[i];
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