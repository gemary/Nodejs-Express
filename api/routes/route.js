const app = require('express')
const router = app.Router()
const controller =require('../controller/controller')

router.get("/listPokemon",controller.index)
router.get("/FormsPokemon",controller.Forms)
module.exports = router;