var jsonLoader = {}

//This variable shouldn't ever be set.
jsonLoader.result = undefined;
jsonLoader.onresult = undefined;

//Modified from http://unixpapa.com/js/dyna.html
jsonLoader.Load = function(_src, functionOnFinish){
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = _src;
	head.appendChild(script);

	//
	jsonLoader.result = undefined; //Set us up to start.
	jsonLoader.onresult = function() {
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