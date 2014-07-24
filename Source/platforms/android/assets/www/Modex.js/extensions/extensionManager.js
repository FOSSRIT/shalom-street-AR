var extensionManager = function(extensionName){

	var base = {};
	base.interface = {}; //What the extension exposes to other people.


	//Used to make sure the extension is properly installed on the module.
	base.init = function(module, method){
		//
		if(!module.extensions[extensionName]){
			//You could also check dependencies/compatability issues here.
			module.extensions[extensionName] = {};
		}
		//If we've been sent in data indicating that this method is meant to only be called once.
		if(method) {
			//Check to see if the sub of whatever extension we're working with exists.
			if(!module.extensions[extensionName][method]) {
				//Mark the extension as having been called.
				module.extensions[extensionName][method] = true; 
			} else {
				//Error message.
				alert("attempt to call extension "+extensionName+"."+method+" twice on the same module.  Extension has indicated that it should only be called once per module.");
			}
		}
	}

	//I don't think there are any other things I need.
	//base.requirements = [];

	return base;
}