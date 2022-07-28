let pagina = 1;
let peliculas = '';
//Crear el observador
let observador = new IntersectionObserver((entradas, observador)=>{
    entradas.forEach(entrada =>{
        if(entrada.isIntersecting){
            pagina++;
            cargarPelicula();
        }
    })
}, {
    rootMargin: '0px 0px 200px 0px',
    threshold: 1.0
})

const cargarPelicula = async () =>{
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=786ee52ce60c9ebb3805127db53d7f67&page=${pagina}`;
        const respuesta = await fetch(url);
        if(respuesta.status===200){
            const datos = await respuesta.json();
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                    <img class = "poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h1 class="titulo">${pelicula.title}</h1>
                    <button class="ver-mas" onclick="verMas(${pelicula.id})">Ver más</button>
                </div>
                `;
                
            });
            const divPeliculas = document.getElementById('contenedor');
            divPeliculas.innerHTML = peliculas;

            const peliculaEnPantalla = document.querySelectorAll('.contenedor .pelicula');
            let ultimaPelicula = peliculaEnPantalla[peliculaEnPantalla.length-1];
            observador.observe(ultimaPelicula);


        }else if(respuesta.status===401){
            console.log("Problema de autencicación");
        }else if(respuesta.status===404){
            console.log("Películas no encontradas");
        }else{
            console.log("Error desconocido");   
        }
        

    } catch (error) {
        console.log(error)
    }
    
}

cargarPelicula();

const verMas = (id) =>{
    window.location.href = `./pelicula.html?id=${id}`
}