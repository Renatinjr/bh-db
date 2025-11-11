require("dotenv/config");
const { env } = require("node:process");
const { default: axios } = require("axios");
const { TOKEN } = env;

const fetchProducts = function (startAfter, qtdResults, apikey = TOKEN) {
  return axios.get(
    `https://sistema.sistemawbuy.com.br/api/v1/product?limit=${startAfter},${qtdResults}&ativo=1&order=id`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
    },
  );
};

const fetchClientes = function (startAfter, qtdResults, apikey = TOKEN) {
  return axios.get(
    `https://sistema.sistemawbuy.com.br/api/v1/customer?limit=${startAfter},${qtdResults}&order=id`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
    },
  );
};

module.exports = { fetchProducts, fetchClientes };
