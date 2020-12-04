const http = require('http');

//  :::::::::::: Creating Server ::::::::::::::::::
// 1) Function inside Function:
// function reqListener(req, res) {
// }
// http.createServer(reqListener);
//
// 2) Arrow Function:
const server = http.createServer((req, res) => {
  // REQUEST: Used to SEE data --->
  console.log(req.url, req.method, req.headers);
  //
  //  TO EXIT THE LOOP:
  //    process.exit();
  //
  // RESPONSE: to WRITE data--->
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title> First Node </title></head>');
  res.write(' <body><h2> Hello from my NODE </h2></body>');
  res.write('</html>');
  res.end();
});
server.listen(3000);
