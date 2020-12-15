exports.getLogin = (req, res, next) => {
  // Destructure Cookie:
  // console.log(req.get('Cookie'));
  // const isLoggedIn = req.get('Cookie').split('=')[1];
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  //  Session:
  req.session.isLoggedIn = true;
  res.redirect('/');
};

// COOKIE and SESSION:
// COOKIE ---> Client side (can hold certain data to be shared with backend(ex: ID for session))
//             Will be created automatically, Encripted code that relates COOKIE with SESSION
// SESSION ---> Server side ( Will hold information to be used inside the whole APP, different information for each user/session)
//
// ** Use a SESSION to store data (cart, userinfo, isloggedin, etc) that we dont want to lose and use though the web
