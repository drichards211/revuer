`<label for="viewed">When did you watch it?</label>
          <input type="date" name="viewed" id="viewed" required/>
        <br><br>`

        router.get('/', jwtAuth, jsonParser, (req, res) => {
          console.log(req.user) // logs to the server console
          Movie.find({user_id: "5c8f1eaf8ee08b28e8695b4c"})
            .then(foundMovies => {
              res.json(foundMovies)
            })


// Movie.find({userName: "7aausvdgvjhads"}).populate({path: 'userName'})