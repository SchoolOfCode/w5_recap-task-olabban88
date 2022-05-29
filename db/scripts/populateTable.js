import query from "../index.js";
import {cats} from "../../app.js";  

async function populateCatsTable() {
  
  for(let i = 0; i < cats.length; i++) {
    
    let {name, human, hobby} = cats[i];
    
    const res = await query(`INSERT INTO cats (name, human, hobby) VALUES ($1, $2, $3);`,[name, human, hobby]);
    console.log(res);
  }  
}

populateCatsTable()