"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnUserData = void 0;
var httpstatusCode_1 = __importDefault(require("../configs/httpstatusCode"));
var returnUserData = function (req, res) {
    var _a;
    var _b = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.toObject()) || {}, senha = _b.senha, _id = _b._id, token = _b.token, userDataWithoutPassword = __rest(_b, ["senha", "_id", "token"]);
    return res.status(httpstatusCode_1.default.ok).json({
        status: 'Ok', data: userDataWithoutPassword
    });
};
exports.returnUserData = returnUserData;
