var stuffHead = (function(){

	return function(THREE) {
		var dae;
		var face;
		var wireFace;
		var faceGeometry;
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
			mesh: undefined,
			scene: undefined,
			faceVertices: undefined,
			originalFaceVertices: new Array(),
			create: function(onLoadedCollada, path) {
				var self = this;
				var loader = new THREE.ColladaLoader();
				loader.options.convertUpAxis = true;
				loader.load( path, function ( collada ) {
					console.log();
					self.scene = dae = collada.scene;

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
				} );
				return this;
			}
		};
	}
}());