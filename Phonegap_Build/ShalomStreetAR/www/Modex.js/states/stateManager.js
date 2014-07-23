function StateManager(_startingState) {
	
	var base = Module(0, 0, 1920, 1080); //Call base
	var toReturn = base.interface; //Set toReturn via base.
	Touch.Collisions(base);
	toReturn.type = "StateManager";


	//Handles state changes.  I know eval is evil.  I'll allow it, for right now only.
	base.addEvent("changeState", function(_clipBoard){ 

		_prevState = _currentState;
		eval("_currentState = " + _clipBoard.stateInfo.to + "(_clipBoard.stateInfo.pass);");
		base.removeModule(_prevState);
		base.addModule(_currentState);
		//Gets rid of the screen flash effect by only changing states after the next one has loaded.
		//Needs to have some errors fixed in load for modules.  Modules need a way to supress load events.
		//_currentState.setLoad(function(){ base.removeModule(_prevState);  base.addModule(_currentState); console.log(base.contents.length);});
		if(_currentState.init) {
			_currentState.init();
		}
	}, false);

	//And get us started.
	var _currentState = _startingState;
	var _prevState = undefined;
	base.addModule(_currentState);
	if(_currentState.init) {
		_currentState.init();
	}

	//That was easy.
	return toReturn;
}