const container = document.querySelector('.container');
const getUrl = new URLSearchParams(window.location.search);
id = getUrl.get('id');

console.log(id)

fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=786ee52ce60c9ebb3805127db53d7f67`)
.then(res => res.json())    
.then(data => {
    console.log(data);
    const title = document.createElement('p');
    title.innerHTML = data.title;
    const overview = document.createElement('p');
    overview.innerHTML = data.overview;
    const popularity = document.createElement('p');
    popularity.innerHTML = data.popularity;
    const image = document.createElement('img');
    image.setAttribute('src', `https://image.tmdb.org/t/p/w500/${data.poster_path}`);

    container.appendChild(title);
    container.appendChild(overview);
    container.appendChild(popularity);
    container.appendChild(image);
    }
)
