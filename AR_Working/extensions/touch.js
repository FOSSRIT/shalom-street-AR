//Touch.js

/*
-- Adds touch events and touch handling to a module.
-- Run this extension on your base after declaring it with module.
-- 
*/

//Namespace.
//Almost everything in an extension is public facing.  
//People who use them should know what they're doing and how to modify it.
//Try not to have methods that you're not comfortable with the user calling on their own.
//Ideally, the user should be able to add any function as an extension.

//Our convention right now is for publicly facing variables to be lowercase in extensions
//And for functions that can be called as extensions to be uppercase.
var Touch = {}

//Events that we'll add.
Touch.events = [
	"mousedown",
	"mouseover",
	"mouseup",
	"mousemove",
	"touchbegin",
	"touchend",
	"touchover"
	//"mousemove"
]

Touch.passAll = [
	"mousemove",
	"touchmove"
]

//Adds in events and sets them to bubble downward if they're colliding with sub-modules.
Touch.Collisions = function(module){
	for(var i=0; i<Touch.events.length; i++){
		//Add the events.
		var eventToAdd = Touch.events[i];
		module.addEvent(eventToAdd, function(_clipBoard){ 
			//When recieving a touch event, loop through other events, and if applicable, send the event to them.
			//Update their clipBoard with the correct info.

			//Handle toFire at the end.
			var _finalToFire = [];

			for(var j=0; j<module.contents.length; j++) {
				//Only click on visible modules.
				if(module.contents[j].visible) {
					//Collision detection
					//--------------------------------------------------------------------------------------------
					if(_clipBoard.mousex > module.contents[j].bounds.x &&
						_clipBoard.mousex < module.contents[j].bounds.x + module.contents[j].bounds.width &&
						_clipBoard.mousey > module.contents[j].bounds.y &&
						_clipBoard.mousey < module.contents[j].bounds.y + module.contents[j].bounds.height) {
					//------------------------------------------------------------------------------------------

						//Link to the outer world.
						var prevMousex = _clipBoard.mousex;
						var prevMousey = _clipBoard.mousey;
						//
						_clipBoard.prevMousex = prevMousex;
						_clipBoard.prevMousey = prevMousey;
						//Update stuff.
						_clipBoard.mousex -= module.contents[j].bounds.x;
						_clipBoard.mousey -= module.contents[j].bounds.y;

						//Pass down the function.
						module.contents[j].handleEvent(_clipBoard.eventType, _clipBoard);
						//Handle toFire
						_finalToFire = module.handleToFire(module.contents[j], _finalToFire, _clipBoard);
						//Fix the clipboard so that the process can be repeated.
						_clipBoard.mousex = prevMousex;
						_clipBoard.mousey = prevMousey;
					}
				}
			}

			//Set ToFire to be correct again.
			_clipBoard.ToFire = _finalToFire;

		}, false /*don't bubble event, we're handling that*/);
	}

	//Some events always get passed down, like mouse moving.
	for(i=0; i<Touch.passAll.length; i++){
		//Add the events.
		var eventToAdd = Touch.passAll[i];
		module.addEvent(eventToAdd, function(_clipBoard){ 
			//When recieving a touch event, loop through other events, and if applicable, send the event to them.
			//Update their clipBoard with the correct info.

			//Handle toFire at the end.
			var _finalToFire = [];

			for(var j=0; j<module.contents.length; j++) {

				if(module.contents[j].visible) {

					//Link to the outer world.
					var prevMousex = _clipBoard.mousex;
					var prevMousey = _clipBoard.mousey;
					//
					_clipBoard.prevMousex = prevMousex;
					_clipBoard.prevMousey = prevMousey;
					//Update stuff.
					_clipBoard.mousex -= module.contents[j].bounds.x;
					_clipBoard.mousey -= module.contents[j].bounds.y;

					//Pass down the function.
					module.contents[j].handleEvent(_clipBoard.eventType, _clipBoard);

					//Handle toFire
					_finalToFire = module.handleToFire(module.contents[j], _finalToFire, _clipBoard);

					//Fix the clipboard so that the process can be repeated.
					_clipBoard.mousex = prevMousex;
					_clipBoard.mousey = prevMousey;
				}
			}

			//Set ToFire to be correct again.
			_clipBoard.ToFire = _finalToFire;

		}, false /*don't bubble event, we're handling that*/);
	}
}

//t
Touch.DragAndDrop = function(module){
	module.mouseOffset = {"x":0, "y":0}
	module.lastMouse = {"x":0, "y":0}
	module.interface.dragging = false;
	//Add the actual event.
	module.addEvent("mousedown", function(_clipBoard){
		module.lastMouse.x = _clipBoard.mousex;
		module.lastMouse.y = _clipBoard.mousey;
		module.mouseOffset.x = _clipBoard.mousex;
		module.mouseOffset.y = _clipBoard.mousey;
		module.interface.dragging = true;
		console.log("startDrag");
	}, false);
	//
	module.addEvent("mousemove", function(_clipBoard){
		if(module.interface.dragging) {

			module.interface.bounds.x = _clipBoard.prevMousex - module.mouseOffset.x;
			module.interface.bounds.y = _clipBoard.prevMousey - module.mouseOffset.y;
			module.lastMouse.y = _clipBoard.mousey;
			module.lastMouse.x = _clipBoard.mousex;
			//module.interface.bounds.y = _clipBoard.mousey// + module.interface.bounds.y//module.mouseOffset.y// + module.interface.bounds.y
			if(_clipBoard.ToFire) { _clipBoard.ToFire.push("redraw"); } else { _clipBoard.ToFire = ["redraw"]; }
		}
	}, false);
	//
	module.addEvent("mouseup", function(_clipBoard){
		module.interface.dragging = false;
	}, false);
}

