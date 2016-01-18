//test//

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

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
var attributes = {
    camRotationX: 0.3,
    camRotationY: 0.07
};
var animations = [];

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
}

function initMouseHandlers(){
    document.onmousemove = function (oPssEvt2) {
        var oMsEvent2 = oPssEvt2 || /* IE */ window.event;
        yRotationFactor = 0.5 - (parseFloat(oMsEvent2.clientX) / parseFloat(window.innerWidth));
        xRotation = 0.5 - (parseFloat(oMsEvent2.clientY) / parseFloat(window.innerHeight));
    };
    window.addWheelListener(document.body,function(e){
        //console.log(e.deltaY);
        zPosition = e.deltaY > 0 ? Math.min(1000,zPosition * 1.1) : zPosition * 0.9;
    },false);
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
            console.log(e)
            var eventsString = e.target.result;
            var scrpt = document.createElement('script');
            scrpt.innerHTML=eventsString;
            document.head.appendChild(scrpt);
        };
    })(eventsFile);
    reader.readAsBinaryString(eventsFile);
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

function loadThings(name,path){
    loader = new THREE.JSONLoader();
	loader.load( path, function(geometry,materials){addThing(name,geometry,materials)});
}

function loadModels(path){
    var loader = new THREE.ColladaLoader();
    loader.load( path , function ( collada ) {
        scene.add(collada.scene);
        for(var i = 0; i < collada.scene.children[0].children.length; i++){
            console.log(collada.scene.children[0].children.length);
            stuffObject(THREE).fromSingleObject(collada.scene.children[0].children[i],function(person){onLoadedPerson(person,i)});
        }
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
    scene.add( model );

    things[name] = stuffThing(THREE).create(model, name);
    

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
    document.getElementById('preset-file')
            .addEventListener('change', handlePresetFileSelect, false);
    document.getElementById('export-button').onclick = exportPreset;
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

    var pointLight = new THREE.PointLight( 0xffffff, 0.5 );
    particleLight.add( pointLight );
    particleLight.position.x = -100;
    particleLight.position.y = 100;
    particleLight.position.z = 0;

    renderer = new THREE.WebGLRenderer({antialiasing: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    animate();
};

function initAudio(filenames,absolute){
    audio = stuffAudio(filenames,absolute).init().clock(100,timeEvents);
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


//var prevTime = Date.now();

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
        for(key in things){
            things[key].updateAnimation(audio.getTime());
        }    
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

function morph(name, morphTargetIndex, toValue, duration){
    // console.log("morph");
    // console.log(getThingByName(name));
    getThingByName(name).morph(morphTargetIndex, toValue, duration, audio.getTime());
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

