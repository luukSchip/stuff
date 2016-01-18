var stuffThing = (function(){
	return function(THREE) {
		var prevTime = Date.now();
		return {
			name: undefined,
			animations: [],
			model: undefined,
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
					//console.log(influence);
					if(progress > 1 ){
						self.animations.splice(i,1);
						return;
					}else{
						self.model.morphTargetInfluences[animation.morphTargetIndex] = influence;
					}
				}
			}
		};
	}
}());