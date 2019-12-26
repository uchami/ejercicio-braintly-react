import deepCopy from './utils/deepCopy';
var request = require("request");
const apikey = "117dc417"
var options = {
    method: 'GET',
    url: 'http://www.omdbapi.com/',
    qs: {apikey: apikey}
};

const resolveOrThrowError = (options) => new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        resolve(JSON.parse(body));
    });
})

export const obtenerPeliculas = (title) => {
    let myOptions = deepCopy(options);
    myOptions.qs.s = title;
    return resolveOrThrowError(myOptions);
}

export const obtenerDetallePelicula = (id) => {
    let myOptions = deepCopy(options);
    myOptions.qs.i = id;
    return resolveOrThrowError(myOptions);
}
