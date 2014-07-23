function Menu(parent, templates){
	var base = Module(0, 0, 0, 0);
	var toReturn = base.interface;
	toReturn.type = "Menu";


	jsonLoader.Load("Data/2014-2015.js", function(result){
		var data = jsonBuilder.GetJson(base, result);
		_init(data);	
	});


	var inner_parent;
 	function _init(data){ //Make a new menu, and set it up to be propogated with children.
 		inner_parent = DomWrapper(templates.menu_template.cloneNode(true));
 		parent.appendChild(inner_parent.getDom());
 		base.addModule(inner_parent);


 		//-------------Fill out upper title area--------------------------
 		var elementsThing = (inner_parent.getDom()).getElementsByClassName("title_tag")[0].innerHTML = data.title;
 		//Set camera.
 		var camera = DomWrapper(inner_parent.getDom().getElementsByClassName("camera_tag")[0]);
 		base.addModule(camera);

 		//Set camera events.
 		Touch.DOMCollisions(camera, camera.getDom());
 		camera.addEvent("mousedown", function(_clipBoard){
 			_clipBoard.ToFire = ["click_camera"];
 		}, false);
		

 		//For each section
 		for(var s in data.sections){
	 		for(var j in data.sections[s].unlockables){
	 			_addSection();
	 		}
	 	}

 		base.setRemove(function(){ parent.removeChild(inner_parent.getDom()); });
 	}


	//Adds a new section to the menu, and propogates it with other stuff.
	function _addSection(data){
		var element	= DomWrapper(templates.menu_item_template.cloneNode(true));

		base.addModule(element);
		inner_parent.getDom().appendChild(element.getDom());
		Touch.DOMCollisions(element, element.getDom());
		element.addEvent("mousedown", function(_clipBoard){ _clipBoard.ToFire = ["content_selected"]}, false);
		//element.getDom().innerHTML = title;
	}

	return toReturn;

}