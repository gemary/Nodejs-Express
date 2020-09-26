const express = require('express')
const router = require('./routes')

const port = 3000|| process.env.PORT
const bodyParser = require('body-parser')
const app = express()



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.set('view engine', 'pug')

app.use(router)

app.listen(port, () => console.log(` App listening at http://localhost:${port}`))