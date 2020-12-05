//----------------------------------------
// Section 5 ::: EXPRESS :::
//------------------------------------------

// const express = require('express'); //import Express
// const bodyParser = require('body-parser');
// // Routes:
// const adminRoutes = require('./Routes/admin');
// const shopRoutes = require('./Routes/shop');

// const app = express(); // Store functions created by express

//
// -------Middlewares------
// Incoming request is Funnled through multiple functions, until we send a response.
// Allows us to split our code into pieces.
//  USE() --> Will run on every incoming request.
// NEXT: is a function, hast o be executed to allow request travel to the next middleware.
// app.use((req, res, next) => {
//   console.log('I am in the middlware');
//   next();
// });
// SEND(): Automatically sets content-type, once used no need for NEXT.
// app.use((req, res, next) => {
//   console.log('I am in the middlware 2 - whithout NEXT -');
//   res.send('<h1>Hello from Express</h1>');
// });
//  RESUMEN: We travel from middleware to middleware, with NEXT until we have a SEND

//
// -------Routes------
// Path, Funct(req,res,next)

// app.use('/', (req, res, next) => {
//   console.log('This will always RUN because it is on TOP and NEXT()');
//   next();
// });

//  BODY PARSER --> so we can use the "req.body" to get DATA from inputs and stuff.
//  always runs (calls next), must have on top
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// Main Routes:
// app.use('/add-product', (req, res, next) => {
//   res.send(
//     '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button> </form>'
//   );
// });
// app.post('/product', (req, res) => {
//   // POST will filter and only get POST methods.
//   console.log(req.body);
//   res.redirect('/'); // Send me to Homepage
// });

// app.use(adminRoutes); // Route creada en Routes/Admin, importada como adminRoutes
// app.use(shopRoutes); // Route creada en Routes/Shop, importada como shopRoutes
// app.use('/', (req, res, next) => {
//   res.send('<h1> Homepage </h1>');
// });

// app.listen(3000); // No need for HTTP, app.listen() will take care of everything

//----------------------------------------
// MAIN APP:
//------------------------------------------

const path = require('path');

const express = require('express'); //import Express
const bodyParser = require('body-parser');
const app = express(); // Store functions created by express

const rootDir = require('./utils/path');

// Importing Routes:
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Body Parser:
app.use(bodyParser.urlencoded({ extended: true }));
// Adding Static PATH --> This will allow client to enter PUBLIC folder.
app.use(express.static(path.join(rootDir, 'public')));

// Routes:
app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, 'views', 'errorPage.html'));
});

// Server:
app.listen(3000); // No need for HTTP, app.listen() will take care of everything
