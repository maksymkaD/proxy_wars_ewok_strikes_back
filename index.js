const { default: axios } = require('axios');
const express = require('express');
var url = require('url');

// Configuration
const PORT = 3033;
const HOST = "localhost";
const API_SERVICE_URL = "https://swapi.dev/api";

// Create Express Server
const app = express();

app.listen(PORT, HOST, () => {
    console.log(`Starting SWAPI Proxy at ${HOST}:${PORT}`);
});

app.use('/', function (req, res) {
    var url_parts = url.parse(req.url, true);

    var query_str = url_parts.search;
    if (query_str === null) query_str = "";

    axios({
        "method": req.method,
        "url": API_SERVICE_URL + req.path + query_str, res
    }).then((response) => {
        if (req.query["encoding"] == "ewok") {
            for (var key in response.data) {
                if (Array.isArray(response.data[key])) {
                    response.data[key] = response.data[key].map(ewokEncode);
                } else if (typeof response.data[key] === 'string') {
                    response.data[key] = ewokEncode(response.data[key]);
                }
            }
            console.log("Response with custom Ewok encoding sent!");
            res.send(response.data);
        } else {
            console.log("Response sent!");
            res.send(response.data);
        }
    }).catch(function (err) {
        console.log(err.message + " CURL "+ API_SERVICE_URL + req.path + query_str);
        res.send({
            "detail": "Not found"
        });
    });
});

function ewokEncode(text) {
    return text.toLowerCase().replace(/[aeiouy]/g, "i").replace(/((?![aeiouy])[a-z])/g, "b");
}
