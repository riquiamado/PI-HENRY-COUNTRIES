import React from "react";
import { Link } from "react-router-dom";
import  "./countryCard.css";

function CountryCard({ flag, name, continents,population, id }) {
  return (
    <div className={"card-count"}>
      
        
        <img  src={flag} alt={flag} />
        
        <Link to={`/country/${id}`} 
        style={{"textDecoration":"none","color":"black"}} >
          <label htmlFor="">Pais</label>
          <h3 >{name}</h3>
        </Link>
        <label htmlFor="">Continente</label>
        <h3 >{continents}</h3>
        <label htmlFor="">Poblation</label>
        <h3>{population?.toLocaleString("es-AR") || ""} Hab. </h3>
      
    </div>
  );
}

export default CountryCard;
