/*
No arrays.
The artist isn't building the page, they're adding things to the page and positioning them.
They're filling in the blanks.

Try to remove weird syntax whenever possible.
This is their interface for reacting with you, and it encourages communication.
Minimize the amount that's required to learn.
*/



/*
Some reminders:
----------------------------------------------------------------------
Screen resolution: 1920x1080,
How information should look, depending on what's being included  - 
"informationName": ["someText", 20]
----------------------------------------------------------------------
Adding an image: [path_to_image, xPosition, yPosition, width, height]
Adding an animation: ***NOT YET SUPPORTED***
----------------------------------------------------------------------
*/
var data = {
	//This is the background image for the app.
	//url, xPosition, yPosition, width, height
	"background": ["images/test.png", 0, 0, 1920, 1080],

	//This should have the way you want the background to animate.
	//sprite, xStart, yStart, xEnd, yEnd, time(in seconds)
	"backgroundAnimation":["background", 0, 0, 30, 30, .15],

	//This is the number of sparkles that come out of the button.
	"myVariable": [15],
};































/*


var data= {


	//HEADS
	//--------------------------------------------------
	"myFirstHead": ["images/test.png", 0, 0, 10, 10],
	"mySecondHead": ["images/test.png", 0, 0, 10, 10],
	"myThirdHead": ["images/test.png", 0, 0, 10, 10],
	"myFourthHead": [undefined],

	//Add additional heads here.
	//--------------------------------------------------


	//All of the character parts.
	"heads": ["myFirstHead", "mySecondHead", "myThirdHead"],
	"hair": [],
	""
}

*/
