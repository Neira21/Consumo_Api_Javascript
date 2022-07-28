const users = async () => {
    const api = await fetch("https://randomuser.me/api/?results=5");
    const usuarios = await api.json();
    userslist(usuarios)    
}

const userslist = usuarios =>{
    console.log(usuarios.results)
    let div = '';
    usuarios.results.map(user => {
        div += `
        <li> <strong>Nombre: </strong> ${user.name.first} <strong>Apellido: </strong> ${user.name.last} </li>
        `
    })

    document.getElementById("users").innerHTML = div;
}


users()




