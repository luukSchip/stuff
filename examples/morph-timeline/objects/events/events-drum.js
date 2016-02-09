
function randomPosition(object) {
    var objectPosition = object.position;

    var anglePoint = Math.random()*Math.PI*2;
    var distancePoint = Math.random();
    
    objectPosition.x = Math.cos(anglePoint)*10*distancePoint+3;
    objectPosition.z = Math.sin(anglePoint)*10*distancePoint+3;
    objectPosition.y = Math.random()*10;
}

var timeEvents = [
    {
        time: 8.04,
        action: function(){
            randomPosition(things["DRUM-3"].model);
            //frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 8.06,
        action: function(){
            
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
        {
        time: 8.48,
        action: function(){
            randomPosition(things["DRUM-3"].model);
            //frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 8.50,
        action: function(){
            
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 8.68,
        action: function(){
            randomPosition(things["DRUM-3"].model);
            //frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 8.70,
        action: function(){
            
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 8.80,
        action: function(){
            randomPosition(things["DRUM-3"].model);
            //frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 8.82,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 8.88,
        action: function(){
            randomPosition(things["DRUM-3"].model);
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 8.90,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 9.36,
        action: function(){
            randomPosition(things["DRUM-3"].model);
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 9.38,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 9.56,
        action: function(){
            randomPosition(things["DRUM-3"].model);
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 9.58,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 9.76,
        action: function(){
            randomPosition(things["DRUM-3"].model);
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 9.78,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 10.20,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 10.22,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 10.64,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 10.66,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 11.12,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 11.14,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 11.56,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 11.58,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.02);
        }
    },
            {
        time: 12.00,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 12.02,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 12.40,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 12.42,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 12.84,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 12.86,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 13.20,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 13.22,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },    
            {
        time: 13.28,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 13.30,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 13.68,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 13.70,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 14.16,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 14.18,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 14.60,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 14.62,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.30);
        }
    },
            {
        time: 14.88,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
                {
        time: 14.90,
        action: function(){
            //frame1:
            morph("DRUM-3", 0, 0.02);
        }
    },
            {
        time: 14.92,
        action: function(){
            randomPosition(things["DRUM-3"].model);//frame1:
            morph("DRUM-3", 1, 0.02);
        }
    },
    {
        time: 20,
        action: function(){
            createjs.Tween.get(things["DRUM-3"].model.material).to({opacity:0}, 2000)
        }
    }

    
 


];

