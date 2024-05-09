const { SemarModelClientes } = require("../models/CustomSemarClientes");
const { fetchClientes } = require("../services/fetch-wbuy");

async function createMany(data) {
  return SemarModelClientes.insertMany(data);
}

function removeChars(str) {
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
const populateClientes = async function() {
  try {
    let last_request_state = 0;
    let limit = 100;
    let cont = true;
    let avaliable_results = 0;
    let pushMany = [];

    const { data } = await fetchClientes(last_request_state, limit);
    await SemarModelClientes.deleteMany({});
    let retrived_results = limit;
    last_request_state = limit;
    const { total, data: clientes } = data;

    clientes.forEach((element) => {
      const cliente = formatElement(element);
      pushMany.push(cliente);
    });

    await createMany(pushMany);
    pushMany = [];

    if (retrived_results < total) {
      avaliable_results = total - limit;
      while (cont) {
        if (avaliable_results < 100) {
          const { data } = await fetchClientes(
            last_request_state,
            avaliable_results,
          );
          data.data.forEach((element) => {
            const cliente = formatElement(element);
            pushMany.push(cliente);
          });
          const created = await createMany(pushMany);
          console.log("Created", created);
          last_request_state += avaliable_results;
          avaliable_results = avaliable_results - avaliable_results;
        } else {
          const { data } = await fetchClientes(last_request_state, 100);
          data.data.forEach((element) => {
            const cliente = formatElement(element);
            pushMany.push(cliente);
          });

          const created = await createMany(pushMany);
          console.log("Created", created);

          pushMany = [];
          last_request_state += 100;
          avaliable_results -= 100;
        }
        if (avaliable_results === 0) cont = false;
      }
    }
    return 1;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = populateClientes;
