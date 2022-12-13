import axios from "axios";

import {
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  GET_ALL_COUNTRIES,
  GET_COUNTRIES_DETAILS,
  GET_ACTIVITIES,
  FILTER_CREATED,
  FILTER_BY_REGION,
  ADD_ACTIVITIES,
  GET_COUNTRY_BYNAME,
  CLEAN,
  SET_PAGE,
  DELETE_ACTIVITY
 
} from "./componentes";

export function getAllCountries() {
  return  function (dispatch) {
     axios.get(`http://localhost:3001/countries`)
     .then(response => response.data)
     .then(data => dispatch({ type: GET_ALL_COUNTRIES, payload:data }))
         
  };
}


export function  getCountriesByName(name){
  return  async function(dispatch){
    try {
       const res= await  axios.get(`http://localhost:3001/countries?name=${name}`)
    
    dispatch({type:GET_COUNTRY_BYNAME,  payload:res.data})
    } catch (error) {
     alert("No existe este pais sigue intentando")
    }
    
      
    } 
  }
  


export function getActivities() {
  return async function (dispatch) {
    try {
      const info = await axios.get(`http://localhost:3001/activities`);
      return dispatch({ type: GET_ACTIVITIES, payload: info.data });
    } catch (error) {
      console.log(error);
    }
   
  };
}

export function getCountriesDetails(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/countries/${id}`);
    return dispatch({ type: GET_COUNTRIES_DETAILS, payload: json.data });
    } catch (error) {
      console.log(error);
    }
    
  };
}

export function filterByRegion(payload) {
  return {
    type: FILTER_BY_REGION,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}

export function deleteActivity(id) {
  return async function (dispatch) { 
     try{ 
      const activity = await axios.delete(`http://localhost:3001/activities/${id}`)
      return dispatch({ 
        type: DELETE_ACTIVITY, 
        payload: activity, 
      });
     } catch (error){
      alert(error,"daleee")
     }
  };
};
// export function deleteActivity(payload){
//   return function (dispatch){
   
//     dispatch({type:DELETE_ACTIVITY, payload:payload})
//   }
  
// }


export function addActivities(payload) {
  return async function (dispatch) {
    try {
      let info = await axios.post("http://localhost:3001/activities", payload);
      
      return dispatch({
        type: ADD_ACTIVITIES,
        payload: info.data,
        
      });
      
    } catch (error) {
       alert("esta actividad ya fue creada")
  };
    }
   
}
export function setCurrentPage(page) {
  return {
    type: SET_PAGE,
    payload: page,
  };
}

export function Clean() {
  return function (dispatch) {
    dispatch({
      type: CLEAN,
    });
  };
}
