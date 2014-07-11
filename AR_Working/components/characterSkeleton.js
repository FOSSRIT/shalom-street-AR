//characterSkeleton.js
/*
Author: Nick Buonarota
Email: nickbuonarota@mail.rit.edu
Date Created: 6/2/2014
*/

/*
Summary: Intended to be a holder of sprites or components for a "character" 
in our app. Similar to the Diablo 3 system of character gear. For example, 
your character has a slot for a "hat", a slot for "boots", and so on.
*/

function CharacterSkeleton(_x, _y, _width, _height){
	//------------------------------VARIABLES-------------------------------------
	var base = Module(_x, _y, _width, _height); //Call base
	var toReturn = base.interface; //Set toReturn via base.
	toReturn.setSlot = _setSlot;
	Touch.DragAndDrop(base);
	//Touch.Collisions(base);


	toReturn.draw = _draw; //Modify public interface.
	


	var _slots = {
		"head": {"x":0 , "y":0, "width":234, "height":262, "sprite":undefined, "order":1},
		"body": {"x":0, "y":212, "width":220, "height":220, "sprite":undefined, "order":2},
		"feet": {"x":0, "y":347, "width":128, "height":128, "sprite":undefined, "order":0},
	}
	toReturn.slots = _slots;
	
	
	//---------------------------FUNCTIONS---------------------------------------
	function _draw(){

		var toDraw = [];
		//Recursively get all sprite data to draw.
		for(var i=0; i<base.contents.length; i++){
			toDraw = toDraw.concat(base.contents[i].draw());
		}

		//Set offsets.
		for(i=0; i<toDraw.length; i++){
			toDraw[i].x += toReturn.bounds.x;
			toDraw[i].y += toReturn.bounds.y;
		}

		return toDraw;

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
	
	function _addSlot(toAdd, _x, _y, _width, _height, _order){
		slots[toAdd] = {"x":_x || 0, "y": _y || 0, "width":_width || 128, "height":_height || 128, "order": _order || 0 }
	}
	function _removeSlot(toRemove){
		delete slots[toAdd];
	}
	
	function _setSlot(slot, sprite){

		//If you were passed in an image.
		if(typeof(sprite) == "string") {
			//Some error checking, we could be doing more here.
			if(toReturn.slots[slot]){
				toReturn.slots[slot].sprite.setImage(sprite);
			}
		//Otherwise.
		} else {
			//Remove the past contents of the slot if it exists.
			if(toReturn.slots[slot]){
				toReturn.removeModule(toReturn.slots[slot].sprite);
			}//


			base.addModule(sprite, toReturn.slots[slot].order);

			toReturn.slots[slot].sprite = sprite;
			sprite.bounds.x = toReturn.slots[slot].x;
			sprite.bounds.y = toReturn.slots[slot].y;

			//sprite.bounds.width = toReturn.slots[slot].width;
			//sprite.bounds.height = toReturn.slots[slot].height;
		}
	}

	/*
	function: 	_updateComponent
	parameters:	_componentType: type of component that is passed in. IE: baseball cap is has a _componentType of "hat"
				_component: what the component is. IE: "baseball cap"
	description: This function takes a passed in component and overrides the old component in that slot with the new one.
	returns: N/A
	*/
	function _updateComponent(_componentType, _component)
	{
		if(slots._componentType) {
			//Set the new sprite
			slots._componentType.sprite = _component;
			//Make sure that the sprite's x and y are at the spot for this componentType
			slots._componentType.sprite.bounds.x = _componentType.x;
			slots._componentType.sprite.bounds.y = _componentType.y;
		}
		
	}

	return toReturn;
}