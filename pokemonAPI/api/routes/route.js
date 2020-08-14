const app = require('express')
const router = app.Router()
const controller =require('../controller/controller')

router.get("/",controller.index)
router.get("/listPokemon",controller.listpokemon)
router.get("/FormsPokemon",controller.Forms)
router.get("/eggGroup",controller.eggGroup)
router.get("/ListeggGroup",controller.ListeggGroup)
module.exports = router;