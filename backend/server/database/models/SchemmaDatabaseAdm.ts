import mongoose from "mongoose";

const databaseSchemma = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  idade: { type: Number, required: true },
  genero: { type: String, rquired: true },
  etnia: { type: String, required: true },
  celular: { type: Number, required: true },
  moeda: { type: Number, required: true },
});

const databaseUser = mongoose.model("adm", databaseSchemma);
