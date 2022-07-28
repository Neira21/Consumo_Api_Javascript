const aplicacion = document.getElementById("container");

const url = "https://jsonplaceholder.typicode.com/users";

fetch(url)
.then(response => response.json())
.then(data => {
    data.forEach(usuario => {
        const p = document.createElement('p')
        p.setAttribute('id', usuario.id)
        p.innerHTML = usuario.name
        p.addEventListener("click", function(){
            window.location.href = `./usuario.html?id=${usuario.id}`
        })
        aplicacion.appendChild(p)    
    });
})
.catch(error => console.log(error));
