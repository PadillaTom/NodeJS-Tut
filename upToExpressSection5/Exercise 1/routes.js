// Routes for EX 1:

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  // Homepage :  "/"
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title> Exercise 1 </title></head>');
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Send Username</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  // Users : "/users"
  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title> Exercise 1 </title></head>');
    res.write(
      '<body> <ul><li> Username 1 </li> <li> Username 2 </li></ul></body>'
    );
    res.write('</html>');
    return res.end();
  }
  // Create User : "/create-user"
  if (url === '/create-user' && method === 'POST') {
    const body = []; // Will hold our data, to be modified

    req.on('data', (chunk) => {
      body.push(chunk); // populate BODY with data.
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
    });
  }
};
module.exports = requestHandler;
