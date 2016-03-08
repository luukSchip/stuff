var stuffThing = (function(){
	return function(THREE, model, name, prevTime, prevMorphTargetIndex, cloneIndex) {
		prevTime = prevTime || Date.now();
		return {
			name: name,
			animations: [],
			model: model,
			clones:[],
			morph: function(morphTargetIndex, toValue, duration, startTime){
				var self = this;
				var fromValue = self.model.morphTargetInfluences[morphTargetIndex];
				self.animations.push({
					morphTargetIndex: morphTargetIndex, 
					toValue: toValue, 
					duration: duration, 
					startTime: startTime
				});
			},
			updateAnimation: function(time){
				var self = this; 
				for(var i = 0; i < self.animations.length; i++){
					////console.log(self);
					var animation = self.animations[0];
					var progress = (time - animation.startTime) / animation.duration;
					//var influence = (progress * (animation.toValue - animation.fromValue)) + animation.fromValue;
					var influence = progress * animation.toValue ;
					////console.log({index:animation.morphTargetIndex, influence:influence, animation:animation});
					if(progress > 1 ){
						self.animations.splice(i,1);
						self.model.morphTargetInfluences[animation.morphTargetIndex] = 1;
						self.model.morphTargetInfluences[prevMorphTargetIndex] = 0;
						prevMorphTargetIndex = animation.morphTargetIndex;
						return;
					}else{
						self.model.morphTargetInfluences[animation.morphTargetIndex] = influence;
						self.model.morphTargetInfluences[prevMorphTargetIndex] = 1 - influence;
						//console.log(cloneIndex + ", " + influence + ", " + self.model.morphTargetInfluences[animation.morphTargetIndex]);
					}
				}
			},
			clone: function(){
				var clone = stuffThing(THREE,this.model.clone(),this.name,prevTime,prevMorphTargetIndex,this.clones.length);
				this.clones.push(clone);
				return clone;
			}
		};
	}
}());