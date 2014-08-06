function Page(parent, templates, json, info){
	var base = State(0, 0, 0, 0);
	var toReturn = base.interface; //
	toReturn.type = "Page";




	/*
	var frame = document.createElement("IFRAME");
	frame.setAttribute("src", "Data/2014-2015/myContent.html");
	*/

	//Propogate based on what info you're passed in.
	var inner_parent;
	var content_parent;
	function _init(data){

		//addEventListener('message', - There are better ways to do this.
		window.onmessage = function(e){
			var message = e.data.split(':');
		    if(message[1] == 'size') {
		    	var dom = document.getElementById("_iframe"+message[0]);
		    	dom.style.height = message[2];
		    	console.log(message[2]);
		    }
		};


		inner_parent = DomWrapper(templates.viewer_template.cloneNode(true));
		content_parent = inner_parent.getDom().getElementsByClassName("viewer_tag")[0];
		parent.appendChild(inner_parent.getDom());
		base.addModule(inner_parent);

		Touch.DOMCollisions(inner_parent, inner_parent.getDom());


		//Grab all of the content we need to display.
		for(var i = 0; i < info.currentContent.length; i++){
			_addContent(info.currentContent[i], i)
		}


		var back_button = DomWrapper(inner_parent.getDom().getElementsByClassName("back_tag")[0]);
		var home_button = DomWrapper(inner_parent.getDom().getElementsByClassName("home_tag")[0]);

		var forward_button = DomWrapper(inner_parent.getDom().getElementsByClassName("forward_tag")[0]);

		base.setRemove(function(){ console.log('removing'); parent.removeChild(inner_parent.getDom()); });

	}


	function _addContent(url, id){
		var frame = document.createElement("IFRAME");
		frame.setAttribute("src", url);
		frame.setAttribute("id", "_iframe"+id);
		content_parent.appendChild(frame);

		frame.onload = function(){
			frame.contentWindow.postMessage(id + ':size?', '*');
		}
	}

	console.log('page created, about to init');

	//Add in back button.
	_init();
	return toReturn;

}