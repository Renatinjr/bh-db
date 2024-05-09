require("dotenv/config");
const { env } = require("node:process");
const { default: axios } = require("axios");
const { TOKEN } = env;

const fetchProducts = function(startAfter, qtdResults) {
  return axios.get(
    `https://sistema.sistemawbuy.com.br/api/v1/product?limit=${startAfter},${qtdResults}&ativo=1&order=id`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );
};

const fetchClientes = function(startAfter, qtdResults) {
  return axios.get(
    `https://sistema.sistemawbuy.com.br/api/v1/customer?limit=${startAfter},${qtdResults}&order=id`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );
};

module.exports = { fetchProducts, fetchClientes };
