//I have doubts about whether or not this will work really well when loading tons of JSON.  
//I guess we'll have to test it

var jsonLoader = function(){
	var base = extensionManager("jsonLoader");
	var toReturn = base.interface; //This works very similarly to how a module would work :)

	//This variable shouldn't ever be set.
	var result = undefined;

	//Modified from http://unixpapa.com/js/dyna.html
	toReturn.Load = function(_src, functionOnFinish){
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = _src;
		head.appendChild(script);

		result = undefined; //Set us up to start.
		toReturn.onresult = function() {
			//Check for errors.
			if(jsonLoader.result == undefined){
				alert("json loaded or set incorrectly.  Fatal error: load json scripts in the style of jsonLoader.result = {/*myjson*/}")
			} else {
				functionOnFinish(jsonLoader.result); //Run the function.
				//reset back to previous state.
				jsonLoader.result = undefined;
			}
		}
	}


	return toReturn;
}();
