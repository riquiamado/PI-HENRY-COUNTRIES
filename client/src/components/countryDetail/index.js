import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getCountriesDetails, Clean } from "../../redux/actions";
import "./countryDetail.css";
import Loading from "../../loading/Loading";



const CountryDetail = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountriesDetails(id));
    return dispatch(Clean());
  }, [dispatch, id]);

  console.log(details);

  return details && details.id ? (
    <section className="todo">
      <Link to={"/home"}>
        <button className="btn">Volver</button>
      </Link>
      <div className="containerCard">
        <div className="detalles">
          <img src={details.flag} alt={details.flag} />

          <h1>{details.name}</h1>
          <label>Capital</label>
          <h3>{details.capital}</h3>
          <label>Continents</label>
          <h3>{details.continents}</h3>
          <label>Subregion</label>
          <h3>{details.subregion}</h3>
          <label>Area</label>
          <h3>
            {details.area?.toLocaleString("es-AR") || ""} km<sup>2</sup>
          </h3>
          <label>Poblation</label>
          <h3>
            {details.population?.toLocaleString("es-AR") || ""} Hab.
          </h3>
        </div>
        <div className="actividades">
          <h1>Actividades</h1>
          {details.Activities &&
            details.Activities.map((el) => {
              return (
                <div key={el}>
                  <label>Nombre de actividad: </label>
                  <h3>{el.name}</h3>
                  <label>Dificultad de actividad: </label>
                  <h3>{el.dificulty} </h3>
                  <label>Duracion de actividad: </label>
                  <h3>{el.duration} Hs</h3>
                  <label>Temporada de actividad: </label>
                  <h3>{el.season}</h3>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  ) : (
   
      <Loading/>
    
  )
};

export default CountryDetail;
