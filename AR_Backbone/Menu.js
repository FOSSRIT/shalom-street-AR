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
 			console.log('got click');
 			_clipBoard.ToFire = ["click_camera"];
 		}, false);
		

 		for(var j in data.sections.mySection.unlockables){
 			_addSection();
 		}


 		base.setRemove(function(){ console.log('removing'); parent.removeChild(inner_parent.getDom()); })

 		console.log('Menu created from json');
 	}


	//Adds a new section to the menu, and propogates it with other stuff.
	function _addSection(data){
		var element	= DomWrapper(templates.menu_item_template.cloneNode(true));

		base.addModule(element);
		inner_parent.getDom().appendChild(element.getDom());
		//element.getDom().innerHTML = title;
	}

	return toReturn;

}