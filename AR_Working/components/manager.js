//Manager.js

/*
--Keeps track of playArea.js and toybox.js
--Handles drawing and things of that nature.
--
--Stuff we rely on:
--Big objects like the PlayArea and ToyBox need to have
--a method to pass in an event.
*/

function Manager() {

	//-------------VARIABLES-----------------------------------

	var canvas, ctx;
	var clipBoard = {};

	//
	var base = Module(0,0,1920,1080); //Call base
	var toReturn = base.interface; //Set toReturn via base.
	Touch.Collisions(base);

	//Switch methods.
	toReturn.init = _init;
	toReturn.draw = _draw;

	//-----------------------------------------------------------------

	//
	function _init(_canvas, _ctx, _scale) {
		canvas = _canvas;
		ctx = _ctx;
		toReturn.scale = _scale;

		canvas.onmousedown = function(e){ base.handleEvent("mousedown", { "eventType":"mousedown", "mousex":e.offsetX*toReturn.scale, "mousey": e.offsetY*toReturn.scale}); };
		canvas.onmouseup = function(e){ base.handleEvent("mouseup", { "eventType":"mouseup", "mousex":e.offsetX*toReturn.scale, "mousey": e.offsetY*toReturn.scale}); };
		canvas.onmousemove = function(e){ base.handleEvent("mousemove", { "eventType":"mousemove", "mousex":e.offsetX*toReturn.scale, "mousey": e.offsetY*toReturn.scale}); };

		base.addEvent("redraw", function(_clipBoard){ _draw(); }, false);
		//_tick();
	}

	function _tick(){
		base.handleEvent("tick", {});
		window.requestAnimationFrame(_tick);
	}


	//Currently, very ineficient, but does allow for future expansion.
	function _draw(){
		//Clear the screen.
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//Loop through all objects and get list of sprites from them to return.
		var toDraw = []; //Fill this with sprites.
		for(var i=0; i<base.contents.length; i++){ //Theoretically, we could perform some opperations in here if need be.
			//Objects at the front of the array get drawn before objects in the back.
			toDraw = toDraw.concat(base.contents[i].draw());
		}

		for(var i=0; i<toDraw.length; i++) {
			var data = toDraw[i];
			if(data.image) { //If it's an image.
				//Currently no support for spritesheets.
				ctx.drawImage(data.image, 0, 0, data.image.width, data.image.height, data.x - data.originX, data.y - data.originY, data.width, data.height);
			} else if(data.text) { //If it's text.
				ctx.font = data.font;
				console.log(data);
				ctx.fillText(data.text, data.x - data.originX, data.y - data.originY);
				//Text draws from the lower left hand corner.
			}
		}
	}


	//-------------PUBLIC INTERFACE---------------------------


	return toReturn;

}