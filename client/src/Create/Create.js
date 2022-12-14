//--------------------------IMPORTS-------------------------//

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createRecipe, getDiets } from "../Redux/Action";
import '../Create/Styles.css';

export default function Create(){

//--------------------------STATES-------------------------------//
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    //console.log("diets para renderizar: ", diets)
    const recipes = useSelector((state) => state.allRecipes)
    const history = useHistory()
    const [errors, setErrors] = useState({})    
//-------------------------USEEFFECT------------------------------//
    useEffect(() => {
        dispatch(getDiets())
      }, [dispatch])
//------------------------STATE LOCAL FORM------------------------//
const [ input, setInput ] = useState({
    title: '',
    summary: '',
    healthScore: 50,
    steps: '',
    image: '',
    diets: []
  })
//------------------------VALIDATIONS-----------------------------//
let validateTitle = /^[a-zA-Z\s]+$/;
let validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

const validate = (input) => {
  let errors = {}
  
  if (!input.title.length) {
    errors.title = 'Title cannot be empty'
  }

  if (!validateTitle.test(input.title)) {
    errors.title = 'Special characters or numbers are not allowed'
  }

  if (recipes.find((e) => e.title.toLowerCase() === input.title.toLowerCase())) {
    alert(`The title ${input.title} already exist, please choose another one!`)
  }
  if (input.image && !validateUrl.test(input.image)) {
    errors.image = 'This is not a valid URL'
  }

  if (!input.summary.length) {
    errors.summary = 'Summary cannot be empty'
  }

  if (input.summary.length < 40) {
    errors.summary = 'Summary must be at least 40 characters'
  }

  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = 'The healt score must be a number between 1 - 100'
  }
  
  if (!input.steps.length) {
    errors.steps = 'Your recipe must have steps to follow'
  }
  
  if (input.steps.length < 40) {
    errors.steps = 'Your recipe must have more details'
  }

  return errors;
  
}
//-------------------------FUNCTIONS FORM-------------------------//
function handleChange(e){
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    )
  }
  
  function handleSelect(e){
    if (!input.diets.includes(e.target.value)) {
      setInput({
          ...input,
          diets: [...input.diets, e.target.value]
      })
      setErrors({
        ...input,
        [e.target.name] : e.target.value
      })
    }
    else {
      return alert('diet is already added')
    }
  }
  
  function handleDietDelete(diet){
    setInput({
        ...input,
        diets: input.diets.filter(d => d !== diet)
    })
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    //console.log("info del estado: ", input)
    
    if (Object.keys(errors).length === 0 && input.diets.length > 0) {
      dispatch(createRecipe(input))
      alert('Recipe created successfully')
      //console.log("info del estado: ", setInput)
      setInput({
        title: '',
        summary: '',
        healthScore: 50,
        steps: '',
        image: '',
        diets: [],
      })
      
      history.push('/home')
    } else {
      alert("check the fields")
    } }
//-------------------------RETURN----------------------//
    
return (
<div className="form-container" >


    <h1 className="title-form" >Create your Recipe</h1>

      {/*--------------------DIETS--------------------- */}
                      <div >
      <select className='select-diets' onChange={(e)=> handleSelect(e)}>
      <option value="" hidden name="diets">Select Diets:</option>
      {diets?.map(ele => {
      return ( <option value={ ele } key={ele.id}>{ ele }</option>)
      })
      } 
      {/*-------------------VIEWS DIETS----------------- */}
      </select>
      <ul>
                                  
      {input.diets?.map(( diet, i ) => 
      <div key={ i } >
      <p className="view-diet" >{diet}</p>
      <button type='button' className='button-delete' onClick={() => handleDietDelete(diet)}>x</button>
      </div>
      )}
      
      </ul>
    </div>

      {/*-----------------------NAME------------------------ */} 
    <form  onSubmit={(e) => handleSubmit(e)}>
    <div >
      
      <input
      className="input-form" 
      placeholder="Title..."
      type="text" value={input.title} 
      name="title" 
      onChange={(e) => handleChange(e)} />
      {errors.title && <p className="error-form" >{errors.title}</p>}
    </div>
    {/*--------------------------SUMMARY----------------------- */}
    <div >
      
      <textarea
      className="input-form" 
      placeholder="Summary..."
      type="text" 
      value={input.summary} 
      name="summary" 
      maxLength="1000" 
      onChange={(e) => handleChange(e)}>
      </textarea>
      {errors.summary && <p className="error-form">{errors.summary}</p>}
    </div>
      
    {/*-----------------------------STEPS------------------------ */}
    <div className=''>
    
      <textarea 
      className="input-form"
      placeholder="Steps..."
      type="text" 
      value={input.steps} 
      name="steps" 
      onChange={(e) => handleChange(e)}>
      </textarea>
      {errors.steps && (<p className="error-form" >{errors.steps}</p>)}
    </div>
      {/*----------------------------IMAGE------------------------ */}
    <div className=''>
      
      <input
      className="input-form"
      placeholder= "Load URL Image..." 
      type="url" 
      value={input.image} 
      name="image" 
      onChange={(e) => handleChange(e)} />
      {errors.image && <p className="error-form" >{errors.image}</p>}
    </div>

      {/*------------------------HEALTH SCORE----------------------- */}
    <div className=''>
      <label className='Health-score'>Health score</label>
      <input 
      className="range"
      type="range" min="0" max="100" 
      value={input.healthScore} 
      name="healthScore" 
      onChange={(e) => handleChange(e)} />
      {<p className="value" > Value: {input.healthScore}</p>}
    </div>
      {/*----------------------------BUTTONS------------------------ */}
    <div>

    <Link to="/home" >
    <button className="button-form">Go Home</button>
    </Link>

      <button className='button-form' 
      type="submit" 
      onClick={(e) => handleSubmit(e)}>Create</button>
    </div>
    <p className="important" >Important!!!</p>
    <p className="important" >Complete all the fields to create the recipe</p>
  </form>
</div>
)
} 