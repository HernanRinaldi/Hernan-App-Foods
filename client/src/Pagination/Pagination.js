import React  from "react";
import './Styles.css';

export default function Pagination({ recipePerPage, recipes, paginado}){
    const pageNumbers = []

    for(let i=0; i < Math.ceil( recipes/recipePerPage ); i++){
        pageNumbers.push(i + 1);
    }

    return (
        <div className="pagination-container" >
            <ul className="pagination">
                {
                    pageNumbers?.map(number => (

                        <button className="button-pagination" 
                        onClick={() => paginado(number)} 
                        key={number}> {number} </button>
                    ))
                }
            </ul>
        </div>
    )
}