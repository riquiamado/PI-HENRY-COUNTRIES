const { Router } = require("express");
const { Activity, Country } = require("../db.js");
const { countriesDb } = require("./getAllData.js");


const router = Router();

router.get("/", async (req, res) => {
  try {
    const getAllActivities = await Activity.findAll();
    getAllActivities.length
      ? res.status(200).json(getAllActivities)
      : res.status(404).send("No se encontraron actividades");
  } catch (error) {
    console.log("ACA ESTA OTRO ERROR", error);
  }
});

router.get("/:id",async (req, res)=> {
  const id = req.params.id;
  try {
     const filterId = await Activity.findAll()
     if(id) {
      const filter = await filterId.filter(el => el.id === id)
      
      filter.length?
      res.status(200).send(filter)
      : res.status(404).send("actividad no encontrada")

     }
  } catch (error) {
     console.error(error)
  } 
})


router.post("/", async (req, res) => {
  const {
    name,
    dificulty,
    duration,
    season,
    countries,

  } = req.body;
  console.log(countries)
  try {
    if (!name || !dificulty || !duration || !season ||!countries) {
      return res.status(404).send("Te faltaron algunos campos");
    }
    const activityCreate = await Activity.create({
      name,
      dificulty,
      duration,
      season
    });

    const country = await Country.findAll({
      where: { id: countries },
    });
     
    await activityCreate.addCountry(country);

    return res.send(activityCreate);
  } catch (error) {
    console.log("ERROR EN EL POST", error);
  }
});

router.delete("/:id",async(req,res)=>{
  try {
    const {id}=req.params
    console.log(id)
     await Activity.destroy({
      where:{id:id}
     })
     res.status(200).send("delete ok")
  } catch (error) {
    console.log("no se borro nada", error)
  }
})

 router.put("/:id",async(req, res)=>{
    const {id}  = req.params
    const {name,difficulty,duration,season} = req.body
    try {
       await Activity.update({name,difficulty,duration,season}
        ,{where:{id:id}})
        res.status(201).send("actividad actualizada")
    } catch (error) {
      console.error("no se actualizo nada",error)
    }
 } )

module.exports = router;
