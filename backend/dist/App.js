"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var connectionDatabase_1 = __importDefault(require("./database/models/connectionDatabase"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var databaseConnection = new connectionDatabase_1.default();
var port = process.env.PORT;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(userRoutes_1.default);
app.listen(port, function () {
    databaseConnection._connect(process.env.urlConnection);
    console.log("-----------------------------------------------");
    console.log("Servidor iniciado na porta ".concat(port));
    console.log("-----------------------------------------------");
    console.log("Acesso em: http://localhost:".concat(port));
});
