function TextBox(_x, _y, _width, _height, _text, _xOrigin, _yOrigin, _font) {

	//-----------------------INIT/VARIABLES-----------------------------

	var base = Module(_x, _y, _width, _height); //Call base
	var toReturn = base.interface; //Set toReturn via base

	//----------------------FIX SOME METHODS-----------------------------

	function _draw(){
		if(toReturn.visible) {
			return Array(_getData()); 
		} else {
			return [];
		}
	}

	function _getData(){ 
		return { 
			"text":toReturn.text,
			"font":toReturn.font,
			"x":toReturn.bounds.x, 
			"y":toReturn.bounds.y, 
			"width":toReturn.bounds.width, 
			"height":toReturn.bounds.height, 
			"originX":toReturn.origin.x, 
			"originY":toReturn.origin.y 
		}; 
	}



	//------------------------PUBLIC INTERFACE---------------------------

	//Allows you to set what the text is.
	toReturn.text = _text || "";
	//Allows you to set what the font of your text is.
	toReturn.font = _font || 'italic 90pt Calibri'
	//Contains the origin of the sprite.
	toReturn.origin = {"x":_xOrigin || 0, "y":_yOrigin || 0};
	//Returns an object with x, y, width, height, and image of the sprite.
	toReturn.getData = _getData;

	//Some functions are unavailable.  Don't try and add a module to a sprite, please.
	toReturn.addModule = function(){ alert("Error: Attempt to add sub-module to textbox."); };
	toReturn.draw = _draw;



	return toReturn;
}