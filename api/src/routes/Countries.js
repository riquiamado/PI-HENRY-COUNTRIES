const { Router } = require("express");
const { Activity, Country } = require("../db.js");
const { countriesDb} = require("./getAllData.js");


const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    await countriesDb()
    let totalCountries = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "dificulty", "duration", "season"],
        through: { attributes: [] },
      },
    });
  
    if (name) {
      const filteredCountries = await totalCountries.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase()),
      );

      return filteredCountries.length
        ? res.status(200).json(filteredCountries)
        : res.status(404).send("sigue intentando");
    }

    return res.status(200).json(totalCountries);
  } catch (error) {
    res.status(404).send("error")
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const idCountries = await Country.findOne({
    where: {
      id: id.toUpperCase(),
    },
    include: {
      model: Activity,
      attributes: ["name", "dificulty", "duration", "season"],
      through: { attributes: [] },   
    },
  });
  if (id) {
   
    idCountries
      ? res.status(200).json(idCountries)
      : res.status(404).send("Ningun pais coincide con este ID");
  }
});



module.exports = router;
