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
          <h2>Capital: {details.capital}</h2>
          <h2>Continents: {details.continents}</h2>
          <h2>Subregion: {details.subregion}</h2>
          <h2>
            Area: {details.area?.toLocaleString("es-AR") || ""} km<sup>2</sup>
          </h2>
          <h2>
            Poblation: {details.population?.toLocaleString("es-AR") || ""}
          </h2>
        </div>
        <div className="actividades">
          <h1>Actividades</h1>
          {details.Activities &&
            details.Activities.map((el) => {
              return (
                <div key={el.id}>
                  <h2>Nombre de actividad: </h2>
                  <h3>{el.name}</h3>
                  <h2>Dificultad de actividad: </h2>
                  <h3>{el.dificulty}</h3>
                  <h2>Duracion de actividad: </h2>
                  <h3>{el.duration}</h3>
                  <h2>Temporada de actividad: </h2>
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
