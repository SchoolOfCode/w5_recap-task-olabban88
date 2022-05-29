import express from "express";
import * as catsModels from "../models/cats.js";

const router = new express.Router();

router.get("/", async (req, res) => {
  
  if(Object.keys(req.query).length !== 0) {
    
    if(req.query.name) {
      
      const name = req.query.name;
      
      const cat = await catsModels.getCatByName(name);
      
      res.json({
        succes: true,
        message: `Here is the cat with name '${cat.name}'`,
        payload: cat
      });
     
    }else{
      
      res.json({
        succes: true,
        message: `There is not cat matching your query`,
      });
    }
  
  }else {
  
    let cats = await catsModels.getAllCats();
    
    res.json({
      succes: true,
      message: "Here all the cats",
      payload: cats
    });
  }
  
});

router.get("/:id", async (req, res) => {
  
  const id = Number(req.params.id);
  
  const cat = await catsModels.getCatById(id);
  
  res.json({
    succes: true,
    message: `Here is the cat with id ${id}`,
    payload: cat
  });
})

router.post("/", async (req, res) => {
  
  let cat = req.body;

  let catCreated = await catsModels.createCat(cat);
  res.json({
    succes: true,
    message: `Cat created`,
    payload: catCreated
  });

})

router.put("/:id", async(req, res) => {
 
  const id = Number(req.params.id); 
  
  let cat = req.body;
  
  let catUpdated = await catsModels.updateCat(id,cat);
  res.json({
    succes: true,
    message: `Cat updated with ID ${id}`,
    payload: catUpdated
  });
} )

router.delete("/:id", async (req, res) => {
  
  const id = Number(req.params.id);
  
  const catDeleted = await catsModels.deleteCat(id);
  res.json({
    succes: true,
    message: `Cat deleted with id ${id}`,
    payload: catDeleted
  });
})

export default router;