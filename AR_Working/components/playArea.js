//PlayArea.js

/*
-- The "board" of our toymaker game.
-- This is where you'll drag things over and place them.
-- This is where we will render cutscenes and stuff.
-- Where you can play with the scenes that you make.
*/

//
function PlayArea(_x, _y, _width, _height) {


	//------------------------------VARIABLES-------------------------------------

	var base = Module(_x, _y, _width, _height); //Call base
	var toReturn = base.interface; //Set toReturn via base.
	toReturn.draw = _draw; //Modify public interface.
	toReturn.addModule = _addModule;
	Touch.Collisions(base);

	//---------------------------FUNCTIONS---------------------------------------


	function _draw(){

		toDraw = base.draw();

		//Temp Dev Test
		// Red rectangle
		//--------ctx is not a variable that normally would be available here--------
		//--------Comment this out outside of testing environment-----------------------
		ctx.beginPath();
		ctx.lineWidth="10";
		ctx.strokeStyle="red";
		ctx.rect(toReturn.bounds.x, toReturn.bounds.y, toReturn.bounds.width, toReturn.bounds.height);
		ctx.stroke();
		//------------------End testing environment code--------------------------------
		//------------------------------------------------------------------------------

		return toDraw;
	}	

	function _addModule(_object, _position){
		base.addModule(_object, _position);

		//We're assuming that everything in playarea is draggable.  It won't be in the future.
		_object.addEvent("mousemove", function(){
			if(_object.dragging) {
				//Check to see if it's outside of bounds.
				//x
				if(_object.bounds.x < 0){
					_object.bounds.x = 0;
					_object.dragging = false;
				}
				if(_object.bounds.x + _object.bounds.width > toReturn.bounds.width){
					_object.bounds.x = toReturn.bounds.width - _object.bounds.width;
					_object.dragging = false;
				}
				//y
				if(_object.bounds.y < 0){
					_object.bounds.y = 0;
					_object.dragging = false;
				}
				if(_object.bounds.y + _object.bounds.height > toReturn.bounds.height){
					_object.bounds.y = toReturn.bounds.height - _object.bounds.height;
					_object.dragging = false;
				}

			}
		}, false);
	}

	return toReturn;
}