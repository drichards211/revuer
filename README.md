# revuer
Can't keep track of which movies you've seen? Revuer easily tracks every movie you've ever watched. Add ratings, reviews, and unlimited notes.

Databases and spreadsheets can be dull: Revuer creates a virtual theater, visualizing your movie database with real-world objects. The theater becomes interactive: chairs turn into clickable buttons, film canisters become searchable fields, and movies are supplemented by data and images from the Open Movie Database API.


***Please note, Revuer is still under development! Some functionality and styling is missing.

Please don your hard-hats and check out the live version [here:](https://revuer.herokuapp.com/)

Features to be added are listed below, along with required bugfixes and styling notes.

Features Under Development:
  * [ ] Add 'Cancel' button to addMovieDetails().
  * [ ] Create 'Manage Account' function: Allow user's to change username, change password, add full name (if desired), and delete account.
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
  * [ ] Remove white background from film buttons when newspaper is visible.
  * [ ] Add CSS Grid layout to movie results pages, 3 columns maximum.
  * [ ] Import finalized movie-canister image for addMovie() page.
  * [ ] Allow image to rotate 90 degrees clockwise on phone portrait mode.
  * [ ] Create a CSS 'label' (to contain search form) centered on aforementioned movie-canister image.
  * [ ] Prepare high-resolution background 'theater' image from Blender object and replace low-res placeholder.
  * [ ] Style the 'Yes' and 'No' buttons.
  * [ ] Style the 'sign-up' and 'log-in' forms.
  * [ ] Reduce the size of chairs on phone landscape mode.
  * [ ] Update movie poster displays with "Now Showing" frame.
  
    
Housekeeping:
  * [ ] Add tests to remaining server endpoints. (User auth is already good).
     
Troubleshooting:
  * [ ] Chairs don't always center correctly on initial page load in Chrome if devTools turned off.
  * [ ] '#movie-not-here' button doesn't work on renderMoreApiResults().
  * [ ] Android soft-keyboard should be auto-hidden when the search-form is submitted.
  * [ ] '.video-screen' width needs to be reduced slightly on iPad landscape mode.
  * [ ] 'Movie edit screen' persists under some circumstances.
  * [ ] Fix layout if library is empty.
  
