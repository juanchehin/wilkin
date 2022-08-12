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
        this.router.put('/cliente/eliminar/:IdPersona', [mdAutenticacion.verificaToken, mdAutenticacion.verificaProfesionalAdmin], clientesController_1.default.eliminarCliente);
        this.router.put('/cliente/actualizar/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaProfesionalAdmin], clientesController_1.default.actualizaCliente);
        this.router.post('/cliente', [mdAutenticacion.verificaToken, mdAutenticacion.verificaProfesionalAdmin], clientesController_1.default.createCliente);
        this.router.get('/clientes/plan/:desde/:IdPlan', [mdAutenticacion.verificaToken, mdAutenticacion.verificaProfesionalAdmin], clientesController_1.default.listarClientesPlan);
        this.router.put('/cliente/activar/:IdPersona', [mdAutenticacion.verificaToken, mdAutenticacion.verificaProfesionalAdmin], clientesController_1.default.activarCliente);
    }
}
const personasRoutes = new PersonasRoutes();
exports.default = personasRoutes.router;
