function ARView(info){
	//AR is not a module and I'm not going to make it into a module.
	var toReturn = {};
	var detector = new AR.Detector();
	var canvas = document.createElement('canvas');
	//

	//---Load a Camera module
	toReturn.takePicture = function(onResult){
		var pictureSource = navigator.camera.PictureSourceType;
	    var destinationType = navigator.camera.DestinationType;

	    var result = 0;
		navigator.camera.getPicture(_onSuccess , _onError, { quality: 30, destinationType: Camera.DestinationType.FILE_URI, correctOrientation: true, targetWidth: 400 });

		function _onError(message) { alert('No trigger found'); };
		function _onSuccess(pic) {  
			//Render to internal canvas.
			var image = document.createElement('image');
			image.src = pic;
			image.onload = function(){

				canvas.width = image.width;
				canvas.height = image.height;
				var context = canvas.getContext('2d');
				context.drawImage(image, 0, 0, canvas.width, canvas.height)
				var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				//info.main.appendChild(canvas);  For debug purposes.
				//Detect markers.
				var markers = detector.detect(imageData);
				alert(markers);
				var result = [];
				for (var r in markers){
					result.push(markers[r].id);
				}
				//Return them.
				onResult(result);
			}
		};
	}

		//--Load an ID module.

		//when you get a trigger event from the camera module, pass it to the trigger data.
		//And get the result.

	//
	return toReturn;
}