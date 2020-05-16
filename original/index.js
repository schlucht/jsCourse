const API_KEY = 'dcde8d04';
const body = document.querySelector('body')

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: API_KEY,
            s: searchTerm
        }    
    })
    if (response.data.Error) {
        return []
    }
    return response.data.Search
}

const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label for="">
    <b>Search for Movie</b>
</label>
<input type="text" class="input">
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`

const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')
const movieTitle = document.querySelector('#movieTitle')
const onInput = async event => {
    let searchString = event.target.value    
    if ( searchString.trim().length > 2) {        
        const movies = await fetchData(searchString.trim())
        if (!movies.length > 0) {
            dropdown.classList.remove('is-active')      
         }
        dropdown.classList.add('is-active')
        resultsWrapper.innerHTML = ''
        for (let movie of movies) {
            const options = document.createElement('a')
            const imgSrc = movie.Poster === 'N/A' ? './assets/movie_not_found.jpg' : movie.Poster
            options.classList.add('dropdown-item')
            options.innerHTML = `
                <img src=${imgSrc} alt="${movie.Title}" />
                ${movie.Title}
            `
            options.addEventListener('click', () => {
                input.value = movie.Title
                movieTitle.textContent = `: ${movie.Title}`
                dropdown.classList.remove('is-active')
                onMovieSelect(movie)
            })
            resultsWrapper.appendChild(options)
         }       
    } else {
        dropdown.classList.remove('is-active')
    }    
}
input.addEventListener('input', debounce(onInput, 1000))
document.addEventListener('click', (event) => {
    if ( !root.contains(event.target)) {
        dropdown.classList.remove('is-active')
    }
})
const onMovieSelect = async ( movie ) => {
    
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: API_KEY,
            i: movie.imdbID
        }    
    })
    if (response.data.Error) {
        return []
    }
    
    document.getElementById('summary').innerHTML = movieTemplate(response.data)
}
const movieTemplate = (movieDetail) => {
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}" alt="">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Raiting</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>g
    </article>
    `
}

