const express = require('express')
const app = express()
const port = 3000
const model = require('./model')
const {championData} = require('./model/champion')
const {connects,insertItem,findItemById } = require('./model')
app.use(express.static('public'));
app.set('view engine','pug')




app.get('/', (req, res) => {
 
  connects((db)=>{
    findItemById(db,'5f364d71ec67970518585cdb',(result)=>{
         const { summoners}= result[0]
    //   const data=  Array.apply(matches)
        
        res.render('index',{summoners})
    })

  })

  
})
app.get('/detail/:puuid',(req,res)=>{
    const {puuid} =req.params
   console.log(req.params);
})


app.get('/InsertData',(req,res)=>{

  championData.then((result)=>{
    const item =result.data.data.probuilds
    
    connects((db)=>{
      insertItem(db,item,(result)=>{
        res.json(result)
      });
  });
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})