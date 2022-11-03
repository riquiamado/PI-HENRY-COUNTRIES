import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addActivities } from "../../redux/actions";

function Validate(input) {
  let errors = {};
  if (input.name.length < 5 || input.name.length > 10) {
    errors.name = "Te falta el nombre";
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
    el.preventDefault();
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
      ...input, // se trae el estado anterior
      countries: input.countries.filter((occ) => occ !== el),
    });
  }
  useEffect(() => {
    setErrors(Validate(input));
  }, [input]);

  return (
    <div>
      <Link to="/home">
        <button>Regresar: </button>
      </Link>
      <div>
        <form onSubmit={(el) => handleSubmit(el)}>
          <div>
            <label htmlFor="">Nombre</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(el) => handleChange(el)}
            />
            <br />
            {errors.name ? <label>{errors.name}</label> : null}
          </div>
          <div>
            <label htmlFor="">Dificultad</label>
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
          <div>
            <label htmlFor="">Duración</label>
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
          <div>
            <label htmlFor="">Temporada</label>
            <label>
              <input
                type="checkbox"
                value="Invierno"
                name="season"
                onChange={(el) => handleChange(el)}
              />
              Invierno
            </label>
            <label>
              <input
                type="checkbox"
                value="Verano"
                name="season"
                onChange={(el) => handleChange(el)}
              />
              Verano
            </label>
            <label>
              <input
                type="checkbox"
                value="Primavera"
                name="season"
                onChange={(el) => handleChange(el)}
              />
              Primavera
            </label>
            <label>
              <input
                type="checkbox"
                value="Otoño"
                name="season"
                onChange={(el) => handleChange(el)}
              />
              Otoño
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
          <input type="submit" value={"Crear Actividad"}></input>

          <div>
            {input.countries.map((el) => (
              <div key={el}>
                <p>{el}</p>
                {/* <img src={el.img} alt="" /> */}
                <button onClick={() => handleDelete(el)}>X</button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActivity;
