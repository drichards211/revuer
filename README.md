# revuer

![Screenshots of revuer](public/images/revuer-responsive-11-cropped-tight.jpg)  

Can't keep track of which movies you've seen? Revuer easily tracks every movie you've ever watched. Add ratings, reviews, and unlimited notes.

> A live version of the app is located here: [https://revuer.herokuapp.com/](https://revuer.herokuapp.com/)

Databases and spreadsheets can be dull: Revuer creates a virtual theater, visualizing your movie database with real-world objects. The theater becomes interactive: chairs turn into clickable buttons, film canisters become searchable fields, and movies are supplemented by data and images from the Open Movie Database API.

Tech stack includes: *HTML, CSS, ES6, jQuery, Node/Express.js, Passport.js, MongoDB, Mongoose, Mocha/Chai, Travis CI, Heroku, AJAX, Adobe Photoshop, Blender*

Features to be added are listed below, along with required bugfixes and styling notes.

Features Under Development:
  * [ ] Add 'Cancel' button to addMovieDetails().
  * [ ] Create 'Manage Account' function: Allow users to change username, change password, add full name (if desired), and delete account.
  * [ ] Add 'Are you sure?' prompt when deleting a movie.
  * [ ] Add 'sign-out' button to home screen.
  
Upcoming Features:
  * [ ] Add sorting options and multi-page display for viewLibrary().
  * [ ] Allow users to export their database as a spreadsheet or JSON object.
  
Accessibility (a11y):
  * [ ] Entire page needs to be re-checked for a11y, (ARIA tags, full keyboard control, etc.).
  * [ ] Needs to be tested with screenreader (NVDA) and optimized if necessary.
 
Styling:
  * [ ] Add blank poster if movie poster is unavailable.
  * [X] Remove white background from film buttons when newspaper is visible.
  * [ ] Add CSS Grid layout to movie results pages, 3 columns maximum.
  * [X] Import finalized movie-canister image for addMovie() page.
  * [X] Allow canister image to rotate 90 degrees clockwise on phone portrait mode.
        -- No longer necessary. Image is now symmetrical.
  * [X] Center and resize the movie search form onto the aforementioned movie-canister image.
  * [X] Prepare high-resolution background 'theater' image from Blender object and replace low-res placeholder.
  * [ ] Style the 'Yes' and 'No' buttons.
  * [X] Style the 'sign-up' and 'log-in' forms.
  * [X] Enhance the styling of 'sign-up' and 'log-in' forms, paying special attention to authentication error messages.
  * [ ] Reduce the size of chairs on phone landscape mode.
  * [ ] Update movie poster displays with "Now Showing" frame.
  
    
Housekeeping:
  * [ ] Add tests to remaining server endpoints. (User auth is already good).
  * [ ] Shrink all images to web size using tinypng or similar.
     
Troubleshooting:
  * [ ] In the movie search textarea, trigger the submit button when the user presses Enter.
  * [X] Chairs don't always center correctly on initial page load in Chrome if devTools turned off.
  * [ ] '#movie-not-here' button doesn't work on renderMoreApiResults().
  * [ ] Android soft-keyboard should be auto-hidden when the search-form is submitted.
  * [X] '.video-screen' width needs to be reduced slightly on iPad landscape mode.
  * [ ] 'Movie edit screen' persists under some circumstances.
  * [ ] Fix layout if library is empty.
  * [ ] 'Movie edit screen' persists after successfully deleting a movie. Are the containers being emptied?
  
