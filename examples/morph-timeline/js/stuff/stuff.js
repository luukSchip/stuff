//test//

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var thingFilenames = ['wall.json','ground.json','ripple2.json','rain.json','DRUM3.json','moonground2.json'];
var audioFilenames = ['silence.mp3'];
var eventFilenames = ['events-drum.js'];
var modelFilenames = [];

var animationCallbacks = []

var yRotationFactor = 1;
var xRotation = 0;
var zPosition = 10.0;
var verbose = false;
var container, stats;
var camera, scene, renderer, stats;
var orbitBox;
var audio;
var people = [];
var gui;
var audioLevels = [];
var things = {};
var lights = {};
var attributes = {
    camRotationX: 0.3,
    camRotationY: 0.07
};
var animations = [];
var timeEvents = [];
var clock = new THREE.Clock();

window.onload = function() {
	init();
};

function initStats() {
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    container.appendChild( stats.domElement );
}

function init() {
    initGui();
	initFileHandlers();
	initScene();
    initMouseHandlers();
    initStats();
    initFiles();
}

function initFiles(){
    doOperationsAndThen(thingFilenames, loadThingFile, function(){
        doOperationsAndThen(modelFilenames, loadModelFile, function(){
            doOperationsAndThen(eventFilenames, loadEventFile,function(){
                var playButton = document.getElementById("playButton");
                playButton.innerHTML = "Play";
                playButton.onclick = play;
            });
        });
    });
}

function play(){
    document.getElementById('playButtonContainer').style.display = "none";
    initAudio(audioFilenames,false);
}

function loadThingFile(filename, callback){
    loadThings(filename,'objects/things/'+filename, callback);
}

function loadModelFile(filename, callback){
    loadModels('objects/models/'+filename, callback);
}

function loadEventFile(filename, callback){
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', function(e){
        var scriptString = e.target.responseText;
        appendScriptToDocument(scriptString);
        callback();
    });
    oReq.open("get", 'objects/events/'+filename, true);
    oReq.send();
}

function checkIfOperationsAreDoneAndThen(numberOfOperationsToPerform, callback) {
  var performedOperations = 0;
  return function() {
    performedOperations++;
    if(performedOperations === numberOfOperationsToPerform) {
      callback();
    }
  }
}

function doOperationsAndThen(values, recurringOperation, finalOperation) {
  var checkIfOperationsAreDoneAndThenDoFinalOperation = 
        checkIfOperationsAreDoneAndThen(values.length, finalOperation);
  if(values.length > 0){
      for(var i = 0; i < values.length; i++) {
        recurringOperation(values[i], checkIfOperationsAreDoneAndThenDoFinalOperation);
      }
  }else{
    finalOperation();
  }
}


function initMouseHandlers(){
    document.onmousemove = function (oPssEvt2) {
        var oMsEvent2 = oPssEvt2 || /* IE */ window.event;
        yRotationFactor = 0.5 - (parseFloat(oMsEvent2.clientX) / parseFloat(window.innerWidth));
        xRotation = 0.5 - (parseFloat(oMsEvent2.clientY) / parseFloat(window.innerHeight));
    };
    // window.addWheelListener(document.body,function(e){
    //     //console.log(e.deltaY);
    //     zPosition = e.deltaY > 0 ? Math.min(1000,zPosition * 1.1) : zPosition * 0.9;
    // },false);
}

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

function importEvents(eventsFile){
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            var eventsString = e.target.result;
            appendScriptToDocument(eventsString);
        };
    })(eventsFile);
    reader.readAsBinaryString(eventsFile);
}

