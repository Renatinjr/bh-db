const fetchProducts = require("../services/fetch-wbuy");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createMany(data) {
  return prisma.$transaction([prisma.product.createMany({ data: data })]);
}

const populateDb = async function () {
  try {
    let last_request_state = 0;
    let limit = 100;
    let cont = true;
    let avaliable_results = 0;

    const { data } = await fetchProducts(last_request_state, limit);
    let retrived_results = limit;
    last_request_state = limit;
    const { total, data: products } = data;
    await createMany(products);

    if (retrived_results < total) {
      avaliable_results = total - limit;
      while (cont) {
        if (avaliable_results < 100) {
          const { data } = await fetchProducts(
            last_request_state,
            avaliable_results,
          );
          const created = await createMany(data.data);
          console.log("Created", created);
          last_request_state += avaliable_results;
          avaliable_results = avaliable_results - avaliable_results;
        } else {
          const { data } = await fetchProducts(last_request_state, 100);
          const created = await createMany(data.data);
          console.log("Created", created);
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
