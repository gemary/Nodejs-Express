
const express = require('express')
const app = express()
const port = 3000
const {connects,findItemById} = require('./models')
app.use(express.static('public'))
app.set('view engine', 'pug')
app.get('/', (req, res) => {
  connects((db)=>{
    findItemById(db,(results)=>{
      
        const listHero = results[0].data
        res.render('index',{listHero})
      })
    })
  })
  
 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})