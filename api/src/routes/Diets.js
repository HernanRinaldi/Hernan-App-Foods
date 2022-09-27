//------------------IMPORTS-------------------//
const { Router } = require('express');
const { getDiets } = require('../Controller.js/index');
const router = Router();

//----------GET DIETS----------//
router.get('/', getDiets);

module.exports = router;