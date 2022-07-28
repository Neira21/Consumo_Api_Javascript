const container = document.querySelector('.container');
const getUrl = new URLSearchParams(window.location.search);
id = getUrl.get('id');

console.log(id)

fetch("https://jsonplaceholder.typicode.com/comments/"+id)
.then(res => res.json())    
.then(data => {
    const name = document.createElement('p')
    name.innerHTML = data.name
    const email = document.createElement('p')
    email.innerHTML = data.email
    const body = document.createElement('p')
    body.innerHTML = data.body
    container.appendChild(name);
    container.appendChild(email);
    container.appendChild(body);
    }
)



//http://127.0.0.1:5500/Javascript/API2/comment.html?id=1
//http://127.0.0.1:5500/Javascript/API2/comment.html