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

// const api = axios.create({
//     baseURL: 'https://api.thecatapi.com/v1',
// });
// api.defaults.headers.common['X-API-KEY'] = 'd7e5c5bd-fbb0-494a-8e0c-4cadf28397d0';



let API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=3" 
let API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites" 
let API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`
let API_URL_UPLOADIMAGE = "https://api.thedogapi.com/v1/images/upload"

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
        const img3 = document.getElementById('img3')
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')
        const btn3 = document.getElementById('btn3')
        btn1.onclick = () => saveFavoriteDog(data[0].id);
        btn2.onclick = () => saveFavoriteDog(data[1].id);
        btn3.onclick = () => saveFavoriteDog(data[2].id);
        //const img3 = document.getElementById('img3')
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
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
        data.forEach(element => {
            
            const article = document.createElement("article");
            const imagen = document.createElement("img");
            const btn = document.createElement("button");
            const btnText = document .createTextNode('Eliminar')
            
            article.className ="item-favorites-dogs";
            btn.className = "btn-favorites-dogs";

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
    
    // const {data, status} = await api.post('/favourites',{
    //     image_id:id,
    // });

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

async function uploadPhotoPerro(){
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const rest = await fetch(API_URL_UPLOADIMAGE,{
        method: "POST",
        headers: {
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'd7e5c5bd-fbb0-494a-8e0c-4cadf28397d0',
        },
        body: formData
    });
    const data = await rest.json();
    
    if (rest.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${rest.status} ${data.message}`
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavoriteDog(data.id) //para agregar el michi cargado a favoritos.
    }
}




LoadRandomDogs();
LoadFavoritesDogs();