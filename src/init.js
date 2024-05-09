const { default: mongoose } = require("mongoose");
const populateDb = require("./jobs/populate-db");
const { env } = require("node:process");
const populateClientes = require("./jobs/populate-db-clientes");

const { URI } = env;
async function init() {
  console.log(URI);
  mongoose
    .connect(URI)
    .then(() => console.log("Conectado"))
    .catch(() => console.log("Erro ao conectar"));
  await populateDb();
  await populateClientes();
}

init()
  .then(() => console.log("Init finished"))
  .catch((err) => console.error("Erro", err));
