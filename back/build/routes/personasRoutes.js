"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var mdAutenticacion = require('../middlewares/autenticacion');
const clientesController_1 = __importDefault(require("../controllers/clientesController"));
class PersonasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Clientes
        this.router.get('/clientes/listar/:desde', clientesController_1.default.listarClientes);
        // this.router.get('/clientes/listar/:desde', [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin],personasController.listarClientes);
        this.router.get('/clientes/busqueda/:pApellidos/:pNombres', clientesController_1.default.buscarApellidoNombres);
        this.router.get('/clientes/patente/:pPatente', clientesController_1.default.buscarPatente);
    }
}
const personasRoutes = new PersonasRoutes();
exports.default = personasRoutes.router;
