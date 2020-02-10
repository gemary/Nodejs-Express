const fs =require('fs')
module.exports.index =async (req,res)=>{
    const rawdata = fs.readFileSync('./data.json')
    const data= JSON.parse(rawdata)
    res.json(data)  
}