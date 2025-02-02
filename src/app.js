// Importing required modules and dependencies
const express = require('express')
// Importing required modules and dependencies
const path = require('path')
// Importing required modules and dependencies
const router = require('./router')
// Importing required modules and dependencies
const hbs = require('hbs')

require('./playground/playground')
require('../db/mongoose')
require('../db/sequelizeORM')

// Setup express
// Importing required modules and dependencies
const app = express()
// Importing required modules and dependencies
const port = process.env.PORT || 3000
// Importing required modules and dependencies
const host = process.env.HOST

// Define paths for Express config
// Importing required modules and dependencies
const publicDirectoryPath = path.join(__dirname, '../public')
// Importing required modules and dependencies
const viewsPath = path.join(__dirname, '../templates/views')
// Importing required modules and dependencies
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup directory for documents
// Importing required modules and dependencies
const documentDirectory = process.env.UPLOAD_FILE_DIRECTORY
app.use(`${documentDirectory.substr(1)}`,express.static(documentDirectory.substr(2)));

// Setup static directory to server
app.use(express.static(publicDirectoryPath))
app.use(express.json())

// Add route
router(app)

module.exports = { app, port, host }
