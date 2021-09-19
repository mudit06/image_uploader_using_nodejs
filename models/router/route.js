const route =require('express').Router()
const controller = require('../controller/controller')
const store= require('../middleware/multer')

//routes
route.get('/',controller.home)

//for upload img
route.post('/uploadmultiple',store.array('images',4),controller.uploads)

module.exports= route