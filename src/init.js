const { default: mongoose } = require("mongoose");
const populateDb = require("./jobs/populate-db");
const { env } = require("node:process");
const populateClientes = require("./jobs/populate-db-clientes");

const { URI } = env;
async function init() {
  mongoose
    .connect(URI)
    .then(() => console.log("Conectado"))
    .catch(() => console.log("Erro ao conectar"));
  await populateDb();
  await populateClientes();
}

init()
  .then(() => console.log("Inserção concluida", new Date()))
  .catch((err) => console.error("Erro", err));
