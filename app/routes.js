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

// Manage applications with delete application notification
router.get('/manage-applications-delete-app-notification', function (req, res) {
  res.render('manage-applications-delete-app-notification', {
    cases: req.session.cases
  })
})

// view applications with update key notification
router.get('/view-applications-update-key-notification', function (req, res) {
  res.render('view-applications-update-key-notification', {
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
      text: 'Select an environment for your application',
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
  var errorAPIKeyTypeHasError = false

  if(typeof req.session.data['key-type'] == 'undefined'){
    errorAPIKeyTypeHasError = true
    errors.push({
      text: 'Select the type of API client key you want to add',
      href: '#api-key-type-error'
    })
  }
  if (errorAPIKeyTypeHasError) {
    res.render('add-new-key', {
      errorAPIKeyType: errorAPIKeyTypeHasError,
      errorList: errors
    })
  }
  else {
    req.session.login = true

    if(req.session.data['key-type'] == "rest"){

      res.redirect('add-rest-key')
    }
    else if(req.session.data['key-type'] == "stream"){

      res.redirect('add-stream-key')
    }
    else if(req.session.data['key-type'] == "web"){

      res.redirect('add-web-key')
    }
  }
})
  



// Add REST key
router.post('/add-rest-key', function (req, res) {
  var errors = []
  var keyNameHasError = false
  var keyDescriptionHasError = false

  if (req.session.data['key-name'] === '') {
    keyNameHasError = true
    errors.push({
      text: 'Enter your key name',
      href: '#key-name-error'
    })
  }
  if (req.session.data['key-description-detail'] === '') {
    keyDescriptionHasError = true
    errors.push({
      text: 'Enter your key description',
      href: '#key-name-error'
    })
  }
  if (keyNameHasError | keyDescriptionHasError)  {
      res.render('add-rest-key', {
        errorKeyName: keyNameHasError,
        errorKeyDescription: keyDescriptionHasError,
        errorList: errors
      })
    } else {
      req.session.login = true
      res.redirect('view-application')
    }
  })


// Add Stream key
router.post('/add-stream-key', function (req, res) {
  var errors = []
  var keyNameHasError = false
  var keyDescriptionHasError = false

  if (req.session.data['key-name'] === '') {
    keyNameHasError = true
    errors.push({
      text: 'Enter your key name',
      href: '#key-name-error'
    })
  }
  if (req.session.data['key-description-detail'] === '') {
    keyDescriptionHasError = true
    errors.push({
      text: 'Enter your key description',
      href: '#key-name-error'
    })
  }
  if (keyNameHasError | keyDescriptionHasError)  {
      res.render('add-stream-key', {
        errorKeyName: keyNameHasError,
        errorKeyDescription: keyDescriptionHasError,
        errorList: errors
      })
    } else {
      req.session.login = true
      res.redirect('view-application')
    }
  })

  // Add Web key
router.post('/add-web-key', function (req, res) {
  var errors = []
  var keyNameHasError = false
  var keyDescriptionHasError = false

  if (req.session.data['key-name'] === '') {
    keyNameHasError = true
    errors.push({
      text: 'Enter your key name',
      href: '#key-name-error'
    })
  }
  if (req.session.data['key-description-detail'] === '') {
    keyDescriptionHasError = true
    errors.push({
      text: 'Enter your key description',
      href: '#key-name-error'
    })
  }
  if (keyNameHasError | keyDescriptionHasError)  {
      res.render('add-web-key', {
        errorKeyName: keyNameHasError,
        errorKeyDescription: keyDescriptionHasError,
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
  
  if (updateKeyNameHasError) {
    res.render('update-key', {
      errorUpdateKeyName: updateKeyNameHasError,
      errorList: errors
    })
  } else {
    req.session.login = true
    res.redirect('view-applications-update-key-notification')
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
