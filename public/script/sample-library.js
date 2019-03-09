const previewLibrary = [
  {
    "title": "Ghostbusters",
    "viewed": "1988-01-19",
    "rating": "thumbsUp",
    "ownCopy": true,
    "format": ["Bluray", "LD"], 
    "viewingNotes": "A comedy classic. They don't make them like this anymore. Acting is somehow irreverant and believable at the same time; a true feat.",
    "userName": "guest",
    "author": { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    "created"
  },
  {
    "title": "Star Trek II",
    "viewed": "1990-06-27",
    "rating": "thumbsUp",
    "ownCopy": [true, 
      {
       "format": ["Blu-ray"]
      }
    ],
    "viewingNotes": "Showed this to a couple of friends recently. They were astonished by how good the writing was... used to the lower-standards of more modern blockbusters. The film, visually, has started to show its age: the computer displays are bulky and the physical control switches betray the otherwise futuristic setting. The exterior ship scenes, however, look better than nearly anything in theatres today. The physical models were beautifully photographed, and you can sense their size and mass on-screen. It's breathtaking. So much tension captured during the cat-and-mouse segment in the nebula, without resorting to the non-stop, frenetic action of more modern films. This should be required viewing by present-day film students.",
    "userName": "guest"
  },
  {
    "title": "Waking Ned Devine",
    "viewed": "2001-04-16",
    "rating": "complicated",
    "ownCopy": [false],
    "viewingNotes": "Watched this at my best friend's house on DVD. 60\" Mitsubishi projection TV. Entertaining overall, with lots of surpising, funny moments. The end, particularly, had a big pay-off. Pacing is slow, and there are some dull moments. Upon second viewinga year later, it isn't as funny knowing how the film is going to end. I wouldn't purchase this movie to own, but I might watch it again sometime when I've forgotten more of the jokes and plot.",
    "userName": "guest"
  },
  {
    "title": "The Lion King",
    "viewed": "1996-05-21",
    "rating": "thumbsUp",
    "ownCopy": [true,
      {
        "format": ["DVD", "Blu-ray"]
      }
    ],
    "viewingNotes": "Very good animated offering at the end of the golden era of Disney animation, shortly before they transitioned to all-computer art. Majestic, visually, from beginning to end with an excellent soundscape by Hans Zimmer.",
    "userName": "guest"
  },
  {
    "title": "Cloud Atlas",
    "viewed": "2018-08-29",
    "rating": "thumbsDown",
    "ownCopy": [false],
    "viewingNotes": "I'm certain someone thought this would be a good idea for a movie. But, in the end, I just didn't care about the characters.",
    "userName": "guest"
  },
  {
    "title": "The Martian",
    "viewed": "2017-10-19",
    "rating": "thumbsUp",
    "ownCopy": [false],
    "viewingNotes": "Watched this on an airplane flight. Fun from start to finish. My only nitpick is the \"rocketman\" scene near the end of the movie. Completely unrealistic, obviously added by the filmmaker to make the end more exciting, but all it does is make the more intelligent members of the audience groan inwardly.",
    "userName": "guest"
  },
]
