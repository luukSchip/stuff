//test//

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var verbose = false;
var container, stats;
var orbitBox;
var camera, scene, renderer, animation;
var particleLight;
var audio;
var attributes = {
	camRotationX: 0.3,
	camRotationY: 0.07
};

window.onload = function() {
	init();
};

function init() {
    initGui();
	initFileHandlers();
	initScene();
}


function initGui(){
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

function loadThings(path){
	loader = new THREE.JSONLoader();
	loader.load( path, addThing );
}

function addThing(geometry,materials){
	var material = materials[ 0 ];

	for (var i = 0; i < materials.length; i++){
		materials[i].morphTargets = true;
	}

	model = new THREE.Mesh( geometry, material );
	model.scale.set (10,10,10);
	scene.add( model );

	animation = new THREE.MorphAnimation( model );
	animation.play();
}

function initFileHandlers(){
	function handleThingFileSelect(e) {
		loadThings(URL.createObjectURL(e.target.files[0]),true);
	}
	document.getElementById('thing-file')
			.addEventListener('change', handleThingFileSelect, false);
}

function initScene(){
	container = document.createElement( 'div' );
	document.body.appendChild( container );

    /*creates empty scene object and renderer*/
    scene = new THREE.Scene();
    camera =  new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 500);
    renderer = new THREE.WebGLRenderer({antialias:true});

    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled= true;
    renderer.shadowMapSoft = true;

    /*add controls*/
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 60;
    camera.lookAt(scene.position);

    hemi = new THREE.HemisphereLight(0xbbbbbb, 0x0099FF);
    scene.add(hemi);

    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set (20, 35, 40);
    scene.add(spotLight);

	container.appendChild( renderer.domElement );

	animate();
};

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}


var prevTime = Date.now();

function animate() {
	requestAnimationFrame( animate );
	TWEEN.update();
	render();
	if ( animation ) {
		var time = Date.now();
		animation.update( (time - prevTime)/3 );
		prevTime = time;
	}
}

function render() {
	camera.lookAt( scene.position );

	renderer.render( scene, camera );

}

