var stuffThing = (function(){
	return function(THREE) {
		var prevTime = Date.now();
		var prevMorphTargetIndex;
		return {
			name: undefined,
			animations: [],
			model: undefined,
			clones:[],
			create: function(_model, _name) {
				var self = this;
				self.model = _model;
				self.name = _name;
				return self;
			},
			morph: function(morphTargetIndex, toValue, duration, startTime){
				var self = this;
				var fromValue = self.model.morphTargetInfluences[morphTargetIndex];
				self.animations.push({morphTargetIndex: morphTargetIndex, fromValue, toValue: toValue, duration: duration, startTime: startTime});
			},
			updateAnimation: function(time){
				var self = this; 
				for(var i = 0; i < self.animations.length; i++){
					var animation = self.animations[0];
					var progress = (time - animation.startTime) / animation.duration;
					var influence = (progress * (animation.toValue - animation.fromValue)) + animation.fromValue;
					//console.log({index:animation.morphTargetIndex, influence:influence, animation:animation});
					if(progress > 1 ){
						self.animations.splice(i,1);
						self.model.morphTargetInfluences[animation.morphTargetIndex] = 1;
						self.model.morphTargetInfluences[prevMorphTargetIndex] = 0;
						prevMorphTargetIndex = animation.morphTargetIndex;
						return;
					}else{
						self.model.morphTargetInfluences[animation.morphTargetIndex] = influence;
						self.model.morphTargetInfluences[prevMorphTargetIndex] = 1 - influence;
					}
				}
			}
		};
	}
}());