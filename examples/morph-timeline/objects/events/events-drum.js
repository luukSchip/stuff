
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

    { time: 1, action: function(){createjs.Tween.get(things["rain.json"].model.material).to({opacity:1}, 1000)
        .addEventListener("change", handleChange);
             function handleChange(event) {
                console.log('rain opacity changed..');
                console.log(event);
     }}},

  


    {
        time: 0.00,
        action: function(){
            //scatter(things["STUFFs.json"],10,{x:1,y:1,z:1});
        }
    },
    {
        time: 8.04,
        action: function(){
            scatter(things["DRUM3.json"],10,{x:1,y:1,z:1});
            randomPosition(things["DRUM3.json"]);
            //frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
    {
        time: 8.06,
        action: function(){
            
            //frame1:
            morph("DRUM3.json", 0, 0.5);
        }
    },

    { time: 10.0, action: function(){morph("ripple2.json", 1, 2);}},
    

    

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



