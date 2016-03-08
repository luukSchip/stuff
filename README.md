STUFF stuff
===========

functions you can use
---------------------

### cloneOnCircle (thing, amountOfClones, center, radius, callback) ###

clones Things and positions them on a circle

--------------	---------------------
argument  		description
--------------	---------------------
thing       	Thing (not the name
				but the actual 
				object)

amountOfClones  How many times the 
				thing will be cloned

center       	JS object that has 
				the coordinates of the
				center of the circle.
				{x:number,y:number,
				z:number}

radius       	JS object that has 
				the radius of the 
				circle for axes x 
				and z.
				{x:number, z:number}

callback     	function that will be
				called for each created
				clone.
				callback arguments:
				model, index
--------------	----------------------

example:
~~~
cloneOnCircle(
	things["rain.json"],	// Thing
	120,					// amount of clones
	{x:0,y:0,z:0},			// center
	{x:5,z:5},				// radius
	function(model,index){	// callback
	    model.rotation.y = (Math.PI*2) / 120 * index * -1;
	    model.rotation.x = (Math.PI*2) / 120 * index * -1;
	}
);
~~~


### animationCallbacks ###

animationCallbacks is an array of functions that will be called
each animation cycle. You can do anything in these functions.

example:
~~~
var callback = function(){			// function definition
	// rotate each clone of 'rain.json' around the x axis a tiny bit
    var thing = things["rain.json"];
    for(var i = 0; i < thing.clones.length; i++){
        var clone = thing.clones[i];
        clone.model.rotation.x += 0.01;
    }
}
animationCallbacks.push(callback);	// adds function to array
~~~