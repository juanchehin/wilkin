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
const fs = require('fs');
const path = require('path');
class PersonasController {
    // ==================================================
    //        Lista los roles del sistema
    // ==================================================
    listarRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield database_1.default.query('call bsp_listar_roles()');
            res.json(roles);
        });
    }
    // ==================================================
    //        Lista personas desde cierto valor
    // ==================================================
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var desde = req.query.desde || 0;
            desde = Number(desde);
            database_1.default.query(`call bsp_listar_personas('${desde}')`, function (err, result, fields) {
                if (err) {
                    console.log("error", err);
                    return;
                }
                res.json(result);
            });
        });
    }
    // ==================================================
    //        Obtiene una personas de la BD
    // ==================================================
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let datos;
            database_1.default.query(`call bsp_dame_persona('${id}')`, function (err, result, fields) {
                if (err) {
                    console.log("error : ", err);
                    res.status(404).json({ text: "La personas no existe" });
                }
                datos = result[0];
            });
            const pathImg = path.join(__dirname, `../uploads/clientes/${id}.png`);
            console.log("pasa pathImg ", pathImg);
            if (fs.existsSync(pathImg)) {
                console.log("pasa if ");
                return res.sendFile((pathImg), datos);
            }
            else {
                console.log("pasa else ");
                return res.json(datos);
            }
        });
    }
    // ==================================================
    //        Busqueda por nombre - apellido , filtra por plan y si incluye a los clientes dados de baja o no
    // ==================================================
    buscarPorPlanEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Apellido = req.params.Apellido;
            let Nombre = req.params.Nombre;
            const IdPlan = req.params.IdPlan;
            if (Apellido === 'null')
                Apellido = '';
            if (Nombre === 'null')
                Nombre = '';
            database_1.default.query(`call bsp_buscar_cliente_plan_estado('${Apellido}','${Nombre}','${IdPlan}')`, function (err, result, fields) {
                if (err) {
                    console.log("error : ", err);
                    res.status(404).json({ text: "Ocurrio un problema" });
                }
                return res.json(result);
            });
        });
    }
    // ==================================================
    //        Busqueda por nombre - apellido
    // ==================================================
    buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const busqueda = req.params.busqueda;
            database_1.default.query(`call bsp_buscar_persona('${busqueda}')`, function (err, result, fields) {
                if (err) {
                    console.log("error : ", err);
                    res.status(404).json({ text: "La personas no existe" });
                }
                return res.json(result);
            });
        });
    }
    // ==================================================
    //        Actualiza una persona
    // ==================================================
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('bsp_modifica_persona(?,?)', [req.body, id]);
            res.json({ message: "La persona se actualizo" });
        });
    }
    // ==================================================
    //        Da de baja una persona
    // ==================================================
    baja(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.termino;
            const result = yield database_1.default.query('CALL bsp_darbaja_persona(?)', [id]);
            res.json({ message: "Persona dada de baja" });
        });
    }
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
            database_1.default.query(`call bsp_listar_clientes_estado('${desde}')`, function (err, result, fields) {
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
    // ===========================================================================
    // =========================== PROFESIONALES ==========================================
    // ===========================================================================
    // ==================================================
    //        Inserta un profesional
    // ==================================================
    createProfesional(req, res) {
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
            var IdRol = req.body.IdRol;
            database_1.default.query(`call bsp_alta_profesional('${IdTipoDocumento}','${IdRol}','${Apellidos}','${Nombres}'
    ,'${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}','${FechaNac}','${Correo}','${Usuario}'
    ,'${Calle}',${Piso},'${Departamento}','${Ciudad}','${Pais}',${Numero})`, function (err, result, fields) {
                if (err) {
                    console.log("error", err);
                    return;
                }
                if (result[0][0].Mensaje !== 'Ok') {
                    return res.json({
                        ok: false,
                        Mensaje: result[0][0].Mensaje
                    });
                }
                res.json({ Mensaje: 'Ok' });
            });
        });
    }
    // ==================================================
    //        Actualiza un profesional
    // ==================================================
    actualizaProfesional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var IdPersona = req.body.IdPersona;
            var IdTipoDocumento = req.body.IdTipoDocumento;
            var Apellidos = req.body.Apellidos;
            var Nombres = req.body.Nombres;
            var Documento = req.body.Documento;
            // var Password = bcrypt.hashSync(req.body.Password,10);         // Encriptacion de una sola via
            var Password = req.body.Password;
            var Telefono = req.body.Telefono;
            var Sexo = req.body.Sexo;
            var Observaciones = req.body.Observaciones;
            var IdRol = req.body.IdRol;
            var FechaNac = req.body.FechaNac;
            var Correo = req.body.Correo;
            var Usuario = req.body.Usuario;
            var Calle = req.body.Calle;
            var Piso = req.body.Piso;
            var Departamento = req.body.Departamento;
            var Ciudad = req.body.Ciudad;
            var Pais = req.body.Pais;
            var Numero = req.body.Numero; // 20
            var Estado = req.body.Estado;
            database_1.default.query(`call bsp_actualiza_profesional('${IdPersona}','${IdTipoDocumento}','${IdRol}','${Apellidos}','${Nombres}'
    ,'${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}',${FechaNac},'${Correo}','${Usuario}'
    ,'${Calle}','${Piso}','${Departamento}','${Ciudad}','${Pais}','${Numero}','${Estado}')`, function (err, result, fields) {
                if (err) {
                    console.log("error", err);
                    return;
                }
                if (result[0][0].Mensaje !== 'Ok') {
                    return res.json({
                        ok: false,
                        Mensaje: result[0][0].Mensaje
                    });
                }
                res.json({ Mensaje: 'Ok' });
            });
        });
    }
    // ==================================================
    //   Da de baja un profesional
    // ==================================================
    darBajaProfesional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var IdPersona = req.params.IdPersona;
            database_1.default.query(`call bsp_darbaja_profesional('${IdPersona}')`, function (err, result, fields) {
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
    //        Lista el personal del gimnasio desde cierto valor
    // ==================================================
    listarPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var desde = req.params.desde;
            var incluyeBajas = req.params.incluyeBajas;
            database_1.default.query(`call bsp_listar_personal('${desde}','${incluyeBajas}')`, function (err, result, fields) {
                if (err) {
                    console.log("error", err);
                    return;
                }
                res.json(result);
            });
        });
    }
    // ==================================================
    //        Lista el personal del gimnasio desde cierto valor
    //       Si en pDesde viene '-1' entonces se listan todos los profesionales
    // ==================================================
    listarProfesionales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(`call bsp_listar_profesionales()`, function (err, result, fields) {
                if (err) {
                    console.log("error", err);
                    return;
                }
                return res.json(result);
            });
        });
    }
}
const personasController = new PersonasController;
exports.default = personasController;
