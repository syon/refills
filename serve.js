const nodeStatic = require('node-static');
const dotenv     = require('dotenv');

dotenv.config();

console.log(`Listening Port: ${process.env.SERVE_PORT}`);

var serve = new nodeStatic.Server(__dirname);
require('http').createServer((req, res) => {
  req.addListener('end', () => serve.serve(req, res));
  req.resume();
}).listen(process.env.SERVE_PORT);
