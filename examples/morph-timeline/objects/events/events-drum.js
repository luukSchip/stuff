function randomPosition(thing) {
    var radius = {x:10,y:10,z:10};
    reposition(thing.model, radius);
    for(var i = 0; i < thing.clones.length; i++){
        var model = thing.clones[i].model;
        reposition(model,radius);
    }
}
function scatter(thing,amountOfClones,radius){
    for(var i = 0; i < amountOfClones; i++){
        var thingClone = thing.clone();
        var modelClone = thingClone.model;
        reposition(modelClone, radius);
        scene.add(modelClone);
    }
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
people[0].mesh.position.z=300;
people[0].mesh.material.color.r=0;
people[0].mesh.material.color.g=0;
people[0].mesh.material.color.b=0;
// cloneOnCircle(
//     things["rain.json"],    // Thing
//     10,                    // amount of clones
//     {x:0,y:2,z:0},          // center
//     {x:10,z:10},              // radius
//     function(model,index){  // callback
//         model.rotation.y = (Math.PI*2) / 12 * index * -1;
//     }
// );


var timeEvents = [

    {time: 0.00, action: function(){createjs.Tween.get(people[0].mesh.position).to({z:-300}, 15000);
                                    createjs.Tween.get(people[0].mesh.material.color).to({r:1}, 15000);
                                    createjs.Tween.get(people[0].mesh.material.color).to({g:1}, 15000);
                                    createjs.Tween.get(people[0].mesh.material.color).to({b:1}, 15000);}},                              
    // {time: 1.00, action: function(){createjs.Tween.get(things["wallmove.json"].model.material).to({opacity:0.2}, 500); createjs.Tween.get(things["wallmove.json"].model.rotation).to({y:8000},3000)}},
    // {time:1.50, action: function(){createjs.Tween.get(things["wallmove.json"].model.material).to({opacity:0}, 500)}},
    // {time:2.00, action: function(){createjs.Tween.get(things["wallmove.json"].model.material).to({opacity:0.2}, 500)}},
    // {time:2.50, action: function(){createjs.Tween.get(things["wallmove.json"].model.material).to({opacity:0}, 500)}},
    // {time:3.00, action: function(){createjs.Tween.get(things["wallmove.json"].model.material).to({opacity:0.2}, 500)}},

    {time: 8.04, action: function(){scatter(things["DRUM3.json"],1,{x:0,y:0,z:0});morph("DRUM3.json", 1, 0.02);}},
    {time: 8.06, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 8.48, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 8.50, action: function(){morph("DRUM3.json", 0, 0.18);}},
    {time: 8.68, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 8.70, action: function(){morph("DRUM3.json", 0, 0.1);}},
    {time: 8.80, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 8.82, action: function(){morph("DRUM3.json", 0, 0.07);}},
    {time: 8.88, action: function(){scatter(things["DRUM3.json"],2,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 8.90, action: function(){morph("DRUM3.json", 0, 0.46);}},
    {time: 9.36, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 9.38, action: function(){morph("DRUM3.json", 0, 0.18);}},
    {time: 9.56, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 9.58, action: function(){morph("DRUM3.json", 0, 0.18);}},
    {time: 9.76, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 9.78, action: function(){morph("DRUM3.json", 0, 0.42);}},
    {time: 10.20, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 10.22, action: function(){morph("DRUM3.json", 0, 0.42);}},
    {time: 10.64, action: function(){scatter(things["DRUM3.json"],2,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 10.66, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 11.12, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 11.14, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 11.56, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 11.58, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 12.00, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 12.02, action: function(){morph("DRUM3.json", 0, 0.35);}},
    {time: 12.40, action: function(){scatter(things["DRUM3.json"],2,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 12.42, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 12.84, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 12.86, action: function(){morph("DRUM3.json", 0, 0.3);}},
    {time: 13.20, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 13.22, action: function(){morph("DRUM3.json", 0, 0.05);}},
    {time: 13.28, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 13.30, action: function(){morph("DRUM3.json", 0, 0.38);}},
    {time: 13.68, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 13.70, action: function(){morph("DRUM3.json", 0, 0.46);}},
    {time: 14.16, action: function(){scatter(things["DRUM3.json"],3,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 14.18, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 14.60, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 14.62, action: function(){morph("DRUM3.json", 0, 0.25);}},
    {time: 14.88, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 14.90, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 15.00, action: function(){morph("ripple2.json", 1, 3);}},
    {time: 15.01, action: function(){createjs.Tween.get(people[0].mesh.position).to({z:560}, 300);}},
    {time: 15.52, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 15.54, action: function(){morph("DRUM3.json", 0, 0.3);}},
    {time: 15.88, action: function(){scatter(things["DRUM3.json"],3,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 15.90, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 16.00, action: function(){
        createjs.Tween.get(things["pond.json"].model.scale).to({y:1}, 300); 
        createjs.Tween.get(things["pond.json"].model.position).to({y:0}, 300);
        var thing = things["rain2.json"]; 
        scatter(thing,30,{x:10,y:10,z:10});
        tweenThing(thing);
        createjs.Tween.get(thing.model.material).to({opacity:1}, 500);
        for(var i = 0; i < thing.clones.length; i++){ 
            var clone = thing.clones[i]; 
            tweenThing(clone);
        }
    }}, 
//#1 --- scatter en daarna tweenen
//         {time: 16.00, action: function(){
//             scatter(things["rain2.json"],30,{x:10,y:10,z:10});randomPosition(things["rain2.json"]);var thing = things["rain2.json"]; tweenThing(thing);
//         }},
// //#1
//         {time: 16.00, action: function(){createjs.Tween.get(things["rain2.json"].model.material).to({opacity:1}, 500);}},
// //#1
//          {time: 16.00, action: function(){var thing = things["rain2.json"]; tweenThing(thing); for(var i = 0; i < thing.clones.length; i++){ var clone = thing.clones[i]; tweenThing(clone);} function tweenThing(_thing){createjs.Tween.get(_thing.model.rotation).to({y:-10}, 1000);}}},
    {time: 16.30, action: function(){createjs.Tween.get(things["pond.json"].model.scale).to({y:0.01}, 400); createjs.Tween.get(things["pond.json"].model.position).to({y:-3.6}, 400);}},
    {time: 16.36, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 16.38, action: function(){morph("DRUM3.json", 0, 0.3);}},
//#1
        {time: 16.50, action: function(){createjs.Tween.get(things["rain2.json"].model.material).to({opacity:0}, 800);}},
    {time: 16.72, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 16.74, action: function(){morph("DRUM3.json", 0, 0.05);}},
    {time: 16.80, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 16.82, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 17.28, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 17.30, action: function(){morph("DRUM3.json", 0, 0.35);}},
    {time: 17.44, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.1},500);morph("rings.json", 0, 1); createjs.Tween.get(things["rings.json"].model.scale).to({y:2}, 25000); createjs.Tween.get(things["rings.json"].model.scale).to({x:2}, 25000); createjs.Tween.get(things["rings.json"].model.scale).to({z:2}, 25000)}},    
    {time: 17.68, action: function(){scatter(things["DRUM3.json"],3,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 17.70, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 17.94, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 18.16, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 18.18, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 18.56, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 18.58, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 19.04, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 19.06, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 19.28, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.15},500);morph("rings.json", 0, 1);}},  
    {time: 19.48, action: function(){scatter(things["DRUM3.json"],4,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 19.50, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 19.78, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},  
    {time: 19.92, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 19.94, action: function(){morph("DRUM3.json", 0, 0.3);}},
    {time: 20.28, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 20.30, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 20.80, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 20.82, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 21.04, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.2},500);morph("rings.json", 0, 1);}},  
    {time: 21.24, action: function(){scatter(things["DRUM3.json"],4,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 21.26, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 21.54, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 21.68, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 21.70, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 22.12, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 22.14, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 22.60, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 22.62, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 22.80, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.25},500);morph("rings.json", 0, 1);}},
    {time: 23.04, action: function(){scatter(things["DRUM3.json"],4,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 23.06, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 23.30, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 23.84, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 23.96, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 24.40, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 24.42, action: function(){morph("DRUM3.json", 0, 0.3);}},
    {time: 24.64, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.3},500);morph("rings.json", 0, 1);}},
    {time: 24.76, action: function(){scatter(things["DRUM3.json"],5,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 24.78, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 25.14, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 25.56, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 25.58, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 26.16, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 26.18, action: function(){morph("DRUM3.json", 0, 0.3);}},
    {time: 26.32, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.4},500);morph("rings.json", 0, 1);}},
    {time: 26.48, action: function(){scatter(things["DRUM3.json"],5,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 26.50, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 26.82, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 27.28, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 27.30, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 27.84, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 27.86, action: function(){morph("DRUM3.json", 0, 0.35);}},
    {time: 28.12, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.45},500);morph("rings.json", 0, 1);}},
    {time: 28.24, action: function(){scatter(things["DRUM3.json"],5,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 28.26, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 28.62, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 28.88, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 28.90, action: function(){morph("DRUM3.json", 0, 0.5);}},

    {time: 29.17, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 29.27, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}}, 
    {time: 29.36, action: function(){createjs.Tween.get(things["bells.json"].model.material).to({opacity:1},0.12)}},   
            {time: 29.36, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 29.38, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 29.48, action: function(){createjs.Tween.get(things["bells.json"].model.material).to({opacity:0.7},0.12)}},  
    {time: 29.58, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 29.60, action: function(){createjs.Tween.get(things["bells.json"].model.material).to({opacity:0},0.12)}},
    {time: 29.68, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
    {time: 29.72, action: function(){createjs.Tween.get(things["bells.json"].model.material).to({opacity:1},0.12)}},
    {time: 29.76, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.5},500);morph("rings.json", 0, 1);}},
    {time: 29.84, action: function(){createjs.Tween.get(things["bells.json"].model.material).to({opacity:0.7},0.12)}},
    {time: 29.96, action: function(){createjs.Tween.get(things["bells.json"].model.material).to({opacity:1},0.12)}},
            {time: 30.00, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 30.02, action: function(){morph("DRUM3.json", 0, 0.2);}},
    {time: 30.08, action: function(){createjs.Tween.get(things["bells.json"].model.material).to({opacity:0},0.12)}},  
    {time: 30.26, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 30.44, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 30.46, action: function(){morph("DRUM3.json", 0, 0.1);}},            
    {time: 30.56, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 30.58, action: function(){morph("DRUM3.json", 0, 0.05);}},            
    {time: 30.64, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 30.66, action: function(){morph("DRUM3.json", 0, 0.3);}},    
    {time: 30.80, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 30.90, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
            {time: 31.00, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 31.02, action: function(){morph("DRUM3.json", 0, 0.3)}},            
    {time: 31.32, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 31.34, action: function(){morph("DRUM3.json", 0, 0.3);}},    
    {time: 31.48, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.55},500);morph("rings.json", 0, 1);}},
    {time: 31.50, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 31.60, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
            {time: 31.64, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 31.66, action: function(){morph("DRUM3.json", 0, 0.3);}},   
    {time: 31.98, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 32.08, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 32.10, action: function(){morph("DRUM3.json", 0, 0.05);}},            
    {time: 32.16, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 32.18, action: function(){morph("DRUM3.json", 0, 0.05);}},            
    {time: 32.24, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 32.26, action: function(){morph("DRUM3.json", 0, 0.10);}},            
    {time: 32.36, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 32.38, action: function(){morph("DRUM3.json", 0, 0.35);}},    
    {time: 32.60, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 32.70, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
            {time: 32.76, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 32.78, action: function(){morph("DRUM3.json", 0, 0.15)}},           
    {time: 32.92, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 32.94, action: function(){morph("DRUM3.json", 0, 0.5);}},    
    {time: 33.12, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.60},500);morph("rings.json", 0, 1);}},
    {time: 33.20, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 33.30, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
            {time: 33.44, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}}, 
            {time: 33.46, action: function(){morph("DRUM3.json", 0, 0.5)}},    
    {time: 33.62, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 34.00, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 34.02, action: function(){morph("DRUM3.json", 0, 0.1);}},            
    {time: 34.12, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 34.14, action: function(){morph("DRUM3.json", 0, 0.1);}},            
    {time: 34.28, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 34.30, action: function(){morph("DRUM3.json", 0, 0.2);}},    
    {time: 34.40, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 34.50, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
    {time: 34.52, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 34.54, action: function(){morph("DRUM3.json", 0, 0.25);}},            
    {time: 34.80, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 34.82, action: function(){morph("DRUM3.json", 0, 0.45);}},    
    {time: 35.00, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.65},500);morph("rings.json", 0, 1);}},
            {time: 35.28, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 35.30, action: function(){morph("DRUM3.json", 0, 0.35);}},    
    {time: 35.50, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 35.68, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 35.70, action: function(){morph("DRUM3.json", 0, 0.2);}},            
    {time: 35.92, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 35.94, action: function(){morph("DRUM3.json", 0, 0.15);}},            
    {time: 36.12, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 36.14, action: function(){morph("DRUM3.json", 0, 0.15);}},            
            {time: 36.32, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 36.34, action: function(){morph("DRUM3.json", 0, 0.2)}},   
    {time: 36.56, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 36.58, action: function(){morph("DRUM3.json", 0, 0.25);}},    
    {time: 36.75, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 36.76, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.7},500);morph("rings.json", 0, 1);}},
    {time: 36.84, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 36.86, action: function(){morph("DRUM3.json", 0, 0.15);}},    
    {time: 36.85, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
            {time: 37.04, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 37.06, action: function(){morph("DRUM3.json", 0, 0.35);}},
    {time: 37.26, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}}, 
    {time: 37.44, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 37.46, action: function(){morph("DRUM3.json", 0, 0.2);}},            
    {time: 37.68, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 37.70, action: function(){morph("DRUM3.json", 0, 0.1);}},            
    {time: 37.80, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 37.82, action: function(){morph("DRUM3.json", 0, 0.5);}},    
    {time: 37.95, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 38.05, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
    {time: 38.36, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 38.38, action: function(){morph("DRUM3.json", 0, 0.35);}},    
    {time: 38.60, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.8},500);morph("rings.json", 0, 1);}},
            {time: 38.76, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 38.78, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 39.10, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 39.20, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 39.24, action: function(){morph("DRUM3.json", 0, 0.2);}},            
    {time: 39.44, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 39.46, action: function(){morph("DRUM3.json", 0, 0.1);}},            
    {time: 39.56, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 39.58, action: function(){morph("DRUM3.json", 0, 0.2);}},    
    {time: 39.68, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 39.78, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
            {time: 39.80, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 39.82, action: function(){morph("DRUM3.json", 0, 0.2)}},      
    {time: 40.04, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 40.06, action: function(){morph("DRUM3.json", 0, 0.2);}},    
    {time: 40.20, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 40.28, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 40.30, action: function(){morph("DRUM3.json", 0, 0.15);}},    
    {time: 40.30, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
    {time: 40.36, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0.9},500);morph("rings.json", 0, 1);}},
            {time: 40.48, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 40.50,  action: function(){morph("DRUM3.json", 0, 0.35);}},        
    {time: 40.84, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 40.86, action: function(){morph("DRUM3.json", 0, 0.25);}},    
    {time: 40.86, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    {time: 41.12, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 41.14, action: function(){morph("DRUM3.json", 0, 0.1);}},            
    {time: 41.24, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 41.26, action: function(){morph("DRUM3.json", 0, 0.25);}},    
    {time: 41.40, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 41.50, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}},
            {time: 41.52, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 41.54, action: function(){morph("DRUM3.json", 0, 0.1)}},           
    {time: 41.64, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 41.66, action: function(){morph("DRUM3.json", 0, 0.35);}},    
    {time: 41.95, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:1}, 100)}},
    {time: 42.04, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 42.04, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:1},500);morph("rings.json", 0, 1);}},
    {time: 42.05, action: function(){createjs.Tween.get(things["moonground.json"].model.scale).to({y:0.01}, 250)}} ,
    {time: 42.06, action: function(){morph("DRUM3.json", 0, 0.25);}},     
            {time: 42.32, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
            {time: 42.34, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 42.54, action: function(){createjs.Tween.get(things["rings.json"].model.material).to({opacity:0},500);}},
    


];



