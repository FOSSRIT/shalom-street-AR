function HTML5Camera(_x, _y, _width, _height, _video) {

	var base = Module(_x, _y, _width, _height);
	var toReturn = base.interface;

	//Some new public attributes.
	toReturn.video = _video;
	toReturn.type = "HTML5Camera"

	//------------Start streaming and stuff-----------------


	function _successCallback(stream){
	  if (window.webkitURL) {
	    video.src = window.webkitURL.createObjectURL(stream);
	  } else if (video.mozSrcObject !== undefined) {
	    video.mozSrcObject = stream;
	  } else {
	    video.src = stream;
	  }
	}

	function _error(error){
		alert("Fatal error: Can not access HTML5 camera stream.");
	}

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	//Check for errors.
	if(navigator.getUserMedia){}
		//None?  Cool, move on.
		navigator.getUserMedia({video: true}, _successcallback, _errorCallback);
		detector = new AR.Detector();
		requestAnimationFrame(tick);

	} else {
		//Errors.
		_error(undefined);
	}

	//---------------------Other internals and the good stuff like ticking----------------

	function _tick(){
		if(video.readyState === video.HAVE_ENOUGH_DATA) {
			snapshot();
			var markers = detector.detect(imageData);




			
			drawCorners(markers);
			drawId(markers);

			//Start running a timer.
			if(markers.length > 0)
			{
				timeOn++;
				drawProgressCircle(markers);

				if(timeOn > 120)
				{
					document.getElementById("trigger").style.visibility = "hidden";
					document.getElementById('triggerText').style.visibility = "visible";
				}
			}
			else
			{
				timeOn = 0;
			}
		}

		//
		requestAnimationFrame(tick);
	}




	return toReturn;
}