var stuffLight = (function(){
	return function(THREE) {
		var animation;
		function addLightToModel(model){
			var boxGeometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
			var boxMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
			var cube = new THREE.Mesh( boxGeometry, boxMaterial );
			cube.position.set(0,0,0);


    		var light = new THREE.SpotLight(0xffffff);
			light.shadowCameraVisible = true;
			light.shadowDarkness = 0.95;
			light.castShadow = true;

			light.position = model.geometry.vertices[0];
			//light.lookAt(model.geometry.vertices[1]);

			var lightTarget = new THREE.Mesh(new THREE.BoxGeometry( 0.2, 0.2, 0.2 ),new THREE.MeshBasicMaterial( {color: 0xff0000} ));

			lightTarget.position = model.geometry.vertices[1];

			model.add(lightTarget);

			light.target = lightTarget;

			light.add( cube );
			model.add(light);
		}
		return {
			name: null,
			model: null,
			create: function(_model, _name) {
				var self = this;
				self.model = _model;
				self.name = _name;
				addLightToModel(_model);
				return self;
			}
		};
	}
}());