var stuffHead = (function(){

	return function(THREE) {
		return {
			attributes: {
				scrambleAmplitude: 0.2,
				scramble: true,
				tweenSpeed: 25,
				posX: 0,
				posY: 0,
				posZ: 0,
				lowCut: 0,
				highCut: 1024,
				scale: 1.0
			},
			dae: undefined,
			face: undefined,
			wireFace: undefined,
			faceGeometry: undefined,
			mesh: undefined,
			scene: undefined,
			faceVertices: undefined,
			originalFaceVertices: new Array(),
			refresh: function(){
				//var self = this;
				var scale = this.attributes.scale;
				this.mesh.scale.set(scale,scale,scale);
				this.mesh.position.x = this.attributes.posX;
				this.mesh.position.y = this.attributes.posY;
				this.mesh.position.z = this.attributes.posZ;
			},
			fromCollada: function(dae,onLoadedCollada){
				var self = this;
				//self.scene = dae;
				dae.traverse( function ( child ) {
					if ( child instanceof THREE.Mesh ) {
						self.mesh = child;
						child.material = new THREE.MeshPhongMaterial( {
							color: 0x333333,
							side: THREE.DoubleSide,
							morphNormals: true,
							shading: THREE.SmoothShading,
							vertexColors: THREE.FaceColors,
							shading: THREE.FlatShading
						});

						face = faceGeometry = child;//dae.children[0].children[0];
						faceGeometry = face.geometry;
						self.faceVertices = faceGeometry.vertices;

						faceGeometry.computeVertexNormals();
						faceGeometry.computeMorphNormals();

						for(var i = 0; i < self.faceVertices.length; i++){
							var faceVertex = self.faceVertices[i];
							var originalFaceVertex = new THREE.Vector3(faceVertex.x, faceVertex.y, faceVertex.z);
							self.originalFaceVertices.push(originalFaceVertex);
						}
						
					}
				} );
				onLoadedCollada(self);
				return this;
			},
			create: function(onLoadedCollada, path) {
				var self = this;
				var loader = new THREE.ColladaLoader();
				loader.options.convertUpAxis = true;
				//loader.load( path, function ( collada ) {
				loader.load( "../models/collada/" + path, function ( collada ) {
					fromCollada(dae,onLoadedCollada);
				} );
				return self;
			}
		};
	}
}());