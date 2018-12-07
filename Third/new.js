var http = require('http');

var server = http.createServer(function (request, response) {

    
console.log('request starting...');
// respond
response.write('hello client!');
response.end();
})
http.get('http://api.nasa.gov/planetary/apod?api_key=6lfkMioPKesKd0LFWLjQTcRJccsOkaIuFF1yXvrR', (resp) => {
let data = '';
// A chunk of data has been recieved.
resp.on('data', (chunk) => {
data += chunk;
});
// The whole response has been received. Print out the result.
resp.on('end', () => {
console.log(JSON.parse(data).explanation);
    
});
}).on("error", (err) => {
console.log("Error: " + err.message);
});

server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

