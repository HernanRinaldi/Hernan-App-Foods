
//------------IMPORTS--------------------//

import  rootReducer  from './Reducer';
// nos trajimos el reducer //
import { legacy_createStore as createStore, applyMiddleware}  from 'redux';
// nos trajimos createStore para crear el store y 
// applyMiddleware es para aplicar midlerares a la store //
import { composeWithDevTools } from 'redux-devtools-extension';
// el compose nos permite ver las devtools //
import thunk from 'redux-thunk';
// sirve para ver cosas de forma asincronicas //
// osea realizar todos los pedidos de informacion //
const   store= createStore( rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;