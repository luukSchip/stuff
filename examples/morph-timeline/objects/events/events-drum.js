
function randomPosition(object) {
    var objectPosition = object.position;

    var anglePoint = Math.random()*Math.PI*2;
    var distancePoint = Math.random();
    
    objectPosition.x = Math.cos(anglePoint)*10*distancePoint+3;
    objectPosition.z = Math.sin(anglePoint)*10*distancePoint+3;
    objectPosition.y = Math.random()*10;
}
function scatter(thing,amountOfClones,radius){
    for(var i = 0; i < amountOfClones; i++){
        var thingClone = JSON.parse(JSON.stringify(thing));
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

things["moonground2.json"].model.position.y=3;


var timeEvents = [

    { time: 1, action: function(){createjs.Tween.get(things["rain.json"].model.material).to({opacity:1}, 1000)
        .addEventListener("change", handleChange);
             function handleChange(event) {
                console.log('rain opacity changed..');
                console.log(event);
     }}},

    { time: 2, action: function(){createjs.Tween.get(things["moonground2.json"].model.scale).to({y:3}, 1000)
        .addEventListener("change", handleChange);
             function handleChange(event) {
                console.log('moon scale changed..');
                console.log(event);
     }}},


    {
        time: 8.06,
        action: function(){
            
            //frame1:
            morph("DRUM3.json", 0, 0.5);
        }
    },
    

    { time: 15.0, action: function(){morph("ripple.json", 1, 2);}} 
    

    
 


];

