//-----------------------IMPORTS---------------------------//
import {
    ALL_RECIPES,
    FILTER_DIETS,
    ORDER_ALL,
    GET_DIETS,
    CREATE,
    FILTER_ID,
    CLEAN_DETAIL,
    SEARCH_TITLE,
    
} from './Action';

//-----------------------STATES-----------------------------//

const initialState = {
allRecipes:[],
diets:[],
detail:[],
showedRecipes:[],
};

//-----------------------GET RECIPES-------------------------//
const rootReducer = (state = initialState, action) => {
    //console.log('detail en estado: ', state.detail)
  //console.log(' estado desde el back: ', state)
    switch ( action.type ) {
        case ALL_RECIPES:
            return{
                ...state,
                allRecipes: action.payload,
                showedRecipes: action.payload
            }
//--------------------------ORDERS----------------------------//            
        case ORDER_ALL:
                if( action.payload === "A-Z" || action.payload === "Z-A" ){ 
            let sort = action.payload === "A-Z" ? state.allRecipes.sort(function (a, b) {
                  if (a.title > b.title) {
                    return 1;
                  }
                  if (b.title > a.title) {
                    return -1;
                  }
                  return 0;
                })
              : state.allRecipes.sort(function (a, b) {
                  if (a.title > b.title) {
                    return -1;
                  }
                  if (b.title > a.title) {
                    return 1;
                  }
                  return 0;
                })
          return {
            ...state,
            allRecipes: sort,
          }};
          if( action.payload === "Less healthy" || action.payload === "Healthier" ){ 
            let sort = action.payload === "Less healthy" ? state.allRecipes.sort(function (a, b) {
                  if (a.healthScore > b.healthScore) {
                    return 1;
                  }
                  if (b.healthScore > a.healthScore) {
                    return -1;
                  }
                  return 0;
                })
              : state.allRecipes.sort(function (a, b) {
                  if (a.healthScore > b.healthScore) {
                    return -1;
                  }
                  if (b.healthScore > a.healthScore) {
                    return 1;
                  }
                  return 0;
                })
          return {
            ...state,
            allRecipes: sort,
          }};
 
//-----------------------GET DIETS----------------------------//
        case GET_DIETS:
                    var allDiets = action.payload.map( (e)=>e.name )
                    //console.log("todas las dietas: ",allDiets)
            return {
                ...state,
                diets: allDiets 
            }

//-----------------------FILTER DIETS-------------------------//
        case FILTER_DIETS:

            state.allRecipes = state.showedRecipes;
            let b =  state.allRecipes?.filter( e => e.diets.includes( action.payload) )
            
            return {
                ...state,
                allRecipes: b
            }
//-------------------------CREATE-----------------------------// 
        case CREATE:
              return{
                ...state
              }
//-------------------------FILTER BY ID------------------------//
        case FILTER_ID:
              return {...state,
                    detail: action.payload
                  }
//-------------------------CLEAN DETAIL-----------------------//
        case CLEAN_DETAIL:
              return {...state,
                    detail: []
                  }
//-------------------------SEARCH -----------------------------//
        case SEARCH_TITLE:
          //console.log('info de search: ',action.payload)
          return{
            ...state,
            allRecipes : action.payload
          }          

//-------------------------DEFAULT-----------------------------//
        default:
            return { ...state }
            
    }
}

export default rootReducer;