
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const {connects,findItemById,LoginAction,registerAction,getAllTeamAction,updateDataAction} = require('./models');

const session = require('express-session');

app.use(express.static('public'))
app.set('view engine', 'pug')
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/team', (req, res) => {
  const email = req.session.email
  if (!email) {
    res.redirect('/');
  }else{
    connects((db)=>{
      findItemById(db,(results)=>{
          const listHero = results[0].data
          res.render('index',{listHero,email})
        })
      })
  }
  
  })
app.get('/',(req,res)=>{
  res.render('login');
})
app.post('/',(req,res)=>{
  const {email,pass} =req.body;
  const sessData = req.session;
  sessData.email = email;
 connects((db)=>{
  LoginAction(db,{email,pass},(result)=>{
      if (result == 1) {
          res.redirect('/team');
      }
      else{
        res.render('login',{error:'login fail!'})
      }
  })
 })

});
app.get('/register',(req,res)=>{
  res.render('register');
})
app.post('/register',(req,res)=>{
  const {email,pass,repass}= req.body;
  if (pass === repass) {
    connects((db)=>{
      registerAction(db,{email,pass,list:[]},(resutl)=>{
          res.render('login');
      })
    })
  }
});

app.post('/team',(req,res)=>{
  const email = req.session.email
  const {position1,position2,position3,position4,position5,position6,position7,position8,position9,position10,position11,position12}=req.body
  console.log(position1);
  connects((db)=>{
      updateDataAction(db,{email,list:[position1,position2,position3,position4,position5,position6,position7,position8,position9,position10,position11,position12]},
        (result)=>{
          console.log(result);
          res.redirect('/team');
      })
  })
})

app.get('/list',(req,res)=>{
  const email = req.session.email
  const temp =[]
  const temp2 =[]
  connects((db)=>{
    getAllTeamAction(db,email,(result)=>{
       
        result[0].list.forEach(element => {
          element.forEach((e)=>{
              if (e !== "") {
                const jsonstring =JSON.parse(e);
                temp.push(jsonstring);
              }
              
          })
          temp2.push(temp);
        });
        res.render('listteam',{result:temp2})
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})