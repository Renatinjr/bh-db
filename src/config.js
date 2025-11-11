require("dotenv/config");

const { SANTA_FE_TK, BH_BALAS_TK } = process.env;

const cliente_config = [
  { name: "semar", id: "65e9b953f4bf30e934219fe8", apikey: BH_BALAS_TK },
  { name: "santafe", id: "68f250d4a56185eb73544801", apikey: SANTA_FE_TK },
];

module.exports = { cliente_config };
