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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
const database_1 = __importDefault(require("../database"));
class LoginController {
    // ========================================================
    // Login
    // ========================================================
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("req.body es : ", req.body);
            const usuario = req.body.usuario;
            const pass = req.body.pass;
            // 
            database_1.default.query(`call bsp_dame_persona_usuario_pass('${usuario}','${pass}')`, function (err, result) {
                if (err) {
                    // res.send({ err:'err' })
                    console.log("err es : ", err);
                }
                //
                if (result[0][0].Mensaje !== 'Ok' || null) {
                    console.log('Error de credenciales');
                    // Quitar esto para produccion
                    res.json({
                        ok: true,
                        mensaje: 'Error de credenciales'
                    });
                    return;
                }
                var token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 });
                // Respuesta
                res.status(200).json({
                    ok: true,
                    usuario: result[0][0].correo,
                    token: token // <-- Devuelvo el token al front end
                });
            });
        });
    }
    // ==========================================
    //  Renueva TOKEN
    // ==========================================
    renuevatoken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var body = req.body; // Usuario y contraseña
            var token = jwt.sign({ usuario: body.correo }, SEED, { expiresIn: 14400 }); // 4 horas
            res.status(200).json({
                ok: true,
                token: token
            });
        });
    }
}
const loginController = new LoginController;
exports.default = loginController;
