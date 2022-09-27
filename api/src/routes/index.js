//------------------IMPORTS-------------------//
const { Router } = require('express');
const router = Router();
const allRecipes = require('./Recipes');
const allDiets = require('./Diets');
 
//----------MIDDLEWARES---------//
router.use('/recipes' , allRecipes )
router.use('/diets' , allDiets )

module.exports = router;
 