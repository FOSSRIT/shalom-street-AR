function Menu(parent, templates, unlocked){
	var base = Module(0, 0, 0, 0);
	var toReturn = base.interface;
	toReturn.type = "Menu";


	var data;
	jsonLoader.Load("Data/2014-2015.js", function(result){
		data = jsonBuilder.GetJson(base, result);
		_init(data);	
	});


	var inner_parent;
 	function _init(data){ //Make a new menu, and set it up to be propogated with children.
 		inner_parent = DomWrapper(templates.menu_template.cloneNode(true));
 		parent.appendChild(inner_parent.getDom());
 		base.addModule(inner_parent);


 		//-------------Fill out upper title area--------------------------
 		//var elementsThing = (inner_parent.getDom()).getElementsByClassName("title_tag")[0].innerHTML = data.title;
 		//Set camera.
 		var camera = DomWrapper(inner_parent.getDom().getElementsByClassName("camera_tag")[0]);
 		base.addModule(camera);

 		//Set camera events.
 		Touch.DOMCollisions(camera, camera.getDom());
 		camera.addEvent("mousedown", function(_clipBoard){
 			_clipBoard.ToFire = ["click_camera"];
 		}, false);
 		camera.addEvent("click_camera", function(_clipBoard){
 			_clipBoard.ToFire = [];
 		}, false);
		

 		//For each section
 		for(var s in data.sections) {
 			_addSection(data.sections[s], s);

	 		for(var j in data.sections[s].unlockables){
	 			
	 		}
	 	}

 		base.setRemove(function(){ parent.removeChild(inner_parent.getDom()); });
 	}

 	toReturn.refresh = function(){
 		 parent.removeChild(inner_parent.getDom());
 		 _init(data);
 	}


	//Adds a new section to the menu, and propogates it with other stuff.
	function _addSection(data, title){
		var element	= DomWrapper(templates.menu_item_template.cloneNode(true));
		element.getDom().getElementsByClassName('title_tag')[0].innerHTML = title;

		base.addModule(element);
		inner_parent.getDom().appendChild(element.getDom());
		Touch.DOMCollisions(element, element.getDom());



		element.linkTo = []; //What content we're going to load when clicked.
		element.unlocked = 0;

		//If the element is unlocked.
		element.total = 0;
		for (var s in data.unlockables) {
			element.total += 1;
			//If the section is unlocked.
			var unlockable = data.unlockables[s];
			if(unlocked[unlockable.id]){
				element.unlocked += 1;
				element.linkTo.push(unlockable.url);
			}
		}

		var leftToUnlock = element.total - element.unlocked; if(leftToUnlock == 0) { leftToUnlock = '*'; }
		element.getDom().getElementsByClassName('unlocked_amount_tag')[0].innerHTML = leftToUnlock;

		(function(element) { 
			element.addEvent("mousedown", function(_clipBoard){ 
				console.log('register a click');
				_clipBoard.ToFire = ["content_selected"]
				_clipBoard.linkTo = element.linkTo;
				_clipBoard.unlocked = element.unlocked;
			}, false);
		})(element);

		if(element.unlocked == 0){
			element.getDom().className += " item_locked";
		} else if (element.unlocked == element.total){
			element.getDom().className += " item_unlocked";
		} else {
			element.getDom().className += " item_partial";
		}
	}

	return toReturn;

}