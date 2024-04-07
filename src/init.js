const { default: mongoose } = require("mongoose");
const populateDb = require("./jobs/populate-db");
const { env } = require("node:process");

const { URI } = env;
async function init() {
  console.log(URI);
  mongoose
    .connect(URI)
    .then(() => console.log("Conectado"))
    .catch(() => console.log("Erro ao conectar"));
  const response = await populateDb();
  response ? console.log("Ok") : console.log("nada");
}

init().then(() => console.log("Init finished"));
