const { fetchProducts } = require("../services/fetch-wbuy");
const { getProductModel } = require("../models/CustomSemarProducts.model");
const { cliente_config } = require("../config");
const mongoose = require("mongoose");

async function upsertMany(data, clientName, clientId) {
  const ProductModel = getProductModel(clientName);
  const cliente_id = new mongoose.Types.ObjectId(clientId);
  const promises = data.map((item) =>
    ProductModel.findOneAndUpdate(
      { cod: item.cod, cliente_id },
      { ...item, cliente_id },
      {
        upsert: true,
        new: true,
      },
    ),
  );
  return Promise.all(promises);
}

const populateDb = async function (client, clientId) {
  try {
    console.log(`Iniciando sincronização de produtos para ${client.name}`);
    let last_request_state = 0;
    let limit = 100;
    let cont = true;
    let avaliable_results = 0;
    let pushMany = [];

    const { data } = await fetchProducts(
      last_request_state,
      limit,
      client.apikey,
    );
    let retrived_results = limit;
    last_request_state = limit;
    const { total, data: products } = data;

    products.forEach((element) => {
      const {
        cod,
        categoria_level1,
        produto,
        estoque,
        quantidade_total_em_estoque,
      } = element;
      const [estoque_data] = estoque;
      const {
        valores,
        fotos: [foto],
      } = estoque_data;
      if (!cod | !produto | !valores | !categoria_level1) return;

      pushMany.push({
        nome: produto,
        cod: cod,
        cliente_id: clientId,
        precos: valores,
        estoque: quantidade_total_em_estoque,
        qtd_un: 1,
        tags: [],
        categoria: categoria_level1.nome,
        foto: foto ? (foto.foto ?? foto.foto_mini) : "",
      });
    });

    await upsertMany(pushMany, client.name, clientId);
    pushMany = [];

    if (retrived_results < total) {
      avaliable_results = total - limit;
      while (cont) {
        if (avaliable_results < 100) {
          const { data } = await fetchProducts(
            last_request_state,
            avaliable_results,
            client.apikey,
          );
          data.data.forEach((element) => {
            const {
              cod,
              categoria_level1,
              produto,
              estoque,
              quantidade_total_em_estoque,
            } = element;
            const [estoque_data] = estoque;
            const {
              valores,
              fotos: [foto],
            } = estoque_data;
            if (!cod | !produto | !valores | !categoria_level1) return;

            pushMany.push({
              nome: produto,
              cod: cod,
              cliente_id: clientId,
              precos: valores,
              estoque: quantidade_total_em_estoque,
              qtd_un: 1,
              tags: [],
              categoria: categoria_level1.nome,
              foto: foto ? (foto.foto ?? foto.foto_mini) : "",
            });
          });

          await upsertMany(pushMany, client.name, clientId);
          last_request_state += avaliable_results;
          avaliable_results = avaliable_results - avaliable_results;
        } else {
          const { data } = await fetchProducts(
            last_request_state,
            100,
            client.apikey,
          );
          data.data.forEach((element) => {
            const {
              cod,
              categoria_level1,
              produto,
              estoque,
              quantidade_total_em_estoque,
            } = element;
            const [estoque_data] = estoque;
            const {
              valores,
              fotos: [foto],
            } = estoque_data;
            if (!cod | !produto | !valores | !categoria_level1) return;

            pushMany.push({
              nome: produto,
              cod: cod,
              cliente_id: clientId,
              precos: valores,
              estoque: quantidade_total_em_estoque,
              qtd_un: 1,
              tags: [],
              categoria: categoria_level1.nome,
              foto: foto ? (foto.foto ?? foto.foto_mini) : "",
            });
          });

          await upsertMany(pushMany, client.name, clientId);
          pushMany = [];
          last_request_state += 100;
          avaliable_results -= 100;
        }
        if (avaliable_results === 0) cont = false;
      }
    }
    console.log(`Finalizada sincronização de produtos para ${client.name}`);
    return 1;
  } catch (error) {
    console.log(
      `Erro na sincronização de produtos para ${client.name}:`,
      error,
    );
    return false;
  }
};

const multiSyncProducts = async () => {
  for (const client of cliente_config) {
    await populateDb(client, client.id);
  }
};

module.exports = multiSyncProducts;
