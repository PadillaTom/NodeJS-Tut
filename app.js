// ::::::::::::: Importing MODULES ::::::::::::::
// const http = require('http');
// const fs = require('fs');

//  :::::::::::: Creating Server ::::::::::::::::::
// 1) Function inside Function:
// function reqListener(req, res) {
// }
// http.createServer(reqListener);
//
// 2) Arrow Function:
// const server = http.createServer((req, res) => {
// REQUEST: Used to SEE data --->
//   console.log(req.url, req.method, req.headers);
//
// TO EXIT THE LOOP:
//    process.exit();
//
//  REQUESTING URLS:
//   const url = req.url;
//   const method = req.method; //Parse the METHOD to be used

//   if (url === '/') {
//     res.write('<html>');
//     res.write('<head><title> Enter Info </title></head>');
//     res.write(
//       '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit" >Send</button> </form></body>'
//     );
//     res.write('</html>');
//     return res.end();
//   }
//   if (url === '/message' && method === 'POST') {
// Para PEDIR DATA:
// const body = [];
// req.on('data', (chunk) => {
//   body.push(chunk); //Mandamos la data al BODY creado
// });
// Finalizamos el pedido de data:
//     req.on('end', () => {
//       const parsedBody = Buffer.concat(body).toString();
//       //   console.log(parsedBody);
//       const message = parsedBody.split('=')[1];
//       fs.writeFileSync('message.txt', message);
//     });
//     //   Necesitamos un STATUS CODE:
//     res.statusCode = 302;
//     res.setHeader('Location', '/');
//     return res.end();
//   }

// RESPONSE: to WRITE data--->
//   res.setHeader('Content-Type', 'text/html');
//   res.write('<html>');
//   res.write('<head><title> First Node </title></head>');
//   res.write('<body><h2> Hello from my NODE </h2></body>');
//   res.write('</html>');
//   res.end();
// });
// server.listen(3000);

//
//
// :::::::::::::: Creating ROUTES.JS :::::::::::::::::::
// In routes we pasted the previous code, we learn how to import and export(module.exports)
// this is the clean APP.JS
const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes);

server.listen(3000);

//--------------------------> EXERCISE 1 DONE <-----------------------

// :::::::::::::::: SECTION 4 ::::::::::::::::::::::::
