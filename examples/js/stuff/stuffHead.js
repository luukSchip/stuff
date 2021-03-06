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
				highCut: 1024
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
						}
					} );
					face = faceGeometry = dae.children[0].children[0];

					// wireFace = new THREE.Mesh( face.geometry, new THREE.MeshLambertMaterial({
					// 		color: 0xffffff,
					// 		side: THREE.DoubleSide,
					// 		wireframe: true,
					// 		transparent: true,
					// 		opacity: 0.1
					// 	})
					// );
					// wireFace.scale.set(1.1,1.1,1.1);
					// dae.children[0].add(wireFace);
					faceGeometry = face.geometry;
					self.faceVertices = faceGeometry.vertices;

					faceGeometry.computeVertexNormals();
					faceGeometry.computeMorphNormals();

					for(var i = 0; i < self.faceVertices.length; i++){
						var faceVertex = self.faceVertices[i];
						var originalFaceVertex = new THREE.Vector3(faceVertex.x, faceVertex.y, faceVertex.z);
						self.originalFaceVertices.push(originalFaceVertex);
					}

					onLoadedCollada(self);
				} );
				return this;
			}
		};
	}
}());