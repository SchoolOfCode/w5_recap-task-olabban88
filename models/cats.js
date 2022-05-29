import {cats} from "../app.js";
import query from "../db/index.js";

export async function getAllCats() {

const cats = await query(
    `SELECT * FROM cats;`
  );
  return cats.rows;
}

export async function getCatById(id) {
  
//const cat = cats.find(element => element.id === id);

const cat = await query(
    `SELECT * FROM cats
     WHERE cats.id = $1;`,[id]
  );
  return cat.rows;
}

export async function getCatByName(name) {
  
//const cat = cats.find(element => element.name.toLocaleLowerCase() === name);

const cat = await query(
    `SELECT * FROM cats
     WHERE cats.name ILIKE '%'|| $1 || '%';`,[name]
  );
  
  return cat.rows;
}

export async function createCat(cat) {
  const name = cat.catName;
  const human = cat.humanName;
  const hobby = cat.hobby;
  
  let res = await query(
    `INSERT INTO cats (name, human, hobby) VALUES ($1, $2, $3);`, [name, human, hobby]
  );
  return res;
}

export async function updateCat(id,cat) {
  
  const name = cat.catName;
  const human = cat.humanName;
  const hobby = cat.hobby;
  
  let res= await query(
    `UPDATE cats
     SET name = $1, human = $2, hobby = $3
     WHERE cats.id = $4;`, [name, human, hobby, id]
  );
  console.log(res);
}

export async function deleteCat(id) {
   
  let res = await query(
    `DELETE FROM cats
     WHERE cats.id = $1;`, [id]
  );
  console.log(res);
}