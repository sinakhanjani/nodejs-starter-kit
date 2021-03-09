const express = require('express')
const path = require('path')
const router = require('./router')
const hbs = require('hbs')

require('./playground/playground')
require('../db/mongoose')
require('../db/sequelizeORM')

// Setup express
const app = express()
const port = process.env.PORT || 3000
const host = process.env.HOST

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup directory for documents
const documentDirectory = process.env.UPLOAD_FILE_DIRECTORY
app.use(`${documentDirectory.substr(1)}`,express.static(documentDirectory.substr(2)));

// Setup static directory to server
app.use(express.static(publicDirectoryPath))
app.use(express.json())

// Add route
router(app)

module.exports = { app, port, host }
