const express =require('express')

const apiRoute = require('./api/routes/route')

const port = 3000


const app =express()
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api',apiRoute)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))