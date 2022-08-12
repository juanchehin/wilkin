import { Request, Response, NextFunction, response } from 'express';
import pool from '../database';

class PersonasController {

    
// ===========================================================================
// =========================== CLIENTES ==========================================
// ===========================================================================


// ==================================================
//        Inserta un cliente
// ==================================================
public async createCliente(req: Request, res: Response) {

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
    var Numero = req.body.Numero;    // 19
    var Objetivo = req.body.Objetivo;
    var Ocupacion = req.body.Ocupacion;
    var Horario = req.body.Horario;

    pool.query(`call bsp_alta_cliente('${IdTipoDocumento}','${Apellidos}','${Nombres}','${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}','${FechaNac}','${Correo}','${Usuario}','${Calle}',${Piso},'${Departamento}','${Ciudad}','${Pais}',${Numero},'${Objetivo}','${Ocupacion}','${Horario}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error : ", err);
            res.status(404).json({ text: "Ocurrio un problema" });
            return;
        }
        
        if(result[0][0].Mensaje === 'La persona ya se encuentra cargada'){
            return res.json({
                Mensaje: result[0][0].Mensaje,
                pIdPersona: result[1][0].IdPersona
            });
        }
    
        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}


// ==================================================
//   Activa un cliente (caso de ya existencia en la BD)
// ==================================================


public async activarCliente(req: Request, res: Response) {

    var IdPersona = req.params.IdPersona;

    const result: any = await pool.query('CALL bsp_activar_cliente(?)',IdPersona);

    if(result[0][0].Mensaje !== 'Ok'){
        return res.json({
            ok: false,
            mensaje: result[0][0].Mensaje
        });
    }

    return res.json({ Mensaje: 'Ok' });

}


// ==================================================
//        Lista Clientes desde cierto valor
// ==================================================

public async listarClientes(req: Request, res: Response): Promise<void> {
     var desde = req.params.desde || 0;
     desde  = Number(desde);

     pool.query(`call bsp_listar_clientes('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })
 }

// ==================================================
//   Elimina un cliente de la BD
// ==================================================

public async eliminarCliente(req: Request, res: Response) {
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_eliminar_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                mensaje: result.Mensaje
            });
        }
    
        return res.json({ mensaje: 'Ok' });
    })

}

// ==================================================
//        Edita un cliente
// ==================================================


public async actualizaCliente(req: Request, res: Response) {

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
    var Numero = req.body.Numero;    // 20
    var Objetivo = req.body.Objetivo;
    var Ocupacion = req.body.Ocupacion;
    var Horario = req.body.Horario;

    pool.query(`call bsp_editar_cliente('${IdPersona}','${IdTipoDocumento}','${Apellidos}','${Nombres}',
    '${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}','${FechaNac}',
    '${Correo}','${Usuario}','${Calle}',${Piso},'${Departamento}','${Ciudad}','${Pais}',${Numero},
    '${Objetivo}','${Ocupacion}','${Horario}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error : ", err);
            res.status(404).json({ text: "Ocurrio un problema" });
            return;
        }
    
        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}

 // ==================================================
//   Lista los clientes inscriptos en un cierto plan
// ==================================================

public async listarClientesPlan(req: Request, res: Response): Promise<void> {

     var IdPlan = req.params.IdPlan || 0;
     IdPlan  = Number(IdPlan);

     var desde = req.params.desde || 0;
     desde  = Number(desde);

     pool.query(`call bsp_listar_clientes_plan('${desde}','${IdPlan}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })
 }

 // ==================================================
//        Busqueda por nombre - apellido
// ==================================================
public async buscarApellidoNombres(req: Request, res: Response): Promise<any> {

    var Apellidos = req.params.pApellidos || '';
    var Nombres = req.params.pNombres || '';

    if(Apellidos === 'null')
        Apellidos = '';

    if(Nombres === 'null')
        Nombres = '';
    
    pool.query(`call bsp_buscar_cliente_apellidos_nombres('${Apellidos}','${Nombres}')`, function(err: any, result: any, fields: any){
        if(err){
            
            res.status(404).json({ text: "La personas no existe" });
        }
        
        return res.json(result);
    })
}

 // ==================================================
//        Busqueda por nombre - apellido
// ==================================================
public async buscarPatente(req: Request, res: Response): Promise<any> {

    const pPatente = req.params.pPatente;
    
    pool.query(`call bsp_buscar_cliente_patente('${pPatente}')`, function(err: any, result: any, fields: any){
        if(err){
            
            res.status(404).json({ text: "Patente inexiste" });
        }
        
        return res.json(result);
    })
}

}


const personasController = new PersonasController;
export default personasController;