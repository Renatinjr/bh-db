const populateDb = require("./jobs/populate-db");

async function init() {
  const response = await populateDb();
  response ? console.log("Ok") : console.log("nada");
}

init().then(() => console.log("Init finished"));
