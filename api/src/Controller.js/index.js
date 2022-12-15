//------------------IMPORTS---------------//
const axios = require("axios");
const { types } = require('../Controller.js/diets');
const { Recipe, Diet, Op } = require("../db");
const { KEY } = process.env;

//-----------------ENDPOINTS--------------//
const API = `https://spoonacular.com/food-api`;
const API1 = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&addRecipeInformation=true&number=100`;

//------------------------FUNCTIONS----------------------//
//----------GET ALL RECIPES--------//
const getAllRecipes = async (req, res) => {
  
  const { title } = req.query; 
  
  try { 
    
    if(!title){  
  
      const api = await axios.get( API1 );
      //-------filtro info de la api---------//
      const info_api = await api.data.results?.map((e) => {
        return { 
          id: e.id, 
          title: e.title,
          image: e.image,
          diets: e.diets?.map((e) => e),
          healthScore: e.healthScore,
          dish: e.dishTypes?.map((e) => e), 
          summary: e.summary,
          steps: e.analyzedInstructions[0]?.steps.map((e) => {
            return {
              number: e.number,
              step: e.step,
            };
          }),
        };
      });
      //----------busco info en base de datos--------//
      const DB =  await Recipe.findAll({ include:{
          model: Diet,
          attibutes:["name"],
          through: { 
              attributes: [], 
            }, 
      }       
      })
      var dato = JSON.parse( JSON.stringify(DB, null, 2))
      dato.forEach(ele=>ele.diets = ele.diets.map(el=>el.name))  
      //----------aca concateno la info---------------// 
      const allRecipes= [...dato, ...info_api ] 
   
      res.status(200).send(allRecipes);   
     
  }else{//--------- busqueda by name ----- //       
   
        const apiUrl2 = await axios.get( API1 );
        const apiInfo2 = await apiUrl2.data.results.filter((n) => n.title.toLowerCase().includes(title.toString().toLowerCase()));
        //ACA PIDO EL NOMBRE A LA API //
         // ACA MAPEO SOLO LO QUE QUIERO DE LA API //
         const apiInfo5 = await apiInfo2?.map((n) => {  
          return { 
            id: n.id,  
            title: n.title,  
            image: n.image, 
            diets: n.diets?.map((e) => e), 
            healthScore: n.healthScore, 
            dish: n.dishTypes?.map((e) => e), 
            summary: n.summary,
            steps: n.analyzedInstructions[0]?.steps.map((n) => {
              return {
                number: n.number,  
                step: n.step,  
              };
            }), 
          };  
        }); 

        const DB1 =  await Recipe.findAll({ include:{
          model: Diet,
          attibutes:["name"],
          through: { 
            attributes: [], 
          }, 
        }       
      })
      var dato = JSON.parse( JSON.stringify(DB1, null, 2))
      dato.forEach(ele=>ele.diets = ele.diets.map(el=>el.name)) 
      
      
          const filtTitle = dato.filter((n) => n.title.toLowerCase().includes(title.toString().toLowerCase()))
          const getDbAll = [...filtTitle, ...apiInfo5]

        res.status(200).send( getDbAll )
  }
    
  } catch (error) {
    res.status(404).send(error);
  }

};

//------------------------------------GET RECIPE ID-------------------------------------//
const getRecipeId = async (req, res) => {
  
    const { id } = req.params;
    
    try {
    if( Number(id)){  
        
            const api2 = await axios.get( API1 );
            const api_id = await api2.data.results?.filter((e)=> e.id == [id])
            const id_detail = await api_id?.map((e)=>{
                return{ 
                    id: e.id,
                    title: e.title, 
                    image: e.image, 
                    dish: e.dishTypes,
                    healthScore: e.healthScore,
                    summary: e.summary,
                    steps: e.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    }), 
                    diets: e.diets  
                }
            })
            res.status(200).send(id_detail)

    }else{
        
      const id_db = await Recipe.findByPk(id, {
        include: {
            model: Diet,

        } 
    })

        res.status(200).send( id_db )
    }
    } catch (e) {
        res.status(404).json({e:'Error when search by id API/DB'})
}

};

//-----------------------------------GET DIETS------------------------------------//
const getDiets = async (req, res) => { 
         
    try {
      types.forEach(async n => {
          await Diet.findOrCreate({
              where: {
                  name: n
              }
          })
      });
      const diets = await Diet.findAll();
      res.status(200).send(diets)
  } catch (error) {
      console.log(error);
  }

};   

//------------------------------CREATE RECIPE----------------------------------//
const createRecipe = async (req, res) => {
  const { title, image, healthScore, summary, steps, diets } = req.body;
  try {
    // cargo las propiedades en el modelo receta db //
    const newRecipe = await Recipe.create({
      title, 
      image:
      image || "https://thehalalworld.com/uploads/pages/Garbanzo-Bean-Soup.jpg",
      healthScore:
      healthScore || 50, 
      summary,  
      steps 
  });
  const dietDB = await Diet.findAll({ 
    where: { name : diets }     
})

  newRecipe.addDiet(dietDB);
  res.status(200).send('Recipe created successfully')
  } catch (e) {
    res.status(404).res.json({ e: "Error when create Recipe" });
  } 
};

module.exports = {
  getAllRecipes,
  getRecipeId,
  getDiets,
  createRecipe,
};
