const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

console.log("Ewok encode tests");
console.log(ewokEncode("you can do it"));
console.log(ewokEncode("R2-D2"));


// Create Express Server
const app = express();

// Configuration
const PORT = 3033;
const HOST = "localhost";
const API_SERVICE_URL = "https://swapi.dev/api";

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

app.use('/', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/`]: '',
    },
 }));


function ewokEncode(text){
  return text.toLowerCase().replace(/[aeiouy]+/g,"i").replace(/((?![aeiou])[a-z])+/g,"b");
}
