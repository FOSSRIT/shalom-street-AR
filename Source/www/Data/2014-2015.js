jsonLoader.result = {

	"title" : "Judaism and the History of Play",

	//Inside of sections, we store all of the sections of content for this year.
	//Do not change this name.
	"sections" : {

		//The name of a section can be anything you like.
		//Sections mark divisions within the content viewer
		"Construction" : {
			
			//Do not change this name.
			"unlockables": {

				//The name of an unlockable can be anything you like.
				"Unlock 1": {
					//The ID of the trigger that unlocks this content.
					"id": 0,
					//The URL of the HTML page or section it unlocks.
					"url": "Data/2014-2015/Cave_of_Maccabbees.html",
				},

				"Unlock 2": {
					"id": 1,
					"url": "Data/2014-2015/myContent2.html",
				},
			},
		},

		//Add more of your sections here...

		"The Cave of Maccabees": {
			"unlockables": {
				"UnlockMe": {
					"id": 9,
					"url": "Data/2014-2015/Cave_of_Maccabbees.html",
				},
			},
		},
	},

};

jsonLoader.onresult();

