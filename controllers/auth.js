exports.getLogin = (req, res, next) => {
  // Destructure Cookie:
  // console.log(req.get('Cookie'));
  const isLoggedIn = req.get('Cookie').split('=')[1];
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // Setting up a Cookie: This will hold user information so we can use it through the website
  res.setHeader('Set-Cookie', 'loggedIn=true'); // This will set up a Cookie holding TRUE for loggedIn
  // End Cookie
  res.redirect('/');
};
