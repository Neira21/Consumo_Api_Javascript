// const contenedor = document.getElementById("container");
// const consumoApi = () => {
//     const url = "https://jsonplaceholder.typicode.com/users";
//     fetch(url)
//     .then(response => response.json())
//     .then(res =>  {
//         res.forEach(user => {
//             const {id, name, email, phone, website} = user;
//             const div = document.createElement("div");
//             div.innerHTML = `
//             <p>${id}</p>
//             <p>${name}</p>
//             <p>${email}</p>
//             <p>${phone}</p>
//             <p>${website}</p>
//             `;
//             contenedor.appendChild(div);
//         })
//     });
// }
// consumoApi();

// Github de API gratuitas
// https://github.com/public-apis/public-apis

//d7e5c5bd-fbb0-494a-8e0c-4cadf28397d0

/*querystring = [
    '?',
    'limit=3',
    '&order=Desc',
].join('');

const URL = `https://api.thecatapi.com/v1/images/search${querystring}`;
*/

let API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=2" 
let API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites" 
let API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}` 

const spanError = document.getElementById("error");

async function LoadRandomDogs(){
    const rest = await fetch(API_URL_RANDOM,{
        method: "GET",
        headers: {
            'X-API-KEY': 'd7e5c5bd-fbb0-494a-8e0c-4cadf28397d0',
        }
    });
    const data = await rest.json();
    console.log("Data de perros aleatorios: ");
    console.log(data);
    if(rest.status !== 200){
        spanError.innerHTML = "Hubo un error: "+ rest.status;
    }else{
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')
        btn1.onclick = () => saveFavoriteDog(data[0].id);
        btn2.onclick = () => saveFavoriteDog(data[1].id);
        //const img3 = document.getElementById('img3')
        img1.src = data[0].url;
        img2.src = data[1].url;
        //img3.src = data[2].url;       
    }
}

async function LoadFavoritesDogs(){
    const rest = await fetch(API_URL_FAVORITES, {
        method: "GET",
        headers: {
            'X-API-KEY': 'd7e5c5bd-fbb0-494a-8e0c-4cadf28397d0',
        }
    });
    const data = await rest.json();
    console.log("Data de perros favoritos: ");
    console.log(data);
    if(rest.status !== 200){
        spanError.innerHTML = "Hubo un error: "+ rest.status + " "+ data.message;
    }else{
        const section = document.getElementById("favoritesDogs");
        section.innerHTML = "";
        const h2 = document.createElement("h2");
        const h2Text = document.createTextNode("Perros favoritos");
        h2.appendChild(h2Text);
        section.appendChild(h2);
        data.forEach(element => {
            
            const article = document.createElement("article");
            const imagen = document.createElement("img");
            const btn = document.createElement("button");
            const btnText = document .createTextNode('Sacar la Imagen en favoritos')
            
            btn.appendChild(btnText);
            if(element.image.url){
                imagen.src=element.image.url;
                imagen.width="250";
            }
            btn.onclick = () => DeleteFavoriteDog(element.id);
            article.appendChild(imagen);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavoriteDog(id){
    const rest = await fetch(API_URL_FAVORITES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-API-KEY': 'd7e5c5bd-fbb0-494a-8e0c-4cadf28397d0',
        },
        body: JSON.stringify({
            image_id:id
        })
    })
    const data = await rest.json();
    console.log("Save favorite dog: ");
    console.log(rest);
    if(rest.status !== 200){
        spanError.innerHTML = "Hubo un error: "+ rest.status + " "+ data.message;
    }else{
        console.log("Perro guardado en favoritos");
        LoadFavoritesDogs();
        LoadRandomDogs();
    }
}

async function DeleteFavoriteDog(id){
    const rest = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: "DELETE",
        headers: {
            'X-API-KEY': 'd7e5c5bd-fbb0-494a-8e0c-4cadf28397d0',
        }
        
    })
    const data = await rest.json();
    if(rest.status !== 200){
        spanError.innerHTML = "Hubo un error: "+ rest.status + " "+ data.message;
    }else{
        console.log("Perro eliminado de favoritos");
        LoadFavoritesDogs();
    }
}

LoadRandomDogs();
LoadFavoritesDogs();