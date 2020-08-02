const express = require('express')
const router = express.Router()
// Add your routes here - above the module.exports line
router.use(function (req, res, next) {
  res.locals.session = req.session
  next()
})
// Homepage
router.get('/', function (req, res) {
  var realCases = require('./data/data.js')
  req.session.cases = realCases.concat()
  req.session.recents = []
  req.session.notifications = {}
  req.session.notifications.list = []
  req.session.login = false
  res.render('index')
  console.log(req.session.login)
})
// All pages
router.all('*', function (req, res, next) {
  if (typeof req.session.cases === 'undefined') {
    return res.redirect('/')
  }
  next()
})

// Sign in
router.post('/sign-in', function (req, res) {
  var errors = []
  var emailHasError = false
  var passwordHasError = false

  if (req.session.data['email'] === '') {
    emailHasError = true
    errors.push({
      text: 'Enter your email address',
      href: '#email-error'
    })
  }
  if (req.session.data['password'] === '') {
    passwordHasError = true
    errors.push({
      text: 'Enter your password',
      href: '#password-error'
    })
  }

  if (emailHasError || passwordHasError) {
    res.render('sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    req.session.login = true
    res.redirect('manage-applications')
  }
})

// Manage applications
router.get('/manage-applications', function (req, res) {
  res.render('manage-applications', {
    cases: req.session.cases
  })
})

// View single application
router.get('/view-application', function (req, res) {
  var id = parseInt(req.query.id)
  var i = 0
  for (i = 0; i < req.session.cases.length; i++) {
    if (req.session.cases[i].id === id) {
      req.session.workingCase = req.session.cases[i]
    }
  };
  res.render('view-application', {
    case: req.session.cases[id]

  })
})

// Edit application
router.get('/edit', function (req, res) {
  var id = parseInt(req.query.id)
  res.render('edit', {
    case: req.session.cases[id]
  })
})

// Edit application 
router.post('/edit', function (req, res) {
  var id = parseInt(req.query.id)
  res.render('edit', {
    case: req.session.cases[id],
    deleteWarning: true
  })
})

// Register application
router.get('/register', function (req, res) {
  res.render('register', {
  })
})

// Signout
router.get('/signout', function (req, res) {
  req.session.login = false
  res.redirect('index')
})
module.exports = router
