
function randomPosition(thing) {

    reposition(thing.model);
    for(var i = 0; i < thing.clones.length; i++){
        var model = thing.clones[i].model;
        reposition(model);
    }

    function reposition(object){
        var objectPosition = object.position;

        var anglePoint = Math.random()*Math.PI*2;
        var distancePoint = Math.random();
        
        objectPosition.x = Math.cos(anglePoint)*10*distancePoint+3;
        objectPosition.z = Math.sin(anglePoint)*10*distancePoint+3;
        objectPosition.y = Math.random()*10;
    }
}


function scatter(thing,amountOfClones,radius){
    for(var i = 0; i < amountOfClones; i++){
        var thingClone = thing.clone();
        var modelClone = thingClone.model;

        var anglePoint = Math.random()*Math.PI*2;
        var distancePoint = Math.random();

        var cloneX = Math.cos(anglePoint)*(radius.x*distancePoint+3);
        var cloneZ = Math.sin(anglePoint)*(radius.z*distancePoint+3);
        var cloneY = Math.random()*radius.y;

        modelClone.position.set(cloneX,cloneY,cloneZ);
        thing.clones.push(thingClone);
        scene.add(modelClone);
    }
}

things["moonground2.json"].model.position.y=8;
things["moonground2.json"].model.scale.y=0.01;



var timeEvents = [

    // { time: 1, action: function(){createjs.Tween.get(things["rain.json"].model.material).to({opacity:1}, 1000)
    //     .addEventListener("change", handleChange);
    //          function handleChange(event) {
    //             //console.log('rain opacity changed..');
    //             //console.log(event);
    //  }}},
    {time: 1.00, action: function(){createjs.Tween.get(things["rain.json"].model.material).to({opacity:1}, 1000);
                                    createjs.Tween.get(things["rain.json"].model.rotation).to({y:3},1000);
                                    createjs.Tween.get(things["rain.json"].model.position).to({y:-2},1000);}},

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
    {time: 15.52, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 15.54, action: function(){morph("DRUM3.json", 0, 0.3);}},
    {time: 15.88, action: function(){scatter(things["DRUM3.json"],3,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 15.90, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 16.36, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 16.38, action: function(){morph("DRUM3.json", 0, 0.3);}},
    {time: 16.72, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 16.74, action: function(){morph("DRUM3.json", 0, 0.05);}},
    {time: 16.80, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 16.82, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 17.28, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 17.30, action: function(){morph("DRUM3.json", 0, 0.35);}},
    {time: 17.68, action: function(){scatter(things["DRUM3.json"],3,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 17.70, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 18.16, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 18.18, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 18.56, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 18.58, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 19.04, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 19.06, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 19.48, action: function(){scatter(things["DRUM3.json"],4,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 19.50, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 19.92, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 19.94, action: function(){morph("DRUM3.json", 0, 0.3);}},
    {time: 20.28, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 20.30, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 20.80, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 20.82, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 21.24, action: function(){scatter(things["DRUM3.json"],4,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 21.26, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 21.68, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 21.70, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 22.12, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 22.14, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 22.60, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 22.62, action: function(){morph("DRUM3.json", 0, 0.4);}},
    {time: 23.04, action: function(){scatter(things["DRUM3.json"],4,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 23.06, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 23.84, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 23.96, action: function(){morph("DRUM3.json", 0, 0.45);}},
    {time: 24.40, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 24.42, action: function(){morph("DRUM3.json", 0, 0.3);}},
    {time: 24.76, action: function(){scatter(things["DRUM3.json"],5,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 24.78, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 25.56, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 25.58, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 26.16, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 26.18, action: function(){morph("DRUM3.json", 0, 0.3);}},
    {time: 26.48, action: function(){scatter(things["DRUM3.json"],5,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 26.50, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 27.28, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 27.30, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 27.84, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 27.86, action: function(){morph("DRUM3.json", 0, 0.35);}},
    {time: 28.24, action: function(){scatter(things["DRUM3.json"],5,{x:0,y:0,z:0});randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 28.26, action: function(){morph("DRUM3.json", 0, 0.5);}},
    {time: 28.88, action: function(){randomPosition(things["DRUM3.json"]);morph("DRUM3.json", 1, 0.02);}},
    {time: 28.90, action: function(){morph("DRUM3.json", 0, 0.5);}},


    { time: 29.17, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 29.27, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 29.58, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 29.68, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 30.80, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 30.90, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}}, 
    { time: 31.50, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 31.60, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 32.60, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 31.70, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 33.20, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 33.30, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 34.40, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 34.50, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 36.75, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 36.85, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 37.95, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 38.05, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 39.68, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 39.78, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 40.20, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 40.30, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 41.40, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 41.50, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}},
    { time: 41.95, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.3}, 100)}},
    { time: 42.05, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:0.01}, 250)}}  
    


];



