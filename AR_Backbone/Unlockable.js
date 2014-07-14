//A menu item that is unlocked.
function Unlockable(template, destination, id){
	var base = Module(0, 0, 0, 0);
	var toReturn = base.interface;
	toReturn.id = id;
	toReturn.unlocked = false;

	//build the dom.
	//To make things easier for devs, we copy the node from a predefined point.
	var element = template.cloneNode(true); //True means that it's a deep copy.  It copies sub-nodes as well.
	destination.appendChild(element); //And add it to the list.


	//Add in the element that we just made.
	var item = DomWrapper(0, 0, 0, 0, element);
	base.addModule(DomWrapper(element)); //For rendering purposes.



	//We're cheating a bit by not passing mouse events through the application,
	//but it really doesn't make sense to.  It's wildly simpler to ignore width, height, etc...
	//And just capture events at the module and handle them as events.
	//It's also, honestly, more in the spirit of a modular approach, since we don't need to worry about
	//passing mouse clicks through the entire application all the time.  It just works.
	element.onclick = function(){
		if(toReturn.unlocked) { base.handleEvent("selected", {"unlocked":true}); }
		else { base.handleEvent("selected", {"unlocked":false}); }
	}
	//And add the event.
	base.addEvent("selected", function(_clipBoard){
		//Navigate to the proper place.
		if(_clipBoard.unlocked){
			console.log(toReturn.id);
		} else { console.log("locked"); }
	}, false);




	return toReturn;
}