function appendScriptToDocument(scriptString){
    var scrpt = document.createElement('script');
    scrpt.innerHTML=scriptString;
    document.head.appendChild(scrpt);
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

function loadThings(name,path,callback){
    loader = new THREE.JSONLoader();
	loader.load( path, function(geometry,materials){
        addThing(name,geometry,materials);
        callback();
    });
}

function loadModels(path,callback){
    var loader = new THREE.ColladaLoader();
    loader.load( path , function ( collada ) {
        console.log(collada);
        scene.add(collada.scene);
        for(var i = 0; i < collada.scene.children[0].children.length; i++){
            console.log(collada.scene.children[0].children.length);
            stuffObject(THREE).fromSingleObject(collada.scene.children[0].children[i],function(person){onLoadedPerson(person,i)});
        }
        callback();
    });
}

function addThing(name,geometry,materials){
    console.log({name:name, geometry:geometry, materials:materials});
    var material;
    if(materials) {
        material = materials[0];

        for (var i = 0; i < materials.length; i++) {
            materials[i].morphTargets = true;
        }
    }else {
        material = new THREE.MeshPhongMaterial({morphTargets:true});
    }

    model = new THREE.Mesh( geometry, material );
    //model.castShadow = true;
    //model.receiveShadow = true;
    scene.add( model );

    things[name] = stuffThing(THREE,model,name);
}
    
function loadLight(name,path){
    loader = new THREE.ColladaLoader();
    loader.load( path, function(collada){addLight(name,collada)});
}

function addLight(name,collada){
    console.log({name:name, collada:collada});
    scene.add( collada.scene );
    for(var i = 0; i < collada.animations.length; i++){
        console.log(collada.animations[i]);
        var kfAnimation = new THREE.KeyFrameAnimation(collada.animations[i]);
        kfAnimation.timeScale = 1;
        //kfAnimation.loop = false;
        kfAnimation.play(0);
        animations.push(kfAnimation);
    }
    var count = 0;
    collada.scene.traverse(function(a){
        if(a instanceof THREE.Mesh){
            if(count++ < 1){
                lights[name] = stuffLight(THREE).create(a, name);
            }
        }
    });
}

function initFileHandlers(){
    function handleAudioFileSelect(e) {
        initAudio([URL.createObjectURL(e.target.files[0])],true);
    }
    function handleModelFileSelect(e) {
        loadModels(URL.createObjectURL(e.target.files[0]),true);
    }
	function handleThingFileSelect(e) {
		loadThings(e.target.files[0].name.split('.json')[0],URL.createObjectURL(e.target.files[0]),true);
	}
    function handleLightFileSelect(e) {
        loadLight(e.target.files[0].name.split('.json')[0],URL.createObjectURL(e.target.files[0]),true);
    }
    function handlePresetFileSelect(e) {
        importPreset(e.target.files[0]);
    }
    function handleEventsFileSelect(e) {
        importEvents(e.target.files[0]);
    }
    document.getElementById('audio-file')
            .addEventListener('change', handleAudioFileSelect, false);
    document.getElementById('model-file')
            .addEventListener('change', handleModelFileSelect, false);
    document.getElementById('events-file')
            .addEventListener('change', handleEventsFileSelect, false);
    document.getElementById('thing-file')
            .addEventListener('change', handleThingFileSelect, false);
    document.getElementById('light-file')
            .addEventListener('change', handleLightFileSelect, false);
    document.getElementById('preset-file')
            .addEventListener('change', handlePresetFileSelect, false);
    document.getElementById('export-button').onclick = exportPreset;
}

function initScene(){
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    orbitBox = new THREE.Object3D()

    camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 2, 2, zPosition );
    orbitBox.add(camera);

    scene = new THREE.Scene();

    scene.add(orbitBox);
    // RENDERER
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    else
        renderer = new THREE.CanvasRenderer(); 

    particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 80, 80 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
    scene.add( particleLight );

    // Lights

    var directionalLight = new THREE.DirectionalLight(0xffffff );
    directionalLight.position.x = 800;
    directionalLight.position.y = 30;
    directionalLight.position.z = -50;
    scene.add( directionalLight );

    var pointLight = new THREE.PointLight( 0xffffff, 0.5 );
    particleLight.add( pointLight );
    particleLight.position.x = -100;
    particleLight.position.y = 100;
    particleLight.position.z = 0;






    //initPointLightScene();







    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    animate();
};


