# revuer
Every movie you've ever watched, visualized for quick review.

Databases and spreadsheets can be dull: Revuer creates a virtual theater inside your web browser, visualizing a movie database with real-world objects. Ratings and reviews are represented by a newspaper rendered entirely in CSS. Movie titles are displayed by a lighted theater marquee. Colorful tickets are used for admission, (signing-in or signing-up).

***Please note, Revuer is still under development! Some functionality and styling is missing.

Please don your hard-hats and check out the live version [here:](https://revuer.herokuapp.com/)

Features to be added are listed below, along with required bugfixes and styling notes.

Features Under Development:
  * [ ] Add 'Cancel' button to addMovieDetails().
  * [ ] Create 'Manage Account' function: Allow user's to change username, change password, add full name (if desired), and delete account.
  * [ ] Add 'Are you sure?' prompt when deleting a movie.
  
Upcoming Features:
  
Accessibility (a11y):
  * [ ] Entire page needs to be re-checked for a11y, (ARIA tags, full keyboard control, etc.).
  * [ ] Needs to be tested with screenreader (NVDA) and optimized if necessary.
 
Styling:
  * [ ] Add blank poster if movie poster is unavailable.
  * [ ] Add CSS Grid layout to movie results pages, 3 columns maximum.
  * [ ] Import finalized movie-canister image for addMovie() page.
  * [ ] Allow image to rotate 90 degrees clockwise on phone portrait mode.
  * [ ] Create a CSS 'label' (to contain search form) centered on aforementioned movie-canister image.
  * [ ] Style the 'Yes' and 'No' buttons.
  * [ ] Style the 'sign-up' and 'log-in' forms.
  * [ ] Reduce the size of chairs on phone landscape mode.
    
Housekeeping:
     
Troubleshooting:
  * [ ] '#movie-not-here' button doesn't work on renderMoreApiResults().
  * [ ] Android soft-keyboard should be auto-hidden when the search-form is submitted.
  * [ ] '.video-screen' width needs to be reduced slightly on iPad landscape mode.
  * [ ] 'Movie edit screen' persists under some circumstances.
  * [ ] Fix layout if library is empty.
  
