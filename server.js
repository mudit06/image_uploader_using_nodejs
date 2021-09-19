const express = require('express')
const app = express()
const hbs= require('express-handlebars')

const path = require('path')

app.use(express.json())

//static files
app.use(express.static(path.join(__dirname,'public')))

//connectto mongodb
require('./models/database/database')()


app.set('view engine','hbs')
app.engine('hbs',hbs({
    extname:'hbs',
    defaultView:'default',
    layoutsDir:path.join(__dirname,'views'),
    partialsDir:path.join(__dirname,'views/partials')
}))

app.use('/',require('./models/router/route'))

app.listen(4000,()=> { console.log('SERVER RUNNING')})