// Instructions:
// Create a server at 3000
// Handle "/" and "/users"
// "/" --> Welcome Page
// "/users" --> user List

// 1) Add a form with "username" input in "/", POST to "/create-user" on click.
// 2) "/create-user" --> Add the Route and Parse the Data("username") and log it in console.

// SOLUTION:

const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes);
server.listen(4000);