function initPointLightScene(){
    // must enable shadows on the renderer 
    renderer.shadowMapEnabled = true;
    renderer.shadowMap.enabled = true;
    
    // "shadow cameras" show the light source and direction
    
    // spotlight #1 -- yellow, dark shadow
    spotlight = new THREE.SpotLight(0xffff00);
    spotlight.position.set(-60,150,-30);
    spotlight.shadowCameraVisible = true;
    spotlight.shadowDarkness = 0.95;
    spotlight.intensity = 2;
    // must enable shadow casting ability for the light
    spotlight.castShadow = true;
    var spotLightHelper = new THREE.SpotLightHelper( spotlight ); 
    scene.add( spotLightHelper );
    scene.add(spotlight);

    // spotlight #2 -- red, light shadow
    var spotlight2 = new THREE.SpotLight(0xff0000);
    spotlight2.position.set(60,150,-60);
    var spotLightHelper2 = new THREE.SpotLightHelper( spotlight2 ); 
    //scene.add( spotLightHelper2 );
    //scene.add(spotlight2);
    spotlight2.shadowCameraVisible = true;
    spotlight2.shadowDarkness = 0.70;
    spotlight2.intensity = 2;
    spotlight2.castShadow = true;
    
    // spotlight #3
    var spotlight3 = new THREE.SpotLight(0x0000ff);
    spotlight3.position.set(150,80,-100);
    spotlight3.shadowCameraVisible = true;
    spotlight3.shadowDarkness = 0.95;
    spotlight3.intensity = 2;
    spotlight3.castShadow = true;
    var spotLightHelper3 = new THREE.SpotLightHelper( spotlight3 ); 
    //scene.add( spotLightHelper3 );
    //scene.add(spotlight3);
    // change the direction this spotlight is facing
    var lightTarget = new THREE.Object3D();
    lightTarget.position.set(150,10,-100);
    scene.add(lightTarget);
    spotlight3.target = lightTarget;

    // cube: mesh to cast shadows
    var cubeGeometry = new THREE.CubeGeometry( 50, 50, 50 );
    var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x888888 } );
    cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    cube.position.set(0,50,0);
    // Note that the mesh is flagged to cast shadows
    cube.castShadow = true;
    scene.add(cube);
    
    // floor: mesh to receive shadows
    var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 10, 10 );
    // Note the change to Lambert material.
    var floorMaterial = new THREE.MeshLambertMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    // Note the mesh is flagged to receive shadows
    floor.receiveShadow = true;
    scene.add(floor);
}


function initAudio(filenames,absolute){
    audio = stuffAudio(filenames,absolute).init().clock(100,timeEvents);
    prevTime = audio.getTime();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
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


var prevTime;

function animate() {
	requestAnimationFrame( animate );
	TWEEN.update();
	render();
    analyzeAudio();
    if(stats){
        stats.update();
    }
    // var time = Date.now();
    // for(var i = 0; i < animations.length; i++){
    //     var animation = animations[i];
    //     animation.update( (time - prevTime)/3 );
    // }
    // prevTime = time;
    if(audio){
        var currentTime = audio.getTime();
        $('#timeIndicator').html(currentTime);
        for(key in things){
            var thing = things[key];
            thing.updateAnimation(currentTime);
            for(var i = 0; i < thing.clones.length; i++){
                var clone = thing.clones[i];
                clone.updateAnimation(currentTime);
            }
        }    
        for(key in animations){
            animations[key].update(clock.getDelta());
        }
        prevTime = currentTime;
    }
    
    for(var i = 0; i < animationCallbacks.length; i++){
        var callback = animationCallbacks[i];
        callback();
    }
}

function render() {
    orbitBox.rotateY(attributes.camRotationY * yRotationFactor);
    camera.position.y = 20 * xRotation * attributes.camRotationX;
    camera.position.z = zPosition;
    camera.lookAt( scene.position );
	renderer.render( scene, camera );
}

function getThingByName(name){
    return things[name];
}

function morph(name, morphTargetIndex, duration){
    // console.log("morph");
    // console.log(getThingByName(name));
    var thing = getThingByName(name);
    thing.morph(morphTargetIndex, 1, duration, audio.getTime());
    for(var i = 0; i < thing.clones.length; i++){
        var clone = thing.clones[i];
        clone.morph(morphTargetIndex, 1, duration, audio.getTime());
    }
}

// var timeEvents = [
//     {
//         time: 3.0,
//         action: function(){
//             morph("dezedoetut", 1, 1, 0.5); // arguments: (name, morphTargetIndex, toValue, duration)
//         }
//     },
//     {
//         time: 5.1,
//         action: function(){
//             morph("dezedoetut", 1, 0, 2.5); 
//             morph("dezedoetut", 2, 1, 2.5); 

//         }
//     },
// ];

