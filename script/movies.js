let form = document.getElementById('survey');
let url = 'http://localhost:4001/movies/';
let search = document.getElementById('search-movie');
let edit = document.getElementById('edit');
let deleteMovie = document.getElementById('delete');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = document.getElementById('input-title').value;
  let genre = document.getElementById('input-genre').value;
  let date = document.getElementById('input-date').value;
  let duration = document.getElementById('input-duration').value;
  let overview = document.getElementById('input-overview').value;
  let id = document.getElementById('id').value;

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title,
      genre,
      date,
      duration,
      overview,
      id
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  })
});


search.addEventListener('click', async() => {
  let title_capt = document.getElementById('input-title').value;
  document.getElementById('input-title').readOnly = true;

  let answer = await fetch(url);
  let data = await answer.json();

  let modify = data.find(movie => movie.title === title_capt);

  const {id, title, genre, date, duration, overview} = modify;
  document.getElementById('input-title').value = title;
  document.getElementById('input-genre').value = genre;
  document.getElementById('input-date').value = date;
  document.getElementById('input-duration').value = duration;
  document.getElementById('input-overview').value = overview;
  document.getElementById('id').value = id;
});


edit.addEventListener('click', async() => {

  let title = document.getElementById('input-title').value;
  let genre = document.getElementById('input-genre').value;
  let date = document.getElementById('input-date').value;
  let duration = document.getElementById('input-duration').value;
  let overview = document.getElementById('input-overview').value;
  let id = document.getElementById('id').value;

  await fetch(url + id, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      genre,
      date,
      duration,
      overview
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  });
});

deleteMovie.addEventListener('click', () => {
  let titleModify = document.getElementById('input-title').value;
  fetch(url + titleModify, {
    method: 'DELETE'
  })
});
