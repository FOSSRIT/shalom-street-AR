function AR(_info){
	var base = State(0, 0, 0, 0);
	var toReturn = base.interface; //
	toReturn.type = "AR";
	//

	//---Load a Camera module
	var pictureSource = navigator.camera.PictureSourceType;
    var destinationType = navigator.camera.DestinationType;
    alert(this.onSuccess);
    navigator.camera.getPicture(function(){ alert('good'); }, function(){ alert('bad'); }, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });

	camera.getPicture(_onSuccess , _onError, );

	function _onError() { alert('hi error'); };

	function _onSuccess() { base.handleEvent("triggerGet", {}); };

	//--Load an ID module.

	//when you get a trigger event from the camera module, pass it to the trigger data.
	//And get the result.


	//
	function _onTriggerRecieved(trigger){
		//Unlock relevant content.
		_info.triggers.unlocked[trigger] = true;
		console.log("Got trigger " + i);
		//Go back to the browser.
		base.handleEvent("triggerGet", {});
	}

	base.addEvent("triggerGet", base.changeState("Browser", _info), false);

	//
	return toReturn;
}