const fs =require('fs')
module.exports.index =async (req,res)=>{
  
    res.send("api path")
} 
  
module.exports.listpokemon =async (req,res)=>{
    const rawdata = fs.readFileSync('./data/listPokemon.json')
    const data= JSON.parse(rawdata)
    res.json(data)  
}
module.exports.Forms =async(req,res)=>{
    const rawdata = fs.readFileSync('./data/pokemonForm.json')
    const data= JSON.parse(rawdata)
    res.json(data)  
}
module.exports.eggGroup =async(req,res)=>{
    const rawdata = fs.readFileSync('./data/eggGroup.json')
    const data= JSON.parse(rawdata)
    res.json(data)  
}