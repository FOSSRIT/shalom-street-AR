function Unlockable(x, y, width, height, template){
	var base = Module(x, y, width, height);
	var toReturn = base.toReturn;

	//build the dom.
	//To make things easier for devs, we copy the node from a predefined point.
	var element = template.cloneNode(true);


	//
	base.addModule(DomWrapper(x, y, width, height));
}