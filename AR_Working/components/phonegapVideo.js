function HTML5Camera(_x, _y, _width, _height, _video) {

	var base = Module(_x, _y, _width, _height);
	var toReturn = base.interface;
	var _internalCanvas = document.createElement('canvas');
	_internalCanvas.width = _width;
	_internalCanvas.height =  _height;
	var _internalCtx = _internalCanvas.getContext('2d');
	var _currentFrame = new Image();

	//Some new public attributes.
	toReturn.video = _video;
	toReturn.type = "HTML5Camera"
	toReturn.loaded = false; //We aren't loaded until we get the camera stream.
	toReturn.origin = {"x":0, "y":0}

	//------------Start streaming and stuff-----------------


	//Our load event.
	var _fireOnLoad = undefined;
	var _ctxForLoad = undefined;
	function _successCallback(stream){
		if (window.webkitURL) {
			video.src = window.webkitURL.createObjectURL(stream);
		} else if (video.mozSrcObject !== undefined) {
			video.mozSrcObject = stream;
		} else {
			video.src = stream;
		}

		//Also, mark us as loaded.
		toReturn.loaded = true;
		if(_fireOnLoad != undefined){  //If there's anything to fire off.
			if(_ctxForLoad) { _fireOnLoad(_ctxForLoad); } else { _fireOnLoad(this); }
		}
		//And fire off internal loop.
	}

	//We actually have an error handler here, because things are more likely to go wrong.
	function _error(error){
		alert("Fatal error: Can not access HTML5 camera stream.");
	}


	//Actually try to load when created.
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	//Check for errors.
	if(navigator.getUserMedia){
		//None?  Cool, move on.
		navigator.getUserMedia({video: true}, _successCallback, _error);
		detector = new AR.Detector();
		//requestAnimationFrame(_tick);

	} else {
		//Errors.
		_error(undefined);
	}

	//----------------------Set up final interfaces-------------------------------

	//We have custom loading events, so we need to override this to hook into them.
	toReturn.setLoad = function(_function, _ctx) {
		_fireOnLoad = _function; _ctxForLoad = _ctx;
	}

	//Some more public stuff.
	toReturn.draw = function(){
		if(video.readyState === video.HAVE_ENOUGH_DATA){
			//Try catch fixes a bug in firefox where events aren't fired off at the right time.
			try {
				ctx.drawImage(video, 0, 0, _internalCanvas.width, _internalCanvas.height);
				_currentFrame.src = _internalCanvas.toDataURL("image/png");
			} catch(e){
				if(e.name == "NS_ERROR_NOT_AVAILABLE") {
					
				} else {
					throw e;
				}
			} 
		}
		if(toReturn.visible){
			if(toReturn.debug) {
				//Draw debug stuff where relevant.	
			} 

			//No matter what, we return the camera stream.
			if(_currentFrame.loaded){
				return { 
					"image": _currentFrame,
					"x":toReturn.bounds.x, 
					"y":toReturn.bounds.y, 
					"width":toReturn.bounds.width, 
					"height":toReturn.bounds.height,
					"originX":toReturn.origin.x,
					"originY":toReturn.origin.y
				};
			} else {
				return [];
			}
			
		} else {
			return [];
		}
	}

	//----------------------------------------------------------------------------


	return toReturn;
}