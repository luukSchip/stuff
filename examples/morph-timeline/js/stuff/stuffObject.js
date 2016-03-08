var stuffObject = (function(){

	return function(THREE) {
		return {
			attributes: {
				scrambleAmplitude: {x:0.2,y:0.2,z:0.2},
				scramble: true,
				tweenSpeed: 25,
				posX: 0,
				posY: 0,
				posZ: 0,
				lowCut: 0,
				highCut: 1024,
				scale: 1.0
			},
			dae: null,
			face: null,
			wireFace: null,
			faceGeometry: null,
			mesh: null,
			model: null,
			scene: null,
			vertices: null,
			originalVertices: new Array(),
			animations: [],
            animationProgress: 0,
			startAnimations: function(){
				var self = this;
				for ( var i = 0; i < self.animations.length; ++i ) {
					var animation = self.animations[i];
					for ( var h = 0, hl = animation.hierarchy.length; h < hl; h++ ) {
						var keys = animation.data.hierarchy[ h ].keys;
						var sids = animation.data.hierarchy[ h ].sids;
						var obj = animation.hierarchy[ h ];
						if ( keys.length && sids ) {
							for ( var s = 0; s < sids.length; s++ ) {
								var sid = sids[ s ];
								var next = animation.getNextKeyWith( sid, h, 0 );
								if ( next ) next.apply( sid );
							}
							obj.matrixAutoUpdate = false;
							animation.data.hierarchy[ h ].node.updateMatrix();
							obj.matrixWorldNeedsUpdate = true;
						}
					}
					animation.loop = true;
					animation.play();
				}
			},
			updateAnimations:function(time){
                var self = this;


                var progress = self.animationProgress;
                if ( progress >= 0 && progress < 48 ) {
                    for ( var i = 0; i < self.animations.length; ++i ) {
                        var animation = self.animations[i];
                        animation.update(time);

                    }
                } else if ( progress >= 48 ) {
                    for ( var i = 0; i < self.animations.length; ++i ) {
                        var animation = self.animations[i];
                        animation.stop();
                    }
                    progress = 0;
                    self.startAnimations();
                }
                progress += time;
			},
			refresh: function(){
				//var self = this;
				var scale = this.attributes.scale;
				this.mesh.scale.set(scale,scale,scale);
				this.mesh.position.x = this.attributes.posX;
				this.mesh.position.y = this.attributes.posY;
				this.mesh.position.z = this.attributes.posZ;
			},
            fromCollada: function(collada, onLoadedCollada){
                var self = this;
                var animations = collada.animations;
                for(var i = 0; i < animations.length; i++){
                    var animation = animations[ i ];
                    var kfAnimation = new THREE.KeyFrameAnimation( animation );
                    kfAnimation.timeScale = 1;
                    self.animations.push( kfAnimation );
                }
                self.fromSingleObject(collada.scene,onLoadedCollada);
            },
			fromSingleObject: function(group, onLoadedCollada){
				var self = this;
                ////console.log(dae)
                // animations
                // mesh
				group.traverse( function ( child ) {
					if ( child instanceof THREE.Mesh ) {
						self.mesh = child;
						self.model = child;
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
						self.vertices = faceGeometry.vertices;
						faceGeometry.computeVertexNormals();
						faceGeometry.computeMorphNormals();

						for(var i = 0; i < self.vertices.length; i++){
							var vertex = self.vertices[i];
							var originalFaceVertex = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
							self.originalVertices.push(originalFaceVertex);
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