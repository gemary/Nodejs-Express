const { ObjectId } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0.rdbb5.mongodb.net/demoDB?retryWrites=true&w=majority";
const DB_NAME ="demoDB";
const colectionChampion ="origins";
const colectionUser='tftusers';
const client = new MongoClient(uri, { useNewUrlParser: true });
const connects =(actionCallback)=>{
    client.connect(err => {
    const db = client.db(DB_NAME);
    actionCallback(db,()=>{
       
        client.close();
    })
  
});
}


const findItemById=(db,callback)=>{
    let o_id = new ObjectId('5f3e2c609fec283e413cc7d8');
    const colection = db.collection(colectionChampion);
    colection.find({_id:o_id}).toArray(function(err, docs) {
         callback(docs);
      });
}
const registerAction =(db,data,callback)=>{
    const colection = db.collection(colectionUser);
    colection.insertOne(data,(err,result)=>{
        if (err) {
            throw err
        }
        callback(result);
      })
}   

const getAllTeamAction =(db,email,callback)=>{
    const colection = db.collection(colectionUser);
   colection.find({}).toArray().then((result)=>{
    callback(result);
});
   
}
const LoginAction =(db,data,callback)=>{
    const colection = db.collection(colectionUser);
    const {email,pass} = data;
    const  counts =  colection.find({email,pass}).count();
    counts.then((result)=>{
        if (result > 0) {
            callback(1)
        }
        else{
            callback(2)
        }
    })
    
}
const updateDataAction=(db,data,callback)=>{
    const colection = db.collection(colectionUser);
    const {email,list}= data;
    colection.update({email},{$push:{list:list}},(result)=>{
        callback (result)
    });
}
module.exports ={
    connects,
    findItemById,
    registerAction,
    getAllTeamAction,
    LoginAction,
    updateDataAction
}