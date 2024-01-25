// SchemmaDatabaseUser.ts
import mongoose, { Document, Schema } from "mongoose";

interface Endereco {
  endereco: {
    cep: string | undefined;
    logradouro: string;
    rua: string;
    numero: string;
    bairro: string;
  };
}

interface historico {
  dataHistorico: String;
  descricao: String;
  valor: Number;
}

export interface User {
  nome: string;
  sobrenome: string;
  data: string; //Salvar data de nascimento(Não esquecer)
  genero: string;
  etnia: string;
  celular: string;
  historico: historico[];
  senha: string;
  token: string;
  endereco: Endereco;
  whatsapp: boolean;
  dataCadastro: String;
  empregado: boolean;
  empresario: boolean;
}

export type UserDocument = Document & User;

const userSchema = new Schema<UserDocument>({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  data: { type: String, required: true },
  genero: { type: String, required: true },
  etnia: { type: String, required: true },
  celular: { type: String, required: true, unique: true },
  historico: [
    {
      dataHistorico: { type: String, required: true },
      descricao: { type: String, required: true, index: false},
      valor: { type: Number, required: true },
    },
  ],
  senha: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  endereco: {
    cep: { type: String, required: true },
    logradouro: { type: String, required: true },
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    bairro: { type: String, required: true },
  },
  whatsapp: { type: Boolean, required: true },
  dataCadastro: { type: String, required: true },
  empregado: { type: Boolean, required: true },
  empresario: { type: Boolean, required: true },
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
