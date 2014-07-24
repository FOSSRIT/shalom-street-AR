//copied from http://www.html5rocks.com/en/tutorials/speed/script-loading/
//Allows us to load one script in index instead of each part individually.
//Allows further modularization of the engine.
[
  _modPath + '/graphics/domElement.js',
  _modPath + '/graphics/sprite.js',
  _modPath + '/graphics/textbox.js'
].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
});