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
    options.qs.s = title;
    return resolveOrThrowError(options);
}

export const obtenerDetallePelicula = (id) => {
    options.qs.i = id;
    return resolveOrThrowError(options);
}
