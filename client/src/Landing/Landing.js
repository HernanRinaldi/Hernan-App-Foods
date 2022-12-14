//--------------------IMPORTS--------------------//
import React from 'react';
import { Link } from 'react-router-dom';
import '../Landing/Styles.css';

export default function Landing(){

    return(
           
        <div className='landing'>
            <br></br>
            <br></br>
            <h1 className='title-landing'> Put on your apron and let's get started </h1>
            <Link  to='/home' >
            <button className='button-landing'>Let's cook 
            </button>
            </Link>
        </div>

    )
}