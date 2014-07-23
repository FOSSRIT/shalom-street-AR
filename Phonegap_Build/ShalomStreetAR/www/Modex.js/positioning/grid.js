//Grid.js

/*
--Handles putting objects into predictable grids
--with even spacing.
*/

function Grid(_x, _y, _rows, _columns, _itemWidth, _itemHeight, _margin) {

	//Calculate width and height.
	var width = _columns * (_margin + _itemWidth);
	var height = _rows * (_margin + _itemHeight)
	var itemWidth = _itemWidth;
	var itemHeight = _itemHeight;
	var margin = _margin;
	var rows = _rows;
	var columns = _columns

	//Set up base.
	var base = Module(_x, _y, width, height);
	var toReturn = base.interface;

	//Initialize.
	var _grid = [];
	for(var i = 0; i < _columns; i++) {
		_grid[i] = [];
		for (var j = 0; j < _rows; j++){
			_grid[i][j] = undefined; //Set up the array.
			//Internally, this is what we're going to use to manage stuff.
		}
	}


	/*

	*/
	toReturn.setSpace = function(toSet, column, row, matchSize){
		//If it's already there, remove the module.
		if(_grid[column][row] !== undefined) {
			base.removeModule(_grid[clolumn][row]);
		}

		_grid[column][row] = toSet;
		if(toSet !== undefined) {
			base.addModule(toSet);

			//Set it to correct position and width, if we're meant to do that.
			if(matchSize) {
				toSet.bounds.width = itemWidth;
				toSet.bounds.height = itemHeight;
			}
			//Regardless, set to right position.
			toSet.bounds.x = (itemWidth + margin)*column;
			toSet.bounds.y = (itemWidth + margin)*row;
		}
	}

	//ToDo: Add additional controls preventing people from setting bounds (internal checks to see if anything has been changed)
	//Add controls for people to get more information out.


	return toReturn;
}