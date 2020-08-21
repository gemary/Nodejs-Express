const { ObjectId } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0.rdbb5.mongodb.net/demoDB?retryWrites=true&w=majority";
const DB_NAME ="demoDB";
const colectionChampion ="origins";
const client = new MongoClient(uri,  {
    keepAlive: 300000, 
    connectTimeoutMS: 30000,
    useUnifiedTopology: true
  });
const connects =(actionCallback)=>{
   
    client.connect(err => {
    const db = client.db(DB_NAME);
  
    actionCallback(db,()=>{


        if (client.isConnected()) {
            client.close();
        }
       
       
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

module.exports ={
    connects,
    findItemById,
    insertItem
}