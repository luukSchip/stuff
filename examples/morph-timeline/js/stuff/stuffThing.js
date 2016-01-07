var stuffThing = (function(){
	return function(THREE) {
		var prevTime = Date.now();
		return {
			animations: [],
			model: undefined,
			mixer: undefined,
			create: function(_model) {
				var self = this;
				self.model = _model;
				// var animation = new THREE.MorphAnimation( _model );
				//animation.play();
				// self.animations.push(animation);


				//console.log(self.mixer);
				return self;
			},
			morph: function(morphTargetIndexes, duration){
				var self = this;
				var morphTargetSequence = [];
				for(var i = 0; i < morphTargetIndexes.length; i++){
					morphTargetSequence.push(self.model.geometry.morphTargets[morphTargetIndexes[i]]);
				}
				var clip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'gallop', morphTargetSequence, 60 );
				var animationAction = new THREE.AnimationAction( clip,0,1,1,THREE.LoopOnce ).warpToDuration( duration );
				//animationAction.loop = THREE.LoopOnce;
				if(!self.mixer){
					prevTime = Date.now();
					self.mixer = new THREE.AnimationMixer( self.model );
				}
				self.mixer.addAction(animationAction);
				//self.mixer.fadeIn(animationAction,duration);
				console.log(self);
			},
			updateAnimation: function(){
				var self = this;
				if(self.mixer){
					//console.log("updating anim");
					var time = Date.now();
					self.mixer.update( ( time - prevTime ) * 0.001);
					
					prevTime = time;
				}
			}
		};
	}
}());