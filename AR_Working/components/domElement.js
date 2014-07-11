
//With a dom element, you don't pass in a position.
//The bounds also don't really matter.
function DomWrapper(_domElement){
	var base = Module(0, 0, 0, 0);
	var toReturn = base.interface;
	toReturn.type = "DomWrapper";
	//toReturn.interface = true;
	toReturn.loaded = true;

	//Some init.

	if(_domElement != undefined){
		var _dom = _domElement;
	} else {
		alert("attempt to create dom wrapper around undefined.  Fatal error.");
	}

	//-------------DOM controls------------------

	function _setDom(_domElement){
		if(_domElement != undefined){
		 	_dom = _domElement
		} else {
			alert("attempt to create dom wrapper around undefined.  Fatal error.");
		}
	}


	function _draw(){
		if(toReturn.visible){
			_dom.style.visibility="visible";
		} else {
			_dom.style.visibility="hidden";
		}

		return [];
	}

	function _getDom(){
		return _dom;
	}

	//-------------Public interfaces-------------

	toReturn.setDom = _setDom;
	toReturn.draw = _draw;
	toReturn.getDom = _getDom;
	toReturn.addModule = function(){ alert("attempt to add a sub-module to a domWrapper.  Fatal Error."); };
	

	return toReturn;
}


//Block events.
//state -->