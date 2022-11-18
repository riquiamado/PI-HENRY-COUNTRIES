import React from 'react'


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteActivity, getActivities } from '../redux/actions';

function EditActivity() {
    const dispatch = useDispatch();
    const activity = useSelector((state)=> state.activities)
    const allActivity = useSelector((state)=>state.allActivities)
     const {id}= useParams()
        const history=useHistory()

     console.log(id)
     console.log(activity)
     
   
    
   

    useEffect(() => {
      dispatch(getActivities(id))
      
      
    }, [dispatch,id])

    const handleClick = (id) =>{
        dispatch(deleteActivity(id))
       
        window.location.reload()
          
        //    history.push("/home")
       }
      
    
    
  return (
    <div>
        <h1>Actividades</h1>
        <Link to={"/home"} >
        <button>Volver</button>
        </Link>
        <div>
       {
        activity.map(el=>(
           <div key={el}>

            <h2>{el.name}</h2>
            {el.id}
            <button onClick={() =>handleClick(el.id)}>delete</button>
           </div> 
        ))
       }
      </div>
    </div>
  )
}

export default EditActivity