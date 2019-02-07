const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

const SECREY_KEY = 'secretKey'

// pseudo DB
const users = []

router.route('/login').post((req, res) => {
  //validating user
  const user = users.find(u => u.login === req.body.login)

  if (!user) {
    res.send('no login')
  }

  if (user.password !== req.body.password) {
    res.send('wrong pass')
  }

  //validating creation token
  const token = jwt.sign({ user }, SECREY_KEY, { expiresIn: '1h' })

  res.send({ user, token })
})

router.route('/signup').post((req, res) => {
  const user = {
    ...req.body
  }

  // if login exists
  if (users.find(u => u.login === user.login)) {
    res.send('login is already taken')
  } else {
    // writing to DB
    users.push(user)
    console.log(users)
  
    //validating creation token
    const token = jwt.sign({ user }, SECREY_KEY, { expiresIn: '1h' })
  
    res.send({ user, token })
  }
})

module.exports.router = router
