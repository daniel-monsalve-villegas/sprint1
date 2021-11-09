const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=3fd2be6f0c70a2a598f084ddfb75487c";
const IMG_PATH = `https://image.tmdb.org/t/p/w500/`;
const SEARCH_URL =
  'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=3fd2be6f0c70a2a598f084ddfb75487c";

const searcher = document.getElementById("searcher");
const search = document.getElementById("search");
const movies = document.querySelector(".movies");

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
      overview,
      release_date,
      genre_ids,
      runtime,
      id
    } = movie;

    const movieElem = document.createElement("div");
    movieElem.classList.add("movie");

    movieElem.innerHTML = `
        <img src="${IMG_PATH + poster_path}" id="${id}" alt="">
        <span class="${getClassByRate(vote_average)}"><i class="fas fa-star"></i>${vote_average}</span>
    </div>
    <div class="overview">
        <h3>overview</h3>
        ${overview}
        <br/>
        <button class="trailer" movie-id="${id}">Trailer</button>
    </div>
  `;
    movies.appendChild(movieElem);

    document.getElementById(id).addEventListener('click', () => {
      console.log(id);
        openPlayer(movie);
      });
    })
}

const video = document.getElementById('content-video');

function openPlayer(movie) {
  let id = movie.id;
  fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY).then(res => res.json())
    .then(videoData => {
      console.log(videoData);
      if (videoData) {
        document.getElementById('view-trailer').style.width = "100%";
        if (videoData.results.length > 0) {
          let embed = [];
          videoData.results.forEach(video => {
            let {
              name,
              key,
              site
            } = video

            if (site == 'YouTube') {
              embed.push(`
            <iframe width="1024" height="768"
            src="https://www.youtube.com/embed/${key}" title="${name}" class="embed"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
            `)
            }
          })
          video.innerHTML = embed.join('');
          activeSlide = 0;
          showVideos();
        } else {
          video.innerHTML = `<h2>Sin resultados</h2>`
        }
      }
    });
}

function closePlayer() {
  let player = document.getElementById('view-trailer');
  player.style.width = '0%';
  player.innerHTML = `<iframe></iframe>`;
}

let activeSlide = 0;

function showVideos() {
  let embedClasses = document.querySelectorAll('.embed');
  embedClasses.forEach((embedTag, idx) => {
    if (activeSlide == idx) {
      embedTag.classList.add('show');
      embedTag.classList.remove('hide');
    } else {
      embedTag.classList.add('hide');
      embedTag.classList.remove('show');
    }
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
  search.value = '';
});


getMovies(API_URL);
