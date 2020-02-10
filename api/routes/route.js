const app = require('express')
const router = app.Router()
const controller =require('../controller/controller')

router.get("/listPokemon",controller.index)
module.exports = router;