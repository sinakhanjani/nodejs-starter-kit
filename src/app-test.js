const express = require('express')
const router = require('./router')
require('./playground/playground')
require('../db/mongoose')
// require('../db/sequelizeORM')

// Setup express
const app = express()

// Setup directory for documents
const documentDirectory = process.env.UPLOAD_FILE_DIRECTORY
app.use(`${documentDirectory.substr(1)}`,express.static(documentDirectory.substr(2)));
app.use(express.json())

// Add route
router(app)

module.exports = app
