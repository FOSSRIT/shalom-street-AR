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



var Touch = function(){

	var base = extensionManager("Touch");
	var toReturn = base.interface;

	var events = [
	"mousedown",
	"mouseover",
	"mouseup",
	"mousemove",
	"touchbegin",
	"touchend",
	"touchover"
	//"mousemove"
	]

	var passAll = [
		"mousemove",
		"touchmove"
	]

	//Adds in events and sets them to bubble downward if they're colliding with sub-modules.
	toReturn.Collisions = function(module){
		base.init(module, "Collisions"); //Only add once.

		for(var i=0; i<events.length; i++){
			//Add the events.
			var eventToAdd = events[i];
			module.addEvent(eventToAdd, function(_clipBoard){ 
				//When recieving a touch event, loop through other events, and if applicable, send the event to them.
				//Update their clipBoard with the correct info.

				//Handle toFire at the end.
				var _finalToFire = [];



				for(var j=0; j<module.contents.length; j++) {

					//If the event isn't blocked.
					if(!_clipBoard.BlockEvents || _clipBoard.BlockEvents.indexOf(_clipBoard.eventType) == -1) {
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
				}

				//Set ToFire to be correct again.
				_clipBoard.ToFire = _finalToFire;

			}, false /*don't bubble event, we're handling that*/);
		}

		//Some events always get passed down, like mouse moving.
		for(i=0; i<passAll.length; i++){
			//Add the events.
			var eventToAdd = passAll[i];
			module.addEvent(eventToAdd, function(_clipBoard){ 
				//When recieving a touch event, loop through other events, and if applicable, send the event to them.
				//Update their clipBoard with the correct info.

				//Handle toFire at the end.
				var _finalToFire = [];

				for(var j=0; j<module.contents.length; j++) {

					if(module.contents[j].visible) {
						//Don't fire event if blocked.
						if(!_clipBoard.BlockEvents || _clipBoard.BlockEvents.indexOf(_clipBoard.eventType) == -1) {

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
	}



	//
	toReturn.DragAndDrop = function(module){
		base.init(module, "DragAndDrop"); //Only add once.

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


	//Feel free to test it out, I'm not 100 percent sure it will work perfectly.
	//But... if you call this, you should have access to two events - 
	//mouseenter and mouseexit, that work how you would expect.
	//
	toReturn.onEnterExit = function(module) {
		//base.init(module, "onEnterExit"); //Only add once.
		//Broken for now, this needs some reworking.
		//-------------------------------------------------
		var _over = false;
		module.addEvent("mouseover", function(_clipBoard) { 
			if(_over == false) {
				_over = true;
				module.handleEvent("mouseenter", _clipBoard);
			}
		});

		module.addEvent("mousemove", function(_clipBoard) {
			//If !colliding and _over.
			if(_over == true ) {
				//----------------------------------------------
				if(_clipBoard.prevMousex <= module.bounds.x ||
							_clipBoard.prevMousex >= module.bounds.x + module.bounds.width ||
							_clipBoard.prevMousey <= module.bounds.y ||
							_clipBoard.prevMousey >= module.bounds.y + module.bounds.height) {
				//-----------------------------------------------
					_over = false;
					module.handleEvent("mouseexit", _clipBoard);
					
				} //endif Collision
			}
		});
	}


	//Call this on submodules or yourself.  Both should work.
	toReturn.DOMCollisions = function(module, dom){
		//If you have a dom element to return.
		//if(module.getDom){
			//var dom = module.getDom();

			//Store that you've added these events.
			if(dom.addedDomCollisions)
			{
				//Remove all events.
				for(var e in dom.addedDomCollisions) {
					for(var e_2 in dom.addedDomCollisions[e]) {
						dom.removeEventListener(e, dom.addedDomCollisions[e][e_2].func, dom.addedDomCollisions[e][e_2].bubbleParam);
					}
				}

			} else {
				dom.addedDomCollisions = {}
			}

			//Add in relevant events.
			for(var e in events){
				if(!dom.addedDomCollisions[events[e]]) {
					dom.addedDomCollisions[events[e]] = [];
				}
				(function(e){

					var _add = function(mouseEvent){
						module.handleEvent(events[e], mouseEvent);
					} //
					//Mark this function as being added.
					dom.addedDomCollisions[events[e]].push({"dom":dom, "func":_add, "bubbleParam":true});
					dom.addEventListener(events[e], _add, true);
					module.addEvent(events[e], function(_clipBoard){ }, false);
				})(e);


				//Shouldn't fire off for mouseevents that just happened.
				(function(e){

					var _add = function(mouseEvent){
						if(mouseEvent.ToFire){
							for(var f in mouseEvent.ToFire) {
								if(!mouseEvent.BlockEvents || mouseEvent.BlockEvents.indexOf(f) == -1) {
									var e = mouseEvent.ToFire[f];
									mouseEvent.ToFire.splice(f); //Remove event to stop recursive fire bug.
									module.handleEvent(e, mouseEvent);
									mouseEvent.ToFire.push(e);//Add back on so other modules can catch it.
								}
							}
						}
					}
					//Mark function as being added.
					dom.addedDomCollisions[events[e]].push({"dom":dom, "func":_add, "bubbleParam":false});

					dom.addEventListener(events[e], _add, false);
				})(e);
			}


		//}
	}



	return base.interface;
}();