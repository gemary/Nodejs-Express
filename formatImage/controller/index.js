const sharp = require('sharp')
const fs = require('fs')
const paths =require('path')
const nodemailer = require('nodemailer');

const {USER_NAME,PASS_WORD}=require('../public/Constain');

const {connectAction,RegisterAction,loginAction,FindEmailAction,updateAction} = require('../model')





module.exports.index =async (req,res) =>{
    res.render('index',{errorString:''})
}
module.exports.uploadImage =async (req,res,next) =>{
    if (req.file !== undefined) {
        const {originalname,filename,path,size,mimetype} = req.file
        const tailName = mimetype.split('/')
        const newPath = path.split('\\').slice(1).join('/')
        const rootPath = paths.extname(originalname).toLocaleLowerCase()
        const rePath =`public/uploads/${originalname}`
        if (rootPath === ".png" || rootPath === ".jpg" || rootPath === ".webp") {
          fs.rename(path,rePath,(err)=>{
                if (err) {
                    throw err
                }
                res.render('form', {originalname,filename,path:rePath,size,tailName:tailName[1]})
          })
        }else{
            res.render('index',{errorString:'Không hỗ trợ định đạng '+tailName[1]})
        }
      
    }
    else{
        res.render('index',{errorString:'File chưa được chọn'})
    }
  
}
module.exports.RegisterAction=async (req,res)=>{
    
   const {name,email,resultPath,typeiamge} = req.body

   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER_NAME,
      pass: PASS_WORD
    }
  });

  var mailOptions = {
    from: 'ducdang1206@gmail.com',
    to:email,
    subject: 'Thanks'+name+' for using ImageFormat',
    html:`<h1>Your Image</h1><p> <img src="cid:image" alt="image"> </p>`, 
    attachments: [{
      filename: name+'.'+typeiamge,
      path:resultPath,
      cid: 'image' //same cid value as in the html img src
  }]
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      // console.log('Email sent: ' + info.response);
    }
  });

    connectAction((collecttion)=>{
        RegisterAction(collecttion,{email,name,list:[resultPath]},(result)=>{
          console.log(result);
         
          res.render('index',{errorString:'vui lòng kiểm tra email của bạn!'})
        })
    })
}




module.exports.FindEmailAction =async (req,res)=>{
    const {email} =req.body
    connectAction((collecttion)=>{
        FindEmailAction(collecttion,{email},(result)=>{
          console.log(result);
          if (result.length <= 0) {
            res.render('index',{errorString:'không tìm thấy data'})
          }
          else{
            const {_id,email,name,list} =result[0]
            
            res.render('listitem',{_id,email,name,list})
          }
           
        })
    })
}

module.exports.ProcessImages =async (req,res,next)=>{
    const {quality,typeImg,width,height,innerPath,colorua} = req.body;
    const widthInt = width?parseInt(width):1024;
    const heightInt =height?parseInt(height):1024;
    const qualityInt = quality?parseInt(quality):50;
    const names = Math.random().toString(36).replace(/[^a-z]+/g,'').substr(0, 25);
    const resultPath = `image/${names}.${typeImg}`.trim();
    let tranform = sharp(innerPath)
    if (colorua =='2') {
      tranform =tranform.toColourspace('b-w');
    }
    if (widthInt) {
      tranform =tranform.resize(widthInt);
    }
    if (heightInt) {
      tranform =tranform.resize(heightInt);
    }
    if (typeImg) {
      
    }
    tranform.toFormat(typeImg,{quality:qualityInt}).toFile(resultPath);
    res.render('result',{resultPath,typeImg});

    
}