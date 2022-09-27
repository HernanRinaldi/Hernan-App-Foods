
//----------------------IMPORTS------------------------//
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { filterById, cleanDetail } from "../Redux/Action";
import "../Detail/Styles.css";
import Loading from '../Loading/Loading';
//--------------------FUCNTION DETAIL-------------------//
export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  //console.log("este es el id: " + id);
  
//---------------------USEEFFECT------------------------//
  useEffect(() => {
    dispatch(filterById(id));
    return () => {
      dispatch(cleanDetail())
      
    }
  }, [id, dispatch]);

//----------------------STATE--------------------------//
  const data_detail = useSelector((state) => state.detail);
  //console.log("aca el data_detail: ", data_detail)


//-------------------------RETURN----------------------//
  return (
<div className="contenedor" >
{ <div className="detail-db" >
{/*-------------------------IMAGE-------------------- */}
<div>
  <img className="img-detail"
   src={ data_detail?.image || data_detail[0]?.image } />
</div>
{/*-------------------------TITLE-------------------- */}
<div>
 <h1> { data_detail?.title || data_detail[0]?.title } </h1>   
</div>
{/*-------------------------DIETS-------------------- */}
<div>
 { <p className="style-steps"><h3>Diets:</h3><p>{ data_detail[0]?.diets.map((d , i)=>(<p key={i}>{d}</p> )) || data_detail.diets?.map((e , i)=>( <p key={i}>{ e.name }</p> )) } </p></p>} 
</div>
{/*--------------------HEALTHSCORE------------------- */}
<p className="style-steps"> <h3>healthScore:</h3>  { data_detail[0]?.healthScore || data_detail?.healthScore} </p>
{/*-------------------------STEPS-------------------- */}
<div  >
      <p className="style-steps">{  data_detail?.steps || 
          data_detail[0]?.steps.map( ( e , i )=> ( <p key={i}><h3>step {i + 1}:</h3>  { e.step } </p> ) ) 
          } </p>  
</div>
{/*------------------------SUMMARY-------------------- */}
<div >
<p className="summary-detail"> <h3 style-className="style-steps" >Summary:</h3>  { data_detail?.summary || data_detail[0]?.summary.replace(/<[^>]+>/g, "") }</p>
</div>

{/*-------------------------BUTTON-------------------- */}
<Link to="/home">
    <button className="button-detail">Go Home</button>
</Link>

</div>
}
 
    </div>
    
  );
}

// {Array.isArray(steps) ? steps.map((ele) => {
//   return (
//       <p  key={ele.number}>{ele.number}: {ele.step}</p>
//   )
// }) : <p >{steps}</p>}


