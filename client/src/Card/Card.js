
//---------------IMPORTS---------------//
import React from 'react';

//----------------CSS-------------------//
import  '../Card/Styles.css'

//-----------FUCNTION CARD-----------------//
export default function Card( { title, image, diets } ){
    
    return(
        
        <div className='card'>
            
            <img 
            src={ image } 
            alt='img-Flag'
            className='img-card' 
            ></img>

            <h3 className='title-card'
             >{ title } </h3>

            <h4 
            className='text-diets'
             > { diets }</h4>
           

        </div>
    )
}

