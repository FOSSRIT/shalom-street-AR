//Manager.js

/*
--Keeps track of playArea.js and toybox.js
--Handles drawing and things of that nature.
--
--Stuff we rely on:
--Big objects like the PlayArea and ToyBox need to have
--a method to pass in an event.
*/

function Manager(_canvas, _ctx, _scale) {

	//-------------VARIABLES-----------------------------------

	var canvas, ctx;
	var clipBoard = {};

	//
	var base = Module(0,0,1920,1080); //Call base
	var toReturn = base.interface; //Set toReturn via base.
	toReturn.type = "Manager";
	Touch.Collisions(base);

	//Switch methods.
	toReturn.draw = _draw;


	//-----------------------------------------------------------------

	//setup and events.
	//-----------------------------------------------------------------
	canvas = _canvas;
	ctx = _ctx;
	toReturn.scale = _scale;

	//Add in the events as needed.
	canvas.onmousedown = function(e){ base.handleEvent("mousedown", 
        { "eventType":"mousedown", 
        "mousex":((typeof e.offsetX !== "undefined")? e.offsetX : e.pageX - e.target.offsetLeft)*toReturn.scale, 
        "mousey": ((typeof e.offsetY !== "undefined")? e.offsetY : e.pageY - e.target.offsetTop)*toReturn.scale
        }); };
	canvas.onmouseup = function(e){ base.handleEvent("mouseup", 
        { "eventType":"mouseup", 
        "mousex":((typeof e.offsetX !== "undefined")? e.offsetX : e.pageX - e.target.offsetLeft)*toReturn.scale, 
        "mousey": ((typeof e.offsetY !== "undefined")? e.offsetY : e.pageY - e.target.offsetTop)*toReturn.scale
        }); };
	canvas.onmousemove = function(e){ 
		base.handleEvent("mousemove", 
        { "eventType":"mousemove", 
        "mousex":((typeof e.offsetX !== "undefined")? e.offsetX : e.pageX - e.target.offsetLeft)*toReturn.scale, 
        "mousey": ((typeof e.offsetY !== "undefined")? e.offsetY : e.pageY - e.target.offsetTop)*toReturn.scale
        }); 

        base.handleEvent("mouseover", 
        { "eventType":"mouseover", 
        "mousex":((typeof e.offsetX !== "undefined")? e.offsetX : e.pageX - e.target.offsetLeft)*toReturn.scale, 
        "mousey": ((typeof e.offsetY !== "undefined")? e.offsetY : e.pageY - e.target.offsetTop)*toReturn.scale
        });
	};

	base.addEvent("redraw", function(_clipBoard){ _draw(); }, false);
	//base.addEvent("*", function(_clipBoard){ _clipBoard.Destroy = true; }); //When manager finishes with an event, it sets it to be destroyed.
	//Needs additional testing before I leave it on.  I think adding this line will break a lot of things.
	//_tick();



	function _tick(){
		base.handleEvent("tick", {});
		window.requestAnimationFrame(_tick);
	}


	//Currently, very ineficient, but does allow for future expansion.
	var domDrawn = []; //What dom we've drawn.
	function _draw(){
		//Clear the screen.
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(var i=0; i<domDrawn.length; i++){
			domDrawn[i].style.display = "none";
		}
		domDrawn = [];

		//Loop through all objects and get list of sprites from them to return.
		var toDraw = []; //Fill this with sprites.
		for(var i=0; i<base.contents.length; i++){ //Theoretically, we could perform some oFpperations in here if need be.
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
			} else if(data.dom) {
                data.dom.style.left = ((data.x /*- data.originX*/) / toReturn.scale) + canvas.offsetLeft;
                data.dom.style.top = ((data.y /*- data.originY*/) / toReturn.scale) + canvas.offsetTop;
                data.dom.style.width = data.width / toReturn.scale + "px";
                data.dom.style.height = data.height / toReturn.scale + "px";
              	domDrawn.push(data.dom); //We've drawn this, the next time we do a redraw, we'll erase it.
            }
		}
	}


	//-------------PUBLIC INTERFACE---------------------------


	return toReturn;

}