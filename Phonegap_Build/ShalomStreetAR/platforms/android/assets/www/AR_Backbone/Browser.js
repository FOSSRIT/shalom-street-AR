function Browser(_info){
	var base = State(0, 0, 0, 0);
	var toReturn = base.interface; //
	toReturn.type = "Browser";
	var info = _info

	var containers = [];
	var camera = AR();


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
				info.main.appendChild(base.contents[x]);
			}
		}
	}

	Touch.DOMCollisions(toReturn, _info.main);
	base.addEvent("click_camera", function(_clipBoard) {
		camera.takePicture(function(result) {
			alert(result);
		});
		/*var pictureSource = navigator.camera.PictureSourceType;
	    var destinationType = navigator.camera.DestinationType;

		navigator.camera.getPicture(_onSuccess , _onError, { quality: 50, destinationType: navigator.camera.DestinationType.DATA_URL });

		function _onError() { alert('hi error'); };
		function _onSuccess(pic) { 
			alert('got pic successfully'); 
		}*/
	}, false);

	base.addEvent("content_selected", function(_clipBoard){
		(base.changeState("Viewer", info))(_clipBoard);
	}, false);


	//
	toReturn.init = _init;
	toReturn.reinsert = _reinsert;
	console.log('browser created');
	return toReturn;
}