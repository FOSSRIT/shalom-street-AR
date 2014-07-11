//toybox.js

/*
-- The "pallet" for our toymaker game.
-- Aka a "toybox" full of parts.
-- This is where you'll drag things over from 
in order to place them on the play area.
-- It is divided into two sections: the tabs and 
the components.
-- This should disappear or slide off to 
the side should the play area go full screen.
*/

function ToyBox(_x, _y, _width, _height) {


	//------------------------------VARIABLES-------------------------------------

	var base = Module(_x, _y, _width, _height); //Call base
	var toReturn = base.interface; //Set toReturn via base.
	toReturn.type = "Toybox"

	//Modify public interface and add variables as necessary.
	toReturn.draw = _draw;
	var tabs = [];
	Touch.Collisions(base);

	base.addEvent("swapComponent", function(){ console.log("Toybox recieved swapComponent");}, false)



	//-------FOR DEV PURPOSES
	var x = _x;
	var y = _y; 
	var width = _width; 
	var height = _height; 
	
	//tab section info
	var tabX = x;
	var tabY = _y; 
	var tabWidth = width; 
	var tabHeight = height/8;

	//component section info
	var componentsX = x;
	var componentsY = y+height/8; 
	var componentsWidth = width; 
	var componentsHeight = 7*height/8;
	//------------------------------
	

	//list of tabs in the tab section.
	var _tabs = [

	];
	var _currentlySelectedTab; // the tab that is currently selected
	var _componentsContents = []; //list of components in the component section. these should be changed depending on what tab is selected.
	
	var _fireOnLoad = undefined;
	var _contextForLoad = undefined;
	//------------------------------FUNCTIONS-------------------------------------

	
	function _newTabSelected(_newTab){
		/*
			_currentlySelectedTab.highlight = false;
			_currentlySelectedTab = _newTab;
			_currentlySelectedTab.highlight = true;
			updateComponents("txt file path containing the list of components");
		*/
	}

	function updateComponents(_newListPath){
		/*
		//Go to the path and read the file.
		//update the data
		_componentsContents = _newList;
		*/
	}

	function _addTab(){

	}
	
	
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
		//Temp Dev Tab Section
		//Green Rect
		ctx.beginPath();
		ctx.lineWidth="5";
		ctx.strokeStyle="green";
		ctx.rect(tabX,tabY,tabWidth,tabHeight);
		ctx.stroke();
		//Temp Dev Component Section
		//Yellow Rect
		ctx.beginPath();
		ctx.lineWidth="5";
		ctx.strokeStyle="yellow";
		ctx.rect(componentsX,componentsY,componentsWidth,componentsHeight);
		ctx.stroke();
		//------------------End testing environment code--------------------------------
		//------------------------------------------------------------------------------
		
		return toDraw;
	}	

	return toReturn;
}