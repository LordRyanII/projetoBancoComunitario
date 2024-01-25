"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// SchemmaDatabaseUser.ts
var mongoose_1 = __importStar(require("mongoose"));
var userSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    data: { type: String, required: true },
    genero: { type: String, required: true },
    etnia: { type: String, required: true },
    celular: { type: String, required: true, unique: true },
    historico: [
        {
            dataHistorico: { type: String, required: true },
            descricao: { type: String, required: true, index: false },
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
var UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
