const API_URL =
  'https://api.themoviedb.org/3/movie/top_rated?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = `https://image.tmdb.org/t/p/w500/`;
const SEARCH_URL =
  'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

/*MOVIES*/
const searcher = document.getElementById("searcher");
const search = document.getElementById("search");
const movies = document.getElementById("movies");

async function getMovies(url) {
  try {
    const peticion = await fetch(url);
    const pelicula = await peticion.json();
    const data = pelicula.results;
    console.log(data);
    showMovies(data);
  } catch (error) {
    console.log(error);
  }
}

function showMovies(movie) {
  movies.innerHTML = '';
  movie.forEach(movie => {
    const {
      title,
      poster_path,
      vote_average,
      overview
    } = movie;

    const movieElem = document.createElement("div");
    movieElem.classList.add("movie");

    movieElem.innerHTML = `
          <img src="${IMG_PATH + poster_path}" alt="">
          <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
              <h3>overview</h3>
              ${overview}
          </div>
    `;
    movies.appendChild(movieElem);
  });
}

function getClassByRate(vote) {
  if (vote >= 8.0) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

searcher.addEventListener('submit', e => {
  e.preventDefault()
  const searchTerm = search.value

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_URL + searchTerm)
  } else {
    window.location.reload()
  }
});

getMovies(API_URL);
