import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getCountriesByName } from "../../redux/actions";
import styles from "./searchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputCountries(el) {
    el.preventDefault();
     if(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(el.target.value)){
      return alert("solo deves ingresar letras")
     }else{
      setName(el.target.value);
     }
      
     
    
  }

  function handleSubmit(el) {
    el.preventDefault();
    if (!name) return alert("Debes ingresar un pais");
    else if(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(name)){
     return   alert("Los datos ingresados deben ser solo letras")
    }

    else {
      dispatch(getCountriesByName(name));
      setName("");
    }
  }

  return (
    <div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Ingrese un Pais"
          value={name}
          onChange={(el) => handleInputCountries(el)}
          className={styles.input}
        />
        <button
          className={styles.btn}
          type="submit"
          onClick={(el) => handleSubmit(el)}>
          Buscar Pais
        </button>
      </div>
    </div>
  );
}
