
//--------------------------IMPORTS---------------------------//
import axios from 'axios';

//--------------------------VARIABLES--------------------------//
export const ALL_RECIPES = "ALL_RECIPES";
export const ORDER_ALL = "ORDER_ALL";
export const FILTER_DIETS = "FILTER_DIETS";
export const GET_DIETS = "GET_DIETS";
export const CREATE = "CREATE";
export const FILTER_ID = "FILTER_ID";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const SEARCH_TITLE = "SEARCH_TITLE";

//-----------------------------URL-----------------------------//
const URL =  "/recipes";
const URL1 =  "/diets";
const URL2 = "/recipes?title=";
const URL3 =  "/recipes/create";

//-----------------------GET ALL RECIPES-----------------------//
export const getRecipes = ()=>{
    
    return async function( dispatch ){
        try {
            const recipes = await axios.get( "/recipes" );
            //console.log('info del back: ', recipes.data)
    
            return dispatch({
                type: ALL_RECIPES,
                payload: recipes.data 
            })
        } catch (error) {
            console.log(error)
        }

    }
} 
//-------------------------SEARCH----------------------------//
export const search_title = function( payload ){
    try {
        return async function( dispatch ){
            let title = await axios.get( `/recipes?title=${payload}`)
            return dispatch({
                type: SEARCH_TITLE,
                payload: title.data
            })

        }
        
    } catch (error) {
        console.log(error)
    }
}
//-------------------------GET DIETS--------------------------//
export const getDiets = ()=>{
    return async function(dispatch){
        try {
            const diets_db = await axios.get( "/diets" )
        //console.log('info data base: ', diets_db.data)

        return dispatch({
            type: GET_DIETS,
            payload: diets_db.data
        })
        } catch (error) {
            console.log(error)
        }
        
    }
}
//---------------------------DETAIL----------------------------//
export const filterById= function( id ){
    return async function( dispatch ){
        const detail= await axios.get( `/recipes/${id}` )
        //console.log("detail en action: ",detail.data)
        return dispatch({
            type: FILTER_ID,
            payload: detail.data
        })
    }
}
//--------------------------CREATE----------------------------//
export const createRecipe = function(payload){
    
    return async function(dispatch) {

        try {
            const response = await axios.post( `/recipes/create/${payload}`)
            //console.log("info hacia el back: ", payload)
            return dispatch({
                type: CREATE,
                payload: response
            })
        } catch (error) {
            console.log(error)
        }
    }
}
//---------------------------ORDERS----------------------------//
export const orderAll =  function( payload ){
    return{
        type: ORDER_ALL,
        payload
    }
}

//-------------------------FILTER DIETS-------------------------//
export const filterDiets = function( payload ){
    return{
        type: FILTER_DIETS,
        payload
    }
}


//---------------------------CLEAN DETAIL------------------------//
export function cleanDetail(){
    return{
      type: CLEAN_DETAIL,
    }
  }
