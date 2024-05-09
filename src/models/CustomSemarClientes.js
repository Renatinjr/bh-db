const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  id: {
    type: "String",
  },
  tabela_id: {
    type: "String",
  },
  tabela_nome: {
    type: "String",
  },
  facebook_id: {
    type: "String",
  },
  nome: {
    type: "String",
  },
  doc1: {
    type: "String",
  },
  doc2: {
    type: "String",
  },
  telefone1: {
    type: "String",
  },
  telefone2: {
    type: "String",
  },
  operadora: {
    type: "String",
  },
  nascimento: {
    type: "String",
  },
  email: {
    type: "String",
  },
  senha: {
    type: "String",
  },
  cadastro: {
    type: "String",
  },
  news: {
    type: "String",
  },
  codigo: {
    type: "String",
  },
  ativo: {
    type: "String",
  },
  cidade: {
    type: "String",
  },
  uf: {
    type: "String",
  },
  credito_valor: {
    type: "String",
  },
  enderecos: {
    type: ["Mixed"],
  },
});

const SemarModelClientes = mongoose.model(
  "custom_semar_clientes",
  clienteSchema,
);
module.exports = { SemarModelClientes };
