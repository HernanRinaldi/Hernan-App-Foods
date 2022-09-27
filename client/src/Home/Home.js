//--------------------IMPORTS--------------------//
import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

//-----------------IMPORT COMPONETS--------------//
//import Loading from '../Loading';
import Card from '../Card/Card';
import Nav from '../Nav/Nav';
import Pagination from '../Pagination/Pagination';
import '../Home/Styles.css';

import { 
    getRecipes,
    orderAll,
    filterDiets,
    getDiets,

} from '../Redux/Action';


//--------------------HOME----------------------//
export default function Home(){ 
    
//---------------STATES AND DISPATCH-------------//
    const dispatch = useDispatch();
    const recipes = useSelector( (state) => state.allRecipes );
    // STATE FOR ==>> PAGINATION - RENDER CARDS - 
    //console.log('info qque llega al home: ', recipes)
    const diets = useSelector( (state) => state.diets );

//-----------------STATE ORDER------------------//    
    const [order, setorder] = useState('');
//-----------------STATE FILTER------------------//
    const [filter, setfilter] = useState('');

//-----------------PAGINATION--------------------//
const [currentPage, setCurrentpage] = useState(1);
const [recipePerPage, setCountryPerPage] = useState(9);
const indexOfLastRecipe = currentPage * recipePerPage;
const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
const currentRecipe = recipes.length > 2 ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe) : recipes
// console.log(currentCountry);
const paginado = (pageNumber) => {
setCurrentpage(pageNumber);
};

//--------------------USEEFFECT------------------//
useEffect(() => {
dispatch(getRecipes())  
dispatch(getDiets()) 

}, [ dispatch ])
//--------------------- BUTTON-------------------//
  function Refresh_recipes(e) {
    e.preventDefault();
    dispatch(getRecipes());
    setCurrentpage(1);
  }
//--------------------HANDLE ORDER-----------------//
function handleOrder(e){
    e.preventDefault();
    dispatch(orderAll( e.target.value ));
    setorder(`Ordenado ${e.target.value}`);
    setCurrentpage(1);
}
//--------------------HANDLE ORDER-----------------//
function handleDiets(e){
    e.preventDefault();
    dispatch( filterDiets(e.target.value));
    setfilter( `Filtrado${e.target.value}`);
    setCurrentpage(1);
}

//----------------------RETURN-----------------------// 
    return (
        <div>
        {/*----------------------NAV-------------------- */}
            <Nav/>

        {/*------------ BUTTON ALL RECIPES --------------- */}
        <button
          className='button-home'
          onClick={(e) => {
            Refresh_recipes(e);
          }}
        >
          All Recipes
        </button>
        {/*-----------------------ORDERS--------------------- */}
        <select className='select-home' onChange={ (e)=> handleOrder(e) } >
            <option>Orders:</option>
            <option className="option" >A-Z</option>
            <option className="option" >Z-A</option>
            <option className="option" >Less healthy</option>
            <option className="option" >Healthier</option>
        </select>
        {/*----------------------FILTER DIETS------------------ */}

        <select className='select-home' onChange={ (e)=> handleDiets(e) } >
           <option>Filters:</option>
            { 
                diets.map( ( e , i )=>{ 
                return( <option key = { i } value = { e }> { e } </option> )} )

            }
        </select>
        {/*-----------------------BUTTON CREATE----------------- */}
            <Link to='home/create' >
            <button className='button-home' >Create</button>
            </Link>

        {/*-----------------------RENDERING CARDS-----------------*/}
        <div className='container-body' >

            { currentRecipe.length?
            currentRecipe.map( ( e , i )=>{ 
                return(
                    <div key = {i} className="styles-styles-card">
                        <Link to = {`/home/${e.id}`}>
                            <Card 
                                  id = { e.id }
                                  image = { e.image }
                                  title = { e.title }
                                  diets = { e.diets?.map((d) => ( 
                                    d.title ?
                                        <p  key={d} > {d.title} </p>
                                        : <p key={d}> {d} </p>))}
                                
                            />
                        </Link>
                    </div>
                )
             } )
             :(
              <div>
                <h3 className='msg-notFond' >Sorry, recipe not found or problem with API!!!</h3>
                <h4 className='msg-notFond' >Press All Recipes</h4> 
              </div>  
 
             )

            }
        </div>

        {/*--------------------------PAGINATED---------------------- */}

      <div className="pagination">
        <Pagination
          recipePerPage = { recipePerPage }
          recipes = { recipes.length }
          paginado = { paginado }
        />
      </div>


        </div>

    )
    
}