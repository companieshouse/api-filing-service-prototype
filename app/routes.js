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
router.post('/register', function (req, res) {
  var errors = []
  var applicationNameHasError = false
  var applicationEnvironmentHasError = false

  if (req.session.data['application-name'] === '') {
    applicationNameHasError = true
    errors.push({
      text: 'Enter your application name',
      href: '#application-name-error'
    })
  }
  if(typeof req.session.data['environment'] == 'undefined'){
    applicationEnvironmentHasError = true
    errors.push({
      text: 'Select test or live application environment',
      href: '#environment-error'
    })
  }
  if (applicationNameHasError ||applicationEnvironmentHasError ) {
    res.render('register', {
      errorApplicationName: applicationNameHasError,
      errorApplicationEnvironment: applicationEnvironmentHasError,
      errorList: errors
    })
  }
  else {
    req.session.login = true
    res.redirect('manage-applications')
  }
})



// Add new key
router.post('/add-new-key', function (req, res) {
  var errors = []
  var keyNameHasError = false

  if (req.session.data['key-name'] === '') {
    keyNameHasError = true
    errors.push({
      text: 'Enter your key name',
      href: '#key-name-error'
    })
  }

  
  if (keyNameHasError)  {
      res.render('add-new-key', {
        errorKeyName: keyNameHasError,
        errorList: errors
      })
    } else {
      req.session.login = true
      res.redirect('view-application')
    }
  })

// Update key
router.post('/update-key', function (req, res) {
  var errors = []
  var updateKeyNameHasError = false

  if (req.session.data['update-key-name'] === '') {
    updateKeyNameHasError = true
    errors.push({
      text: 'Enter your key name',
      href: '#update-key-name-error'
    })
  }
  
  if (updateKeyNameHasError || updateKeyDescriptionDetailHasError) {
    res.render('update-key', {
      errorUpdateKeyName: updateKeyNameHasError,
      errorList: errors
    })
  } else {
    req.session.login = true
    res.redirect('manage-applications')
  }
 
})

// Delete key 
router.post('/delete-key', function (req, res) {

  var id = parseInt(req.query.id)
    res.render('delete-key', {
    case: req.session.cases[id],

  })
})


// Signout
router.get('/signout', function (req, res) {
  req.session.login = false
  res.redirect('index')
})
module.exports = router
