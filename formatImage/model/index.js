
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0.rdbb5.mongodb.net/demoDB?retryWrites=true&w=majority";

const dbName = 'demoDB';
const client = new MongoClient(uri, { useNewUrlParser: true });


const connectAction =(callback)=>{
  client.connect(err => {
    const db = client.db(dbName);
    const collecttion = db.collection('users');
    callback(collecttion,()=>{
       client.close();
    });
    
  });
}

const loginAction =(collecttion,email,callback)=>{
 const  counts =  collecttion.find({email}).count();
 if (counts > 0) {
  callback(true);
 }
callback(false);
}

const RegisterAction =(collecttion,data,callback)=>{
  const {email,name,list} =data
  const  counts =  collecttion.find({email}).count();
  if (counts < 0) {
    collecttion.insertOne(data,(err,result)=>{
      if (err) {
          throw err
      }
      callback(result);
    })
  }
  else{
    collecttion.update({email},{$push:{list:list[0]}},(result)=>{
      callback (result)
  });
  }
 
}
const FindEmailAction = (collecttion,email,callback)=>{
  collecttion.find({email}).toArray((err,result)=>{
    if (err) {
      throw err
    } 
  callback(result);
  });
}
const updateAction = (collecttion,data,callback)=>{
  collecttion.update({email},{$push:{list:data}},(result)=>{
      callback (result)
    
  });
}
module.exports ={
  loginAction,
  RegisterAction,
  FindEmailAction,
  connectAction,
  updateAction
}