const axios = require('axios');

exports.loadData = async () => {
    const dat = await axios.get('https://swapi.dev/api/planets/');
    return dat.data.results;
};
