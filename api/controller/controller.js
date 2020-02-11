const fs =require('fs')
module.exports.index =async (req,res)=>{
    const rawdata = fs.readFileSync('../data/listPokemon.json')
    const data= JSON.parse(rawdata)
    res.json(data)  
}

module.exports.Forms =async(req,res)=>{
    const rawdata = fs.readFileSync('../data/pokemonForm.json')
    const data= JSON.parse(rawdata)
    res.json(data)  
}