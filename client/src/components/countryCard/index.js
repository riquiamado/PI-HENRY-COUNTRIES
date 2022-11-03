import React from "react";
import { Link } from "react-router-dom";
import styles from "./countryCard.modules.css";

function CountryCard({ flag, name, continents, id }) {
  return (
    <div className={styles.countryCard}>
      <div>
        <img src={flag} alt={flag} />
        <Link to={`/country/${id}`}>
          <h3>{name}</h3>
        </Link>
        <h3>{continents}</h3>
      </div>
    </div>
  );
}

export default CountryCard;
