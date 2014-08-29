var directory = (new File($.fileName)).parent;
for (var i = 0; i < 1023; i++){
    //Open and resize up
    var docRef = app.open(new File(directory + "/triggers/" + i + ".png"));
    docRef.resizeImage("700px", "700px", 100, ResampleMethod.NEARESTNEIGHBOR);
    
    
    //Save
    var opts = new ExportOptionsSaveForWeb();

    opts.PNG8 = false;
    opts.transparency = false;
    opts.interlaced = false;
    opts.quality = 100;
    opts.includeProfile = false;
    opts.format = SaveDocumentType.PNG; // Document Type
    docRef.exportDocument( new File( directory + "/resizedTriggers/" + i + ".png"),  ExportType.SAVEFORWEB, opts ); 

    //Close (free up space, etc...)
    docRef.close(SaveOptions.DONOTSAVECHANGES);
 }