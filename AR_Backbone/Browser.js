function Browser(_info){
	var base = State(0, 0, 0, 0);
	var toReturn = base.interface; //
	toReturn.type = "Browser";

	var containers = [];


	function _init(){	

		var menu = Menu(_info.main, _info.templates, {});//Menu(_info.main, _info.templates);
		base.addModule(menu);
	}


	//Handle restoration by re-adding any existing dom. 
	//(If you don't want to recreate the state from scratch)
	function _reinsert(){
		for(var x in base.contents){
			var module = base.contents[x];
			if(module.type == "DomWrapper"){
				_info.main.appendChild(base.contents[x]);
			}
		}
	}

	Touch.DOMCollisions(toReturn, _info.main);
	/*base.addEvent("click_camera", function(_clipBoard){
		console.log('caught click_camera');
	}, false);*/
	base.addEvent("click_camera", base.changeState("Viewer", _info), false);


	//
	toReturn.init = _init;
	toReturn.reinsert = _reinsert;
	_init();
	console.log('browser created');
	return toReturn;
}