import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCountries,
  getActivities,
  orderByName,
  orderByPopulation,
  filterCreated,
  filterByRegion,
} from "../../redux/actions";
import Pagination from "../paginado";
import React from "react";
import CountryCard from "../countryCard";
import styles from "./home.module.css";
import SearchBar from "../searchBar";

function Home() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const allCountries = useSelector((state) => state.allCountries);
  const countries = useSelector((state) => state.countries);

  const currentPages = useSelector((state) => state.currentPage);
  const pages = 10;
  const idLastCard = currentPages === 1 ? 8 : currentPages * pages - 2;
  const idFirstCard = currentPages === 1 ? 0 : idLastCard - pages + 1;
  const totalCard = allCountries.length;
  const currentCountries = allCountries.slice(idFirstCard, idLastCard + 1);

  const [orden, setOrden] = useState("");

  useEffect(() => {
    if (allCountries.length === countries.length) {
      
      dispatch(getAllCountries());
      dispatch(getActivities());
    }
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllCountries());
  }
  function handleSelect(e) {
    e.preventDefault();
    e.target.value === "sin filtro"
      ? dispatch(getAllCountries())
      : dispatch(filterCreated(e.target.value));
    setOrden(`orden ${e.target.value}`);
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrden(`orden ${e.target.value}`);
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setOrden(`orden${e.target.value}`);
  }
  function handleFilterByContinents(e) {
    e.preventDefault();
    dispatch(filterByRegion(e.target.value));
  }

  return (
    <div className={"styles.container"}>
      <SearchBar />
      <div className="crear">
        <Link to="/activities">Crear Actividades</Link>
      </div>
      <div className={"styles.target"}>
        <div className={"styles.button"}>
          <div className={"styles.alf"}>
            <label htmlFor="">Orden Alfabético </label>
            <select onChange={(e) => handleSortName(e)}>
              <option value={"All"}>All</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Ordenar por Poblacion: </label>
            <select onChange={(el) => handleSortPopulation(el)}>
              <option value="">All</option>
              <option value="mayor">Mayor</option>
              <option value="menor">Menor</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Buscar por Continentes</label>
            <select onChange={(e) => handleFilterByContinents(e)}>
              <option value={"All"}>All </option>
              <option value={"South America"}>Sudamérica</option>
              <option value={"North America"}>Norteamérica</option>
              <option value={"Africa"}>África</option>
              <option value={"Asia"}>Asia</option>
              <option value={"Europe"}>Europa</option>
              <option value={"Oceania"}>Oceanía</option>
              <option value={"Antarctica"}>Antárctica</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Buscar por Actividad</label>
            {activities.length === 0 ? (
              <p>No se han creado actividades</p>
            ) : (
              <select onChange={(e) => handleSelect(e)}>
                <option value="sin filtro">Sin filtro</option>
                {activities?.map((e) => (
                  <option value={e.name} key={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <button onClick={(el) => handleClick(el)}>Recargar Paises</button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Link to={"/"}>
            <button>Inicio</button>
          </Link>
          <Pagination
            totalCard={totalCard}
            currentPages={currentPages}
            pages={pages}
          />
        </div>

        <div className={styles.countriesContainer}>
          {currentCountries?.map((e) => {
            return (
              <div key={e.id}>
                <CountryCard
                  id={e.id}
                  flag={e.flag}
                  name={e.name}
                  continents={e.continents}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
