const { ObjectId } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ducdang:ducdang@cluster0.rdbb5.mongodb.net/demoDB?retryWrites=true&w=majority";
const DB_NAME ="demoDB";
const colectionChampion ="champions";
const client = new MongoClient(uri, { useNewUrlParser: true   });
const connects =(actionCallback)=>{
   
    client.connect(err => {
    const db = client.db(DB_NAME);
   
    actionCallback(db,()=>{

        client.close();
    })
  
});
}


const insertItem=(db,item,callback)=>{
    console.log( db.collection('champions'));
    db.collection('champions').insertMany([item],(err, result)=>{
        callback(result);
    });
   
}
const findItemById=(db,id,callback)=>{
   
    let o_id = new ObjectId(id);
    const colection = db.collection(colectionChampion);
    colection.find({_id:o_id}).toArray(function(err, docs) {
         callback(docs);
      });
}

module.exports ={
    connects,
    findItemById,
    insertItem
}