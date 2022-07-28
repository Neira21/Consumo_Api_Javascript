const obtenerPeliculas = async () => {  
    try {
        const respuesta = await axios.get('https://api.themoviedb.org/3/movie/popular?',{
            params: {
                api_key: '786ee52ce60c9ebb3805127db53d7f67'
            },
            headers:{
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODZlZTUyY2U2MGM5ZWJiMzgwNTEyN2RiNTNkN2Y2NyIsInN1YiI6IjYyYzBjYjE2NTMyYWNiMDMyOGQyNmY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UbHOvXv3cT2bIHqz86uBHYGBj8VUyqB9PbCN477p9FM'
            }
        })
        console.log(respuesta.data.results);
    } catch (error) {
        console.log(error);
    }
    
}

obtenerPeliculas();