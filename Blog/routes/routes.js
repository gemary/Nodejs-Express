const express =require('express')
const db = require('../db')
const router = express.Router()

router.get('/',(req,res)=>{
        res.json("running")
})

router.get('/getAllUser',(req,res)=>{
    db.query(`SELECT * FROM users `,(q_err,q_res)=>{
        res.json(q_res.rows)
})
})
router.put('/updateUser',(req,res)=>{
    const values = [
        req.body.name,
        req.body.password,  
        req.body.u_pemission ,
        req.body.id]
        db.query(`UPDATE users SET u_name =$1 ,u_password =$2 , u_pemission =$3 WHERE uid = $4`,
            values, (q_err, q_res) => {
            if(q_err) return next(q_err);
            res.json(q_res.rowCount == 0?
                {status:"404",message:"fail",id:`${req.body.id}`}:
                {status:"200",message:"success",id:`${req.body.id}`})
            })
})
router.delete('/deleteUser',(req,res)=>{
    const id = req.body.pid
    db.query(`DELETE FROM users WHERE uid =$1`,[id],(q_err,q_res)=>{
        res.json(q_res.rows)
        console.log(q_err)
    })
})
router.post('/createUser',(req,res,next)=>{
    
    const values = [
        req.body.name,
        req.body.password,  
        req.body.u_pemission ]
        db.query(`INSERT INTO users(u_name,u_password ,u_token, u_pemission)
            VALUES($1, $2, MD5(random()::text), $3 )`,
            values, (q_err, q_res) => {
            if(q_err) return next(q_err);
            res.json(q_res.rows)
            })
})
router.get('/getAllPost',(req,res,next)=>{
    db.query(`SELECT * FROM posts ORDER BY date_created DESC`,(q_err,q_res)=>{
            res.json(q_res.rows)
    })
})

router.post('/createPost',(req,res,next)=>{
    
    const values = [
        req.body.title,
        req.body.des,  
        req.body.body,
        req.body.tag, 
        req.body.author,
        req.body.banner]
        db.query(`INSERT INTO posts(title,decription ,body, tag, author, date_created,banner)
            VALUES($1, $2, $3, $4,$5, NOW(),$6 )`,
            values, (q_err, q_res) => {
            if(q_err) return next(q_err);
            res.json(q_res.rows)
            })
})
router.put('/updateLike',(req,res)=>{
    
})
router.put('/updatePost',(req,res,next)=>{
    const values =[
        req.body.id,
        req.body.title,
        req.body.des,  
        req.body.body,
        req.body.tag, 
        req.body.author
    ]
    db.query(`UPDATE posts SET title =$2 ,decription =$3 ,body =$4 , tag =$5, author =$6 ,date_updated =NOW() WHERE pid = $1 `,values,
        (q_err,q_res)=>{
            if(q_err) return next(q_err);
            
            res.json(q_res.rowCount == 0?
                {status:"404",message:"fail",id:`${req.body.id}`}:
                {status:"200",message:"success",id:`${req.body.id}`})
        
        })
})


router.post('/deletePost',(req,res,next)=>{
  
    const id = req.body.pid
    db.query(`DELETE FROM posts WHERE pid =$1`,[id],(q_err,q_res)=>{
        res.json(q_res.rows)
        console.log(q_err)
    })
})
module.exports = router