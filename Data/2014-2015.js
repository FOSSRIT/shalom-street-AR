jsonLoader.result = {

	"title" : "Judaism and the History of Play",

	//Inside of sections, we store all of the sections of content for this year.
	//Do not change this name.
	"sections" : {

		//The name of a section can be anything you like.
		//Sections mark divisions within the content viewer
		"mySection" : {
			
			//Do not change this name.
			"unlockables": {

				//The name of an unlockable can be anything you like.
				"myUnlockable1": {
					//The ID of the trigger that unlocks this content.
					"id": 0,
					//The URL of the HTML page or section it unlocks.
					"url": "Data/2014-2015/myContent.html",
				},

				"myUnlockable2": {
					"id": 1,
					"url": "Data/2014-2015/myContent.html",
				}
			},
		},

		//Add more of your sections here...
	},

};

jsonLoader.onresult();

