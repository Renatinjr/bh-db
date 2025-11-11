const { getClienteModel } = require("../models/CustomSemarClientes");
const { fetchClientes } = require("../services/fetch-wbuy");
const { cliente_config } = require("../config");
const { default: mongoose } = require("mongoose");

async function upsertManyClientes(data, clientName, clienteId) {
  const ClienteModel = getClienteModel(clientName);
  const cliente_id = new mongoose.Types.ObjectId(clienteId);
  const promises = data.map((item) =>
    ClienteModel.findOneAndUpdate(
      { doc1: item.doc1, cliente_id },
      { ...item, cliente_id },
      {
        upsert: true,
        new: true,
      },
    ),
  );
  return Promise.all(promises);
}

function removeChars(str) {
  if (!str) return "";
  return str.replaceAll(/[^\w\s]/gi, "");
}

function formatElement(element) {
  element.responsavel_cpf = removeChars(element.responsavel_cpf);
  element.doc1 = removeChars(element.doc1);
  element.doc2 = removeChars(element.doc2);
  element.telefone1 = removeChars(element.telefone1);
  element.telefone2 = removeChars(element.telefone2);

  return element;
}

const populateClientes = async function (client, clienteId) {
  try {
    console.log(`Iniciando sincronização de clientes para ${client.name}`);
    let last_request_state = 0;
    let limit = 100;
    let cont = true;
    let avaliable_results = 0;
    let pushMany = [];

    const { data } = await fetchClientes(
      last_request_state,
      limit,
      client.apikey,
    );
    let retrived_results = limit;
    last_request_state = limit;
    const { total, data: clientes } = data;

    clientes.forEach((element) => {
      const cliente = formatElement(element);
      pushMany.push(cliente);
    });

    await upsertManyClientes(pushMany, client.name, clienteId);
    pushMany = [];

    if (retrived_results < total) {
      avaliable_results = total - limit;
      while (cont) {
        if (avaliable_results < 100) {
          const { data } = await fetchClientes(
            last_request_state,
            avaliable_results,
            client.apikey,
          );
          data.data.forEach((element) => {
            const cliente = formatElement(element);
            pushMany.push(cliente);
          });

          await upsertManyClientes(pushMany, client.name, clienteId);

          last_request_state += avaliable_results;
          avaliable_results = avaliable_results - avaliable_results;
        } else {
          const { data } = await fetchClientes(
            last_request_state,
            100,
            client.apikey,
          );
          data.data.forEach((element) => {
            const cliente = formatElement(element);
            pushMany.push(cliente);
          });

          await upsertManyClientes(pushMany, client.name, clienteId);
          pushMany = [];
          last_request_state += 100;
          avaliable_results -= 100;
        }
        if (avaliable_results === 0) cont = false;
      }
    }
    console.log(`Finalizada sincronização de clientes para ${client.name}`);
    return 1;
  } catch (error) {
    console.log(
      `Erro na sincronização de clientes para ${client.name}:`,
      error,
    );
    return false;
  }
};

const multiSyncClientes = async () => {
  for (const client of cliente_config) {
    await populateClientes(client, client.id);
  }
};

module.exports = multiSyncClientes;
