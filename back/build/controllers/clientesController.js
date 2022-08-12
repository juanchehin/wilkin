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
const database_1 = __importDefault(require("../database"));
class PersonasController {
    // ===========================================================================
    // =========================== CLIENTES ==========================================
    // ===========================================================================
    // ==================================================
    //        Inserta un cliente
    // ==================================================
    createCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var IdTipoDocumento = req.body.IdTipoDocumento;
            var Apellidos = req.body.Apellidos;
            var Nombres = req.body.Nombres;
            var Documento = req.body.Documento;
            var Password = req.body.Password;
            var Telefono = req.body.Telefono;
            var Sexo = req.body.Sexo;
            var Observaciones = req.body.Observaciones;
            var FechaNac = req.body.FechaNac;
            var Correo = req.body.Correo;
            var Usuario = req.body.Usuario;
            var Calle = req.body.Calle;
            var Piso = req.body.Piso;
            var Departamento = req.body.Departamento;
            var Ciudad = req.body.Ciudad;
            var Pais = req.body.Pais;
            var Numero = req.body.Numero; // 19
            var Objetivo = req.body.Objetivo;
            var Ocupacion = req.body.Ocupacion;
            var Horario = req.body.Horario;
            database_1.default.query(`call bsp_alta_cliente('${IdTipoDocumento}','${Apellidos}','${Nombres}','${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}','${FechaNac}','${Correo}','${Usuario}','${Calle}',${Piso},'${Departamento}','${Ciudad}','${Pais}',${Numero},'${Objetivo}','${Ocupacion}','${Horario}')`, function (err, result, fields) {
                if (err) {
                    console.log("error : ", err);
                    res.status(404).json({ text: "Ocurrio un problema" });
                    return;
                }
                if (result[0][0].Mensaje === 'La persona ya se encuentra cargada') {
                    return res.json({
                        Mensaje: result[0][0].Mensaje,
                        pIdPersona: result[1][0].IdPersona
                    });
                }
                if (result[0][0].Mensaje !== 'Ok') {
                    return res.json({
                        ok: false,
                        Mensaje: result[0][0].Mensaje
                    });
                }
                return res.json({ Mensaje: 'Ok' });
            });
        });
    }
    // ==================================================
    //   Activa un cliente (caso de ya existencia en la BD)
    // ==================================================
    activarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var IdPersona = req.params.IdPersona;
            const result = yield database_1.default.query('CALL bsp_activar_cliente(?)', IdPersona);
            if (result[0][0].Mensaje !== 'Ok') {
                return res.json({
                    ok: false,
                    mensaje: result[0][0].Mensaje
                });
            }
            return res.json({ Mensaje: 'Ok' });
        });
    }
    // ==================================================
    //        Lista Clientes desde cierto valor
    // ==================================================
    listarClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var desde = req.params.desde || 0;
            desde = Number(desde);
            database_1.default.query(`call bsp_listar_clientes('${desde}')`, function (err, result, fields) {
                if (err) {
                    console.log("error", err);
                    return;
                }
                res.json(result);
            });
        });
    }
    // ==================================================
    //   Elimina un cliente de la BD
    // ==================================================
    eliminarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var IdPersona = req.params.IdPersona;
            database_1.default.query(`call bsp_eliminar_cliente('${IdPersona}')`, function (err, result, fields) {
                if (err) {
                    console.log("error", err);
                    return;
                }
                if (result[0][0].Mensaje !== 'Ok') {
                    return res.json({
                        ok: false,
                        mensaje: result.Mensaje
                    });
                }
                return res.json({ mensaje: 'Ok' });
            });
        });
    }
    // ==================================================
    //        Edita un cliente
    // ==================================================
    actualizaCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var IdPersona = req.body.IdPersona;
            var IdTipoDocumento = req.body.IdTipoDocumento;
            var Apellidos = req.body.Apellidos;
            var Nombres = req.body.Nombres;
            var Documento = req.body.Documento;
            var Password = req.body.Password;
            var Telefono = req.body.Telefono;
            var Sexo = req.body.Sexo;
            var Observaciones = req.body.Observaciones;
            var FechaNac = req.body.FechaNac;
            var Correo = req.body.Correo;
            var Usuario = req.body.Usuario;
            var Calle = req.body.Calle;
            var Piso = req.body.Piso;
            var Departamento = req.body.Departamento;
            var Ciudad = req.body.Ciudad;
            var Pais = req.body.Pais;
            var Numero = req.body.Numero; // 20
            var Objetivo = req.body.Objetivo;
            var Ocupacion = req.body.Ocupacion;
            var Horario = req.body.Horario;
            database_1.default.query(`call bsp_editar_cliente('${IdPersona}','${IdTipoDocumento}','${Apellidos}','${Nombres}',
    '${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}','${FechaNac}',
    '${Correo}','${Usuario}','${Calle}',${Piso},'${Departamento}','${Ciudad}','${Pais}',${Numero},
    '${Objetivo}','${Ocupacion}','${Horario}')`, function (err, result, fields) {
                if (err) {
                    console.log("error : ", err);
                    res.status(404).json({ text: "Ocurrio un problema" });
                    return;
                }
                if (result[0][0].Mensaje !== 'Ok') {
                    return res.json({
                        ok: false,
                        Mensaje: result[0][0].Mensaje
                    });
                }
                return res.json({ Mensaje: 'Ok' });
            });
        });
    }
    // ==================================================
    //   Lista los clientes inscriptos en un cierto plan
    // ==================================================
    listarClientesPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var IdPlan = req.params.IdPlan || 0;
            IdPlan = Number(IdPlan);
            var desde = req.params.desde || 0;
            desde = Number(desde);
            database_1.default.query(`call bsp_listar_clientes_plan('${desde}','${IdPlan}')`, function (err, result, fields) {
                if (err) {
                    console.log("error", err);
                    return;
                }
                res.json(result);
            });
        });
    }
}
const personasController = new PersonasController;
exports.default = personasController;
