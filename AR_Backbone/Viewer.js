function Viewer(_info){
	var base = State(0, 0, 0, 0);
	var toReturn = base.interface; //
	toReturn.type = "Viewer";
	Touch.DOMCollisions(toReturn, _info.main);

	/*
	var frame = document.createElement("IFRAME");
	frame.setAttribute("src", "Data/2014-2015/myContent.html");
	*/

	//Propogate based on what info you're passed in.
	var page = Page(_info.main, _info.templates, {});
	base.addModule(page);

	//base.addEvent("mousedown", function(_clipBoard){ console.log('hello'); }, false);
	toReturn.addEvent("mousedown", base.changeState("Browser", _info), false);


	return toReturn;

}