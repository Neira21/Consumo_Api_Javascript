const usuario = document.querySelector(".container")
const getUrl = new URLSearchParams(window.location.search)
id = getUrl.get('id');


fetch("https://jsonplaceholder.typicode.com/users/"+id)
.then(res => res.json())
.then(data => {
        const name = document.createElement('p')
        name.innerHTML = data.name
        const email = document.createElement('p')
        email.innerHTML = data.email
        usuario.appendChild(name);
        usuario.appendChild(email);
})
.catch(error => console.log(error));