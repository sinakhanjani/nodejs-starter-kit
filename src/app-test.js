// Importing required modules and dependencies
const express = require('express')
// Importing required modules and dependencies
const router = require('./router')
require('./playground/playground')
require('../db/mongoose')
// require('../db/sequelizeORM')

// Setup express
// Importing required modules and dependencies
const app = express()

// Setup directory for documents
// Importing required modules and dependencies
const documentDirectory = process.env.UPLOAD_FILE_DIRECTORY
app.use(`${documentDirectory.substr(1)}`,express.static(documentDirectory.substr(2)));
app.use(express.json())

// Add route
router(app)

module.exports = app
