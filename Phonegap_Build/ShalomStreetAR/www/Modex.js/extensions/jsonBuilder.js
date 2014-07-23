var jsonBuilder = function(){
	var base = extensionManager("jsonBuilder");
	var toReturn = base.interface; //This works very similarly to how a module would work :)

	//This variable shouldn't ever be set.
	var result = undefined;


	toReturn.Require = function(module, variableName) { //include default value, fail silently or publicly bool.
		base.init(module, false);
		//Check to see if we have a require list.
		if(!module.extensions.jsonBuilder.required) {
			module.extensions.jsonBuilder.required = {};
		}
		//Add the list.
		//Maybe change this to something better later.
		module.extensions.jsonBuilder.required[variableName] = true;
	}


	toReturn.GetJson = function(module, json) {
		base.init(module, false); //Maybe this shouldn't be false?


		//If we have a required list.
		if(module.extensions.jsonBuilder.required){
			for (var r in module.extensions.jsonBuilder.required){
				if(json["r"] == undefined) {
					alert("Fatal Error: Module " + module.interface.type + " requires " + r + " to be specified in it's included JSON.")
				}
			}
		} //Now that that's out of the way.

		//save json in an accessible format.
		module.jsonData = json;
		//Maybe we could automatically build some stuff in the future.
		//have some reserved variables or something.
		//
		return json;
	}


	return toReturn;
}();
