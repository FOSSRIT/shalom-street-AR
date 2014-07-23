function AR(){
	//AR is not a module and I'm not going to make it into a module.
	var toReturn = {}
	//

	//---Load a Camera module
	toReturn.takePicture = function(onResult){
		var pictureSource = navigator.camera.PictureSourceType;
	    var destinationType = navigator.camera.DestinationType;

	    var result = 0;
		navigator.camera.getPicture(_onSuccess , _onError, { quality: 50, destinationType: navigator.camera.DestinationType.DATA_URL });

		function _onError() { alert('hi error'); };
		function _onSuccess(pic) {  
			result = 3;
			onResult(result);
		};
	}

		//--Load an ID module.

		//when you get a trigger event from the camera module, pass it to the trigger data.
		//And get the result.

	//
	return toReturn;
}