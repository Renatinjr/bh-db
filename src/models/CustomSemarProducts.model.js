const mongoose = require("mongoose");

const precoSchema = new mongoose.Schema(
  {
    tabela_id: {
      type: String,
      required: true,
    },
    tabela_nome: {
      type: String,
      required: true,
    },
    quantidade_minima: {
      type: String,
      required: true,
    },
    valor: {
      type: Number,
      required: true,
    },
    valor_promo: {
      type: String,
      required: true,
    },
    data_promo_de: {
      type: String,
      required: true,
    },
    data_promo: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
    },
    valor_comparativo: {
      type: String,
      required: true,
    },
    isPromo: {
      type: String,
      required: true,
    },
    valor_loja: {
      type: Array,
      required: true,
    },
  },
  { _id: false },
);

const SemarSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cod: { type: String, required: true },
  precos: { type: [precoSchema], required: true },
  estoque: { type: Number, required: true },
  qtd_un: Number,
  tags: Array,
  categoria: String,
  foto: String,
});

const SemarModel = mongoose.model("custom_semar_products", SemarSchema);
module.exports = { SemarModel };
