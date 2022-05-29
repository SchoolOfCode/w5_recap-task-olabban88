const url = "api"; 
const catsSection = document.querySelector("#cats");
const submitButton = document.querySelectorAll("button[type='submit']");

submitButton.forEach(button => button.addEventListener("click", handleClick));

async function getCats(id) {

  const response = await fetch(`${url}/cats/${id}`);
  const { payload } = await response.json();
  console.log(payload);
  payload.forEach(renderCat);
}
async function getCatsByName(name) {
  
  const response = await fetch(`${url}/cats?name=${name}`);
  const { payload } = await response.json();
  console.log(payload);
  
  payload.forEach(renderCat);
}

async function addCatInfo(method, id) {
  console.log(gatherFormData());
  
  const response = await fetch(`${url}/cats/${id}`, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gatherFormData()),
  });
  const data = await response.json();
  console.log(data);
}

async function deleteCatById(id) {

  const response = await fetch(`${url}/cats/${id}`, {method: "DELETE" });
  const data = await response.json();
  console.log(data);
}

function gatherFormData() {
  const catName = document.querySelector("#catName").value;
  const humanName = document.querySelector("#humanName").value;
  const hobby = document.querySelector("#hobby").value;
  
  return {
    catName,
    humanName,
    hobby,
  };
}

function handleClick(event) {
  event.preventDefault();
  
  catsSection.innerHTML = "";
  
  let id ="";
  let method ="";
  
  switch (event.target.name) {
    case 'getCats':
      
      id = "";
      getCats(id);
      break;
    case 'getById':
      
      id = document.querySelector("#get-cat-id").value;
      getCats(id);
      break;
    case 'getByName':
      
      let name = document.querySelector("#get-cat-name").value;
      getCatsByName(name);
      break;
    case 'createCat':
      
      method = "POST";
      id = "";
      addCatInfo(method, id);
      break;
    case 'updateCat':
      
      method = "PUT"
      id = document.querySelector("#update-cat-id").value;
      addCatInfo(method, id);
      break;
      
    case 'deleteCat':
      id = document.querySelector("#delete-id").value;
      deleteCatById(id);
      break;
  }
}

function renderCat(cat) {
  const article = createCatArticle(cat);
  catsSection.appendChild(article);
}

function createCatArticle({ id, name, human, hobby }) { 
  const article = document.createElement("article");
  const h2CatName = document.createElement("h2");
  const idSpan = document.createElement("span");
  idSpan.innerText = `ID:${id}`;
  h2CatName.innerText = `Cat name: ${name}`;
  const h3HumanName = document.createElement("h3");
  h3HumanName.innerText = `Human servant: ${human}`;
  const h3Hobby = document.createElement("h3");
  h3Hobby.innerText = `Favorite hobby: ${hobby}`;
  article.appendChild(idSpan);
  article.appendChild(h2CatName);
  article.appendChild(h3HumanName);
  article.appendChild(h3Hobby);
  return article;
}

const createUpdateLabels = document.querySelectorAll("#h2Container h2");

function handleLabelClick(event) {
  
  let label = event.target.id;
  let createLabel = document.querySelector("#createLabel");
  let updateLabel = document.querySelector("#updateLabel");
  let updateElements = document.querySelectorAll(".update");
  let createButton = document.querySelector("#create-cat");
  
  if(label === "createLabel" ) {
    createLabel.setAttribute("class", "create-update selectedLAbel");
    updateLabel.setAttribute("class", "create-update");
    updateElements.forEach(element => element.style.display = "none");
    createButton.style.display = "block";
  }else if (label === "updateLabel" )  {
    createLabel.setAttribute("class", "create-update");
    updateLabel.setAttribute("class", "create-update selectedLAbel");
    updateElements.forEach(element => element.style.display = "inline-block");
    createButton.style.display = "none";
  }
}

createUpdateLabels.forEach( label => label.addEventListener("click", handleLabelClick));