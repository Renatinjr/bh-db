const fetchProducts = require("../services/fetch-wbuy");
const { PrismaClient } = require("@prisma/client");
const { SemarModel } = require("../models/CustomSemarProducts.model");
const prisma = new PrismaClient();

async function createMany(data) {
  //return prisma.$transaction([prisma.product.createMany({ data: data })]);
  return SemarModel.insertMany(data);
}

const populateDb = async function () {
  try {
    let last_request_state = 0;
    let limit = 100;
    let cont = true;
    let avaliable_results = 0;
    let pushMany = [];

    const { data } = await fetchProducts(last_request_state, limit);
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
        precos: valores,
        estoque: quantidade_total_em_estoque,
        qtd_un: 1,
        tags: [],
        categoria: categoria_level1.nome,
        foto: foto ? foto.foto ?? foto.foto_mini : "",
      });
    });
    console.log(pushMany);
    await createMany(pushMany);
    pushMany = [];

    if (retrived_results < total) {
      avaliable_results = total - limit;
      while (cont) {
        if (avaliable_results < 100) {
          const { data } = await fetchProducts(
            last_request_state,
            avaliable_results,
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
              precos: valores,
              estoque: quantidade_total_em_estoque,
              qtd_un: 1,
              tags: [],
              categoria: categoria_level1.nome,
              foto: foto ? foto.foto ?? foto.foto_mini : "",
            });
          });

          const created = await createMany(pushMany);
          console.log("Created", created);
          last_request_state += avaliable_results;
          avaliable_results = avaliable_results - avaliable_results;
        } else {
          const { data } = await fetchProducts(last_request_state, 100);
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
              precos: valores,
              estoque: quantidade_total_em_estoque,
              qtd_un: 1,
              tags: [],
              categoria: categoria_level1.nome,
              foto: foto ? foto.foto ?? foto.foto_mini : "",
            });
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

module.exports = populateDb;
