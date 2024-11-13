const genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
};

export default genreids;
import genreids from './genreids.js';

// Function to populate genres in the dropdown
function populateGenres() {
    let genreSelect = document.getElementById("genre");

    // Clear any existing options (if necessary)
    genreSelect.innerHTML = '';

    // Add genres dynamically
    Object.keys(genreids).forEach(id => {
        let option = document.createElement("option");
        option.value = id; // Genre ID
        option.text = genreids[id]; // Genre Name
        genreSelect.appendChild(option);
    });
}

// Call this function to populate the genres on page load
window.onload = populateGenres;

// Search movies by title
async function movieSearch() {
    let movie_name = document.getElementById("name").value;

    if (movie_name.trim() === "") {
        alert("Please enter a movie name");
        return;
    }

    let res = await fetch(`http://www.omdbapi.com/?t=${movie_name}&apikey=cf72acbd`);
    let data = await res.json();

    if (data.Response != 'False') {
        localStorage.setItem("selectedMovie", JSON.stringify(data));
        window.open('movieDetails.html', '_blank');
    } else {
        alert("Movie not found!");
    }
}
