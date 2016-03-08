function randomPosition(thing) {
    var radius = {x:10,y:10,z:10};
    reposition(thing.model, radius);
    for(var i = 0; i < thing.clones.length; i++){
        var model = thing.clones[i].model;
        reposition(model,radius);
    }
}
function scatter(thing,amountOfClones,radius){
    scene.remove(thing.model);
    var cloneContainer = new THREE.Object3D();
    for(var i = 0; i < amountOfClones; i++){
        var thingClone = thing.clone();
        var modelClone = thingClone.model;
        reposition(modelClone, radius);
        cloneContainer.add(modelClone);
    }
    thing.cloneContainer = cloneContainer;
    scene.add(cloneContainer);
}
function reposition(model, radius){
    var anglePoint = Math.random()*Math.PI*2;
    var distancePoint = Math.random();
    var cloneX = Math.cos(anglePoint)*(radius.x*distancePoint+3);
    var cloneZ = Math.sin(anglePoint)*(radius.z*distancePoint+3);
    var cloneY = Math.random()*radius.y;
    model.position.set(cloneX,cloneY,cloneZ);
}
function cloneOnCircle(thing,amountOfClones,center,radius,callback){
    for(var i = 0; i < amountOfClones; i++){
        var thingClone = thing.clone();
        var modelClone = thingClone.model;
        var anglePoint = (Math.PI*2) / amountOfClones * i;
        var cloneX = center.x + Math.cos(anglePoint)*(radius.x);
        var cloneZ = center.z + Math.sin(anglePoint)*(radius.z);
        var cloneY = center.y;
        modelClone.position.set(cloneX,cloneY,cloneZ);
        thing.clones.push(thingClone);
        callback(modelClone,i);
        scene.add(modelClone);
    }
}
function clone(thing, amountOfClones, callback){
     for(var i = 0; i < amountOfClones; i++){
        var thingClone = thing.clone();
        var modelClone = thingClone.model;
        thing.clones.push(thingClone);
        callback(modelClone,i);
        scene.add(modelClone);
    }
}
function rotateClones(thing, speed, duration){
    var id = thing.name+Date.now().toString;
    animationCallbacks[id] = function(){thing.cloneContainer.rotation.y += speed};
    setTimeout(function(){
        delete animationCallbacks[id];
    },duration);
}
function tweenThing(_thing){
    createjs.Tween.get(_thing.model.position).to({y:8}, 1000);
}
things["moonground.json"].model.rotation.x=Math.PI;
things["moonground.json"].model.position.y=-3.5;
things["pond.json"].model.scale.y=0.01;
things["pond.json"].model.position.y=-4;
things["moonground.json"].model.scale.y=0.01;
things["rings.json"].model.scale.y=0.2;
things["rings.json"].model.scale.x=0.2;
things["rings.json"].model.scale.z=0.2;


var timeEvents = [


];



