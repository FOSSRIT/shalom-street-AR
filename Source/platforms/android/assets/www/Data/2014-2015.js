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
				"Maccabean Revolt": {
					"id": 10,
					"url":"Data/2014-2015/Maccabean_Revolt.html",
				},
			},
		},
		"Driedal": {
			"unlockables": {
				"Driedal History": {
					"id": 11,
					"url": "Data/2014-2015/The Origin Of The Driedal.html",
				},
			},
		},
		"Jewish Year": {
			"unlockables": {
				"Jewish Calendar": {
					"id": 12,
					"url": "Data/2014-2015/Jewish Calendar.html",
				},
			},
		},
		"Gematria": {
			"unlockables": {
				"The Basics of Gematria": {
					"id": 13,
					"url": "Data/2014-2015/Gematria PDF.html",
				},
				"Gematria Information": {
					"id": 14,
					"url": "Data/2014-2015/Gematria Info.html",
				},
			},
		},
		"Jewish Artists": {
			"unlockables": {
				"Chagall": {
					"id": 15,
					"url": "Data/2014-2015/Chagall.html",
				},
			},
		},
		"Kosher": {
			"unlockables": {
				"Blessings": {
					"id": 16,
					"url": "Data/2014-2015/Blessings.html",
				},
				"Kashrut": {
					"id": 17,
					"url": "Data/2014-2015/Kashrut.html",
				},
			},
		},
		"Comic Books": {
			"unlockables": {
				"Comics": {
					"id": 18,
					"url": "Data/2014-2015/Comics.html",
				},
			},
		},
		"Video Games": {
			"unlockables": {
				"Ralph Baer": {
					"id": 19,
					"url": "Data/2014-2015/Ralph Baer.html",
				},
			},
		},
		"Shtender": {
			"unlockables": {
				"Shtender": {
					"id": 20,
					"url": "Data/2014-2015/Shtender.html",
				},
			},
		},
	},

};

jsonLoader.onresult();

