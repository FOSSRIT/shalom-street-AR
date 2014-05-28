alert('generating trigger images');

var availablePatterns = [ [1,0,0,0,0], [1,0,1,1,1], [0,1,0,0,1], [1,0,0,0,1] ];
var doc = app.activeDocument;
var white = new SolidColor(); white.rgb.red = 255; white.rgb.green = 255; white.rgb.blue = 255;
var black = new SolidColor(); black.rgb.red = 0; black.rgb.green = 0; black.rgb.blue = 0;
doc.backgroundColor= black;
var currentFile = 0;


//Selections
var selectionBounds = [[0,0], [0,1], [1,1], [1, 0]];

//For each row.
recursiveGeneratePattern(1, 5);


function recursiveGeneratePattern(row, maxRow){
    for(var a = 0; a < availablePatterns.length; a++)
    {
        drawPattern(a, row);
        if(row == maxRow) {
                //export as png.
                var opts = new ExportOptionsSaveForWeb();

                opts.PNG8 = false;
                opts.transparency = false;
                opts.interlaced = false;
                opts.quality = 100;
                opts.includeProfile = false;
                opts.format = SaveDocumentType.PNG; // Document Type
                doc.exportDocument( new File( doc.path + "/" + currentFile + ".png"),  ExportType.SAVEFORWEB, opts ); 
                currentFile++;
        } else {
                recursiveGeneratePattern(row+1, maxRow);
         }
    }
}

function drawPattern(patternID, row){
        for(var i = 1; i<6; i++)
        {
            selectionBounds[0] = [i,row];
            selectionBounds[1] = [i+1, row];
            selectionBounds[2] = [i, row+1];
            selectionBounds[3] = [i+1, row+1];
            
            doc.selection.select(selectionBounds, SelectionType.REPLACE, 0, false);
            if(availablePatterns[patternID][i - 1] == 1){
                doc.selection.fill(white);
             } else {
                    doc.selection.fill(black);
             }
            doc.selection.deselect();
        }
}