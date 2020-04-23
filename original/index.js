const API_KEY = 'dcde8d04';

const fetchData = async (serchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: API_KEY,
            s: serchTerm
        }    
})
    return response.data.Search
}
const input = document.querySelector('input')


const onInput = async event => {
    let searchString = event.target.value
    if ( searchString.trim().length > 2) {        
        const movies = await fetchData(searchString.trim())
        console.log(movies)
    }
}
input.addEventListener('input', debounce(onInput, 1000))