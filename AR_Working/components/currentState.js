function CurrentState(_x, _y, _width, _height){
	//------------------------------VARIABLES-------------------------------------

	var base = Module(_x, _y, _width, _height); //Call base
	var toReturn = base.interface; //Set toReturn via base.
	Touch.Collisions(base);
	toReturn.type = "CurrentState"

	//Modify public interface and add variables as necessary.
	toReturn.draw = _draw;
	
	//-------FOR DEV PURPOSES
	var x = _x;
	var y = _y; 
	var width = _width; 
	var height = _height; 
	
	var _fireOnLoad = undefined;
	var _contextForLoad = undefined;

	base.addEvent("swapComponent", function() { " currentState recieved swapComponent"} );
	
	//------------------------------FUNCTIONS-------------------------------------

	function _draw(){

		var toDraw = base.draw();

		//Temp Dev Test
		//--------ctx is not a variable that normally would be available here--------
		//--------Comment this out outside of testing environment-----------------------
		// Blue rectangle
		ctx.beginPath();
		ctx.lineWidth="10";
		ctx.strokeStyle="blue";
		ctx.rect(x,y,width,height);
		ctx.stroke();
		//------------------End testing environment code--------------------------------
		//------------------------------------------------------------------------------
		
		return toDraw;
	}	

	return toReturn;
}