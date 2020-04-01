const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.options('*', cors())

const { createUser, login, isLoggedIn, manageProfile, updateProfile, changePassword, getAllUser, generateExcel } = require('./routeHandler')

const { isAuthenticated, isAuthorized, isAdmin } = require('./authentication')

app.post('/user', createUser)

app.post('/login', login)

app.post('/isLoggedIn', isLoggedIn)

app.post('/getProfile', [ isAuthenticated, isAuthorized, manageProfile ])

app.post('/updateProfile', [ isAuthenticated, isAuthorized, updateProfile ])

app.post('/changePassword', [ isAuthenticated, isAuthorized, changePassword])

app.post('/getAllUsers', [ isAuthenticated, isAdmin, getAllUser])

app.post('/generateExcel', [ isAuthenticated, isAdmin, generateExcel ])

module.exports = app