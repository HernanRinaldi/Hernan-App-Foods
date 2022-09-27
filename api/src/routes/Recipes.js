//------------------IMPORTS-------------------//
const { Router } = require('express');
const { getAllRecipes, getRecipeId, createRecipe } = require('../Controller.js/index.js');
const router = Router();


//--------------GET RECIPES-------------//
router.get('/', getAllRecipes )
router.get('/:id', getRecipeId )

//-------------POST RECIPE--------------//
router.post('/create', createRecipe)

module.exports = router;