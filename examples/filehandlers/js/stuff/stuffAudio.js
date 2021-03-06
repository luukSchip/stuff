var stuffAudio = (function(){

	return function(filenames,absolute){
		var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		var analysers = new Array();
		//var dataArrays = new Array();
		var sources = new Array();
		var startTime = 0;
		var loadBuffers = function(audioData){
			console.log(audioData);
			for(var i = 0; i < audioData.length; i++){
				(function(audioData, i){
					var source = audioCtx.createBufferSource();
					var analyser = audioCtx.createAnalyser();
					analyser.fftSize = 2048;
					var bufferLength = analyser.frequencyBinCount;
					//var dataArray = new Uint8Array(bufferLength);
					//dataArrays.push(dataArray);

					audioCtx.decodeAudioData(audioData[i],function(buffer){
			        		source.buffer = buffer;
			                source.connect(audioCtx.destination);
			                source.connect(analyser);
			                sources.push(source);
			                analysers.push(analyser);
			                console.log("audio loaded " + i);
			                if(i == audioData.length - 1){
			                	playAudio(sources);

			                }
			            },

			            function(e){"Error with decoding audio data" + e.err}
					);
				})(audioData, i);
			}
		};
		var playAudio = function(sources){
			startTime = audioCtx.currentTime;
			console.log(startTime);
			for(var i = 0; i < sources.length; i++){
				sources[i].start(0);
			}
		};
		return {
			sources: sources,
			analysers: analysers,
			init: function(){
				var audioData = new Array();
				for(var i = 0; i < filenames.length; i++){
				    (function(i, filenames){
					    var request = new XMLHttpRequest();
					    var uri = filenames[i];
					    if(!absolute){
					    	uri = 'audio/'+filenames[i];
					    }
					    request.open('GET', uri, true);
					    request.responseType = 'arraybuffer';
					    request.onload = function() {
					        audioData.push(request.response);
					        console.log("file " + filenames[i] + " loaded");
					        console.log("filenames length: " + filenames.length);
					        console.log(i == filenames.length - 1);
					        if(i == filenames.length - 1){
					        	console.log("heuj");
					        	loadBuffers(audioData);
					        }
					    }
					    request.send();
				    })(i, filenames);
				}
				return this;
			}
		}
	}
}());