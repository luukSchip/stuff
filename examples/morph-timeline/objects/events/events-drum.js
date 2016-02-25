
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


var timeEvents = [
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
            morph("DRUM3.json", 0, 0.30);
        }
    },
        {
        time: 8.48,
        action: function(){
            randomPosition(things["DRUM3.json"]);
            //frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 8.50,
        action: function(){
            
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 8.68,
        action: function(){
            randomPosition(things["DRUM3.json"]);
            //frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 8.70,
        action: function(){
            
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 8.80,
        action: function(){
            randomPosition(things["DRUM3.json"]);
            //frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 8.82,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 8.88,
        action: function(){
            randomPosition(things["DRUM3.json"]);
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 8.90,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 9.36,
        action: function(){
            randomPosition(things["DRUM3.json"]);
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 9.38,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 9.56,
        action: function(){
            randomPosition(things["DRUM3.json"]);
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 9.58,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 9.76,
        action: function(){
            randomPosition(things["DRUM3.json"]);
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 9.78,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 10.20,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 10.22,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 10.64,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 10.66,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 11.12,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 11.14,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 11.56,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 11.58,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.02);
        }
    },
            {
        time: 12.00,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 12.02,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 12.40,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 12.42,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 12.84,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 12.86,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 13.20,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 13.22,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },    
            {
        time: 13.28,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 13.30,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 13.68,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 13.70,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 14.16,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 14.18,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 14.60,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 14.62,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.30);
        }
    },
            {
        time: 14.88,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
                {
        time: 14.90,
        action: function(){
            //frame1:
            morph("DRUM3.json", 0, 0.02);
        }
    },
            {
        time: 14.92,
        action: function(){
            randomPosition(things["DRUM3.json"]);//frame1:
            morph("DRUM3.json", 1, 0.02);
        }
    },
    {
        time: 20,
        action: function(){
            createjs.Tween.get(things["DRUM3.json"].model.material).to({opacity:0}, 2000)
        }
    }

    
 


];

