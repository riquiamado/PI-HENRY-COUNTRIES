import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addActivities } from "../../redux/actions";

import "./createActivity.css"

function Validate(input) {
  let errors = {};
  if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(input.name)){ errors.name = 'Nombre no puede tener caracteres especiales o tildes'
}
   else  if (input.name.length < 3 || input.name.length > 10) {
    errors.name = "Deverias ingresar un nombre";
   }

  if (!input.dificulty) {
    errors.dificulty = "Debes elegir un grado de dificultad";
  } else if (parseInt(input.dificulty) < 1 || parseInt(input.dificulty) > 5) {
    errors.dificulty = "La dificulty deber estar entre 1 y 5";
  }

  if (!input.duration) {
    errors.duration = "Debes elegir el tiempo de duracion";
  } else if (parseInt(input.duration) < 1 || parseInt(input.duration) > 24) {
    errors.duration = "El tiempo de duración debe de estar entre 1 y 24";
  }

  if (!input.season) {
    errors.season = "Te falta seleccionar una temporada";
  } else if (
    !["Verano", "Invierno", "Otoño", "Primavera"].includes(input.season)
  ) {
    errors.season = "Te falta seleccionar una temporada2";
  }
  if (input.countries.length === 0) {
    errors.countries = "Te falta seleccionar un Pais";
  }
  return errors;
}

const CreateActivity = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countries);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "",
    countries: [],
  });
  const [errors, setErrors] = useState({});

  function handleChange(el) {
    
    setInput({
      ...input,
      [el.target.name]: el.target.value,
    });
    setErrors(
      Validate({
        ...input,
        [el.target.name]: el.target.value,
      }),
    );
  }

  function handleSelect(el) {
    el.preventDefault();
    if (input.countries.includes(el.target.value)) {
      return alert("este país ya esta cargado");
    } else {
      setInput({
        ...input,
        countries: [...input.countries, el.target.value],
      });
    }
  }

  function handleSubmit(el) {
    el.preventDefault();
    setErrors(
      Validate({
        ...input,
        [el.target.name]: el.target.value,
      }),
    );
    if (Object.values(errors).length === 0) {
      dispatch(addActivities(input));
      alert("Actividad Creada");
      setInput({
        name: "",
        dificulty: [],
        duration: "",
        season: [],
      });
      history.push("/home");
    } else {
      alert("complete los datos por favor");
    }
  }

  function handleDelete(el) {
    setInput({
      ...input, 
      countries: input.countries.filter((occ) => occ !== el),
    });
  }
  useEffect(() => {
    setErrors(Validate(input));
  }, [input]);

  return (
    <div className="body">
      <Link to="/home">
        <button>REGRESAR</button>
      </Link>
      <div className="formAll">
        <form  onSubmit={(el) => handleSubmit(el)}>
          <div className="formu">
            <label htmlFor="">Nombre:<br></br>
            </label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(el) => handleChange(el)}
            />
            <br />
            {errors.name ? <label>{errors.name}</label> : null}
          </div>

          <div className="formu">
            <label htmlFor="">Dificultad: </label>
            <input
              type="number"
              value={input.dificulty}
              name="dificulty"
              min="1"
              max="5"
              onChange={(el) => handleChange(el)}
            />
            <br />
            {errors.dificulty ? <label>{errors.dificulty}</label> : null}
          </div>

          <div className="formu">
            <label htmlFor="">Duración: </label>
            <input
              type="number"
              value={input.duration}
              name="duration"
              min="1"
              max="24"
              onChange={(el) => handleChange(el)}
            />
            <br />
            {errors.duration ? <label>{errors.duration}</label> : null}
          </div>

          <div className="formu">
            <label htmlFor="">Temporada:<br></br> 
            </label>
            <label>
              Invierno
              <input
                type="radio"
                value="Invierno"
                name="season"
                onChange={(el) => handleChange(el)}
              />
            </label>
            <label>
              Verano
              <input
                type="radio"
                value="Verano"
                name="season"
                onChange={(el) => handleChange(el)}
              />
            </label>
            <label>
              Primavera
              <input
                type="radio"
                value="Primavera"
                name="season"
                onChange={(el) => handleChange(el)}
              />
            </label>
            <label>
              Otoño
              <input
                type="radio"
                value="Otoño"
                name="season"
                onChange={(el) => handleChange(el)}
              />
              <br></br>
            </label>
            <br />
            {errors.season ? <label>{errors.season}</label> : null}
          </div>

          <select onChange={(el) => handleSelect(el)}>
            {country?.map((co) => (
              <option value={co.id} key={co.id}>
                {co.name}
              </option>
            ))}
          </select>
          <input className="actividad" type="submit" value={"Crear Actividad"}></input>

          <div className="paisAgregado">
            {input.countries.map((el) => (
              <div className="agregados" key={el}>
                <p>{el}</p>
                {/* <img src={el.img} alt="" /> */}
                <button onClick={() => handleDelete(el)}>Delete</button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActivity;
