"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
var zod_1 = require("zod");
var httpstatusCode_1 = __importDefault(require("../configs/httpstatusCode"));
var SchemmaDatabaseUser_1 = __importDefault(require("../database/models/SchemmaDatabaseUser"));
var enderecoSchema = zod_1.z.object({
    cep: zod_1.z.string().nullable(),
    logradouro: zod_1.z.string(),
    rua: zod_1.z.string(),
    numero: zod_1.z.string(),
    bairro: zod_1.z.string(),
});
var userCadastroSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, { message: "O campo nome não pode ser vazio." }),
    sobrenome: zod_1.z
        .string()
        .min(1, { message: "O campo sobrenome não pode ser vazio." }),
    data: zod_1.z.string(), // Pode ser alterado para z.date() se a data de nascimento for esperada como um objeto Date
    genero: zod_1.z.string(),
    etnia: zod_1.z.string(),
    celular: zod_1.z.string().refine(function (value) { return /^\d{11}$/.test(value); }, {
        message: "O número de celular deve ter exatamente 11 dígitos.",
    }),
    senha: zod_1.z
        .string()
        .refine(function (value) { return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value); }, {
        message: "A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um número.",
    }),
    endereco: enderecoSchema,
    whatsapp: zod_1.z.boolean(),
    empregado: zod_1.z.boolean(),
    empresario: zod_1.z.boolean(),
});
var registerValidation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, celular, existingUser, erroValidacao, error_1, erroValidacao;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, userCadastroSchema.parseAsync(req.body)];
            case 1:
                result = _a.sent();
                celular = req.body.celular;
                return [4 /*yield*/, SchemmaDatabaseUser_1.default.findOne({ celular: celular }).exec()];
            case 2:
                existingUser = _a.sent();
                if (existingUser) {
                    erroValidacao = {
                        status: 'Nok',
                        mensagem: "Usuário já cadastrado.",
                    };
                    return [2 /*return*/, res.status(httpstatusCode_1.default.badRequest).json(erroValidacao)];
                }
                // Continue apenas se o usuário não existir
                return [2 /*return*/, next()];
            case 3:
                error_1 = _a.sent();
                if (error_1 instanceof zod_1.ZodError) {
                    erroValidacao = {
                        status: 'Nok',
                        mensagem: error_1.errors
                            .map(function (e) {
                            var path = e.path.join(".");
                            return "".concat(path, ": ").concat(e.message);
                        })
                            .join(", "),
                    };
                    return [2 /*return*/, res.status(httpstatusCode_1.default.badRequest).json(erroValidacao)];
                }
                else {
                    return [2 /*return*/, res
                            .status(httpstatusCode_1.default.internalServerError)
                            .json({ status: "NOK", mensagem: "Erro interno de servidor" })];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.registerValidation = registerValidation;
