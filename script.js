document.getElementById("searchMovie").addEventListener("click", () => {
  const title = document.getElementById("movieInput").value;
  fetchMovieData(title);
});

async function fetchMovieData(title) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?t=${title}&apikey=423283ca`
    );

    const data = await response.json();
    console.log("Parsed data:", data);

    displayMovieData(data);
  } catch (error) {
    console.error("Error occurred while fetching movie details", error);
    document.getElementById(
      "movieInfo"
    ).innerHTML = `<p>Error fetching movie data: ${error.message}</p>`;
  }
}

function displayMovieData(data) {
  if (data.Response === "False") {
    document.getElementById("movieInfo").innerHTML = `<p>${data.Error}</p>`;
    return;
  }

  const { Title, Year, Genre, Director, Plot, Poster } = data;
  const movieInfo = `
        <main>
      <h2 class="movie-title">${Title} (${Year})</h2>
      <div class="movie"><div class="poster" >
        <img class="column" src="${Poster}" alt="Poster of ${Title}">
      </div>
      <div class="movie-info">
        <p><strong>Genre:</strong> ${Genre}</p>
        <p><strong>Director:</strong> ${Director}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
        <p><strong>Year:</strong> ${Year}</p>
      </div></div>
    </div>
    `;
  document.getElementById("movieInfo").innerHTML = movieInfo;
}
