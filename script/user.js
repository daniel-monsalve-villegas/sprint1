let form = document.getElementById('survey');
let url = 'http://localhost:4000/usuarios/';
let search = document.getElementById('search-user');
let edit = document.getElementById('edit');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let name = document.getElementById('input-name').value;
  let lastName = document.getElementById('input-lastname').value;
  let email = document.getElementById('input-email').value;
  let password = document.getElementById('input-password').value;

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name,
      lastName,
      email,
      password
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  })
});


search.addEventListener('click', async() => {
  let email_capt = document.getElementById('input-email').value;
  document.getElementById('input-email').readOnly = true;

  let answer = await fetch(url);
  let data = await answer.json();

  let modify = data.find(usuario => usuario.email === email_capt);

  const {id, name, lastName, email, password} = modify;
  document.getElementById('input-name').value = name;
  document.getElementById('input-lastname').value = lastName;
  document.getElementById('input-email').value = email;
  document.getElementById('input-password').value = password;
  document.getElementById('id').value = id;
});


edit.addEventListener('click', async() => {

  let name = document.getElementById('input-name').value;
  let lastName = document.getElementById('input-lastname').value;
  let email = document.getElementById('input-email').value;
  let password = document.getElementById('input-password').value;
  let id = document.getElementById('id').value;

  await fetch(url + id, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      lastName,
      email,
      password
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  });
});
