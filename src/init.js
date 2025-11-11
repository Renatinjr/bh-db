const { default: mongoose } = require("mongoose");
const { env } = require("node:process");
const multiSyncProducts = require("./jobs/multi-sync-products");
const multiSyncClientes = require("./jobs/multi-sync-clientes");

const { URI } = env;
async function init() {
  mongoose
    .connect(URI)
    .then(() => console.log("Conectado"))
    .catch(() => console.log("Erro ao conectar"));
  await multiSyncProducts();
  await multiSyncClientes();
}

init()
  .then(() => console.log("Inserção concluida", new Date()))
  .catch((err) => console.error("Erro", err));
