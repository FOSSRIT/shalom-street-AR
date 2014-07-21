function AR(_info){
	var base = State(0, 0, 0, 0);
	var toReturn = base.interface; //
	toReturn.type = "AR";
	//

	//---Load a Camera module

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