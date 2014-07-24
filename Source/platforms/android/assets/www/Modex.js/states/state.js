//Abstract class - use it to make a state.
function State(_x, _y, _width, _height){
	//------------------------------VARIABLES-------------------------------------
	var base = Module(_x, _y, _width, _height); //Call base
	base.interface.type = "State";
	

	//Some stuff.
	//From is an optional parameter - you most likely won't need it.
	//Don't rely on it being there unless you know it will be.
	base.changeState = function(to, pass, from){
		var _toReturn = function(_clipBoard){
			_clipBoard.ToFire = ["changeState"];
			_clipBoard.stateInfo = {
				"from": from || "undefined", 
				"to": to, 
				"pass": pass,
			};
		}

		return _toReturn;
	} 

	return base;
}