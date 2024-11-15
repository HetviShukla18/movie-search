async function movieSearch() {
    try {
        let movie_name = document.getElementById("name").value;

        if (movie_name.trim() === "") {
            alert("Please enter a movie name");
            return;
        }

        let res = await fetch(`https://www.omdbapi.com/?t=${movie_name}&apikey=cf72acbd`);
        let data = await res.json();

        if (data.Response != 'False') {
            // Store the movie data in localStorage
            localStorage.setItem("selectedMovie", JSON.stringify(data));

            // Open the new page with movie details in a new tab
            window.open('moviedetails.html', '_blank');
        } else {
            alert("Movie not found!");
        }
    } catch (error) {
        console.error("Error fetching movie:", error);
        alert("There was an error fetching the movie. Please try again later.");
    }
}

// Function to handle suggestions as the user types
async function showSuggestions() {
    let movie_name = document.getElementById("name").value;

    if (movie_name.length > 2) {  // Only fetch if more than 2 characters
        try {
            let res = await fetch(`https://www.omdbapi.com/?s=${movie_name}&apikey=cf72acbd`);
            let data = await res.json();

            const suggestions = document.getElementById("suggestions"); // Get suggestions container

            if (data.Response != 'False') {
                suggestions.innerHTML = '';  // Clear previous suggestions
                data.Search.forEach(movie => {
                    let suggestion = document.createElement("div");
                    suggestion.className = "suggestion";
                    suggestion.innerText = movie.Title;
                    suggestion.onclick = () => {
                        document.getElementById("name").value = movie.Title;
                        suggestions.innerHTML = ""; // Clear suggestions
                        movieSearch(); // Perform the search after setting the value
                    };
                    suggestions.append(suggestion);
                });
            } else {
                suggestions.innerHTML = '<div class="suggestion">No suggestions found</div>';
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            alert("There was an error fetching suggestions. Please try again later.");
        }
    } else {
        document.getElementById("suggestions").innerHTML = ""; // Clear if input is too short
    }
}

// Function to fetch movies by genre
async function fetchMoviesByTitle(searchQuery) {
    try {
        // Fetch movie data based on a title or keyword search
        const res = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=cf72acbd`);
        const data = await res.json();

        if (data.Response !== "False") {
            return data.Search;  // Return the array of movies
        } else {
            alert("No movies found for this search term.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        alert("Error fetching movie data. Please try again later.");
        return [];
    }
}

async function filterMoviesByGenre(movies, selectedGenre) {
    // Filter movies by the selected genre (assuming you get the full movie data, which includes Genre field)
    const filteredMovies = [];

    for (const movie of movies) {
        try {
            // Fetch detailed information for each movie, since the search endpoint doesn't return genre info
            const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=cf72acbd`);
            const movieDetails = await res.json();

            if (movieDetails.Genre.includes(selectedGenre)) {
                filteredMovies.push(movieDetails);
            }
        } catch (error) {
            console.error(`Error fetching details for movie: ${movie.Title}`, error);
        }
    }

    return filteredMovies;
}

async function genreSearch() {
    const genre = document.getElementById("genre").value.trim();
    const searchTerm = document.getElementById("searchTerm").value.trim();

    if (!genre) {
        alert("Please enter a genre.");
        return;
    }

    if (!searchTerm) {
        alert("Please enter a movie search term.");
        return;
    }

    // Fetch movies based on the search term
    const movies = await fetchMoviesByTitle(searchTerm);

    if (movies.length > 0) {
        // Filter the movies by the selected genre
        const filteredMovies = await filterMoviesByGenre(movies, genre);

        // Display the filtered movies
        displayMovies(filteredMovies);
    }
}

// Function to display fetched movies
function displayMovies(movies) {
    const container = document.getElementById('main_div');
    container.innerHTML = '';  // Clear previous results

    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieCard = `
                <div class="movie-card">
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h4>${movie.Title}</h4>
                    <p>Year: ${movie.Year}</p>
                    <p>Genre: ${movie.Genre}</p>
                </div>
            `;
            container.innerHTML += movieCard;
        });
    } else {
        container.innerHTML = `<p>No movies found for the selected genre.</p>`;
    }
}
// Home.js

// Function to check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Function to require login before performing actions
function requireLogin(actionCallback) {
    if (isLoggedIn()) {
        actionCallback();
    } else {
        // Redirect to login page if not logged in
        window.location.href = 'index.html';
    }
}

// Update the search button to require login
document.getElementById('search-button').addEventListener('click', () => {
    requireLogin(movieSearch);
});

