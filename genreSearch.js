document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the form from submitting

    // Get the selected genre value
    let genreID = document.getElementById("genre").value;

    // Show loading spinner
    document.getElementById("loading").style.display = 'block';

    // Fetch movies from TMDB API based on the selected genre
    let res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=YOUR_TMDB_API_KEY&with_genres=${genreID}`);
    let data = await res.json();

    // Hide loading spinner
    document.getElementById("loading").style.display = 'none';

    if (data.results.length > 0) {
        // Clear the previous movie cards
        let container = document.getElementById("container");
        container.innerHTML = '';

        // Loop through the results and create movie cards
        data.results.forEach(movie => {
            let movieCard = document.createElement("div");
            movieCard.className = "movie-card";

            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>Release Date: ${movie.release_date}</p>
            `;

            // Add click event to open movie details page in a new tab
            movieCard.onclick = () => {
                localStorage.setItem("selectedMovie", JSON.stringify(movie));
                window.open('movieDetails.html', '_blank');
            };

            // Append movie card to the container
            container.append(movieCard);
        });
    } else {
        alert("No movies found for the selected genre.");
    }
});