// Update the genre buttons to require login
document.querySelectorAll('.genre-button').forEach(button => {
    button.addEventListener('click', () => {
        const genre = button.getAttribute('data-genre');
        requireLogin(() => {
            // Open genre.html in a new tab with genre as a query parameter if logged in
            window.open(`genre.html?genre=${encodeURIComponent(genre)}`, '_blank');
        });
    });
});
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

const top10Movies = [
    { title: "1. The Godfather", poster: "movie1.png", rating: "9.2", trailer: "https://www.youtube.com/watch?v=sY1S34973zA" },
    { title: "2. The Shawshank Redemption", poster: "movie2.png", rating: "9.3", trailer: "https://www.youtube.com/watch?v=6hB3S9bIaco" },
    { title: "3. The Godfather Part II", poster: "movie3.png", rating: "9.0", trailer: "https://www.youtube.com/watch?v=9O1Iy9od7-A" },
    { title: "4. Inception", poster: "movie4.png", rating: "8.8", trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0" },
    { title: "5. Fight Club", poster: "movie5.png", rating: "8.8", trailer: "https://www.youtube.com/watch?v=SUXWAEX2jlg" },
    { title: "6. The Dark Knight", poster: "movie6.png", rating: "9.0", trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY" },
    { title: "7. 12 Angry Men", poster: "movie7.png", rating: "9.0", trailer: "https://www.youtube.com/watch?v=_13J_9B5jEk" },
    { title: "8. The Lord of the Rings: The Fellowship of the Ring", poster: "movie8.png", rating: "8.9", trailer: "https://www.youtube.com/watch?v=V75dMMIW2B4" },
    { title: "9. The Matrix", poster: "movie9.png", rating: "8.7", trailer: "https://www.youtube.com/watch?v=vKQi3bBA1y8" },
    { title: "10. Se7en", poster: "movie10.png", rating: "8.6", trailer: "https://www.youtube.com/watch?v=znmZoVkCjpI" }
];

let startIndex = 0;
const visibleMovies = 3; // Number of movies visible at a time

// Function to populate Top 10 Movies and display only the first 3
function populateTop10Movies() {
    const slider = document.getElementById("movie-slider");
    slider.innerHTML = ""; // Clear any previous content

    for (let i = startIndex; i < startIndex + visibleMovies; i++) {
        const movie = top10Movies[i % top10Movies.length]; // Loop back if at the end
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-item");
        movieDiv.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-rating">⭐ ${movie.rating}</div>
            <div class="button-container">
                <button onclick="window.open('${movie.trailer}', '_blank')">Trailer</button>
            </div>
        `;
        slider.appendChild(movieDiv);
    }
}

// Function to move the slide left or right
function moveSlide(direction) {
    startIndex += direction;
    if (startIndex < 0) startIndex = top10Movies.length - visibleMovies; // Loop back to the end
    if (startIndex >= top10Movies.length) startIndex = 0; // Loop back to the start
    populateTop10Movies();
}

// Initial population of the movies
populateTop10Movies();
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Function to show the login form
    function showLoginForm() {
        const loginForm = document.getElementById('loginForm'); // Your login form element
        if (loginForm) {
            loginForm.style.display = 'block';
        } else {
            console.error('Login form element not found.');
        }
    }

    // Function to handle login
    function handleLogin() {
        const username = document.getElementById('username')?.value;
        const password = document.getElementById('password')?.value;

        // Basic example validation (replace with your backend/auth logic)
        if (username === 'user' && password === 'pass') { // Placeholder check
            localStorage.setItem('isLoggedIn', 'true'); // Set logged-in flag
            sessionStorage.setItem('hasRedirected', 'true'); // Set session redirect flag

            // Redirect to the register page after 10 seconds
            setTimeout(() => {
                window.location.href = 'register.html';
            }, 10000);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    }

    // Function to handle logout
    function logout() {
        localStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('hasRedirected');
        window.location.href = 'login.html'; // Redirect to login page
    }

    // Main logic to check login status
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const hasRedirected = sessionStorage.getItem('hasRedirected');

    if (!isLoggedIn) {
        // Show login form if the user is not logged in
        showLoginForm();

        // Attach event listener to login button
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', handleLogin);
        } else {
            console.error('Login button element not found.');
        }
    } else if (!hasRedirected) {
        // If user is logged in but not redirected in this session
        sessionStorage.setItem('hasRedirected', 'true');

        // Redirect to the register page after 10 seconds
        setTimeout(() => {
            window.location.href = 'register.html';
        }, 10000);
    }
});


function login() {
    // Assume some login logic here, e.g., verifying username and password
    const isLoginSuccessful = true; // Replace this with actual login check

    if (isLoginSuccessful) {
        // Set the logged-in status
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to the homepage after successful login
        window.location.href = 'homepage.html';
    } else {
        alert('Login failed. Please try again.');
    }
}
