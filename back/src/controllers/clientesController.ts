import { Request, Response, NextFunction, response } from 'express';
import pool from '../database';

class PersonasController {

    
// ===========================================================================
// =========================== CLIENTES ==========================================
// ===========================================================================


// ==================================================
//        Obtiene una personas de la BD
// ==================================================
public async dameCliente(req: Request, res: Response): Promise<any> {

    var IdCliente = req.params.pIdCliente;

    pool.query(`call bsp_dame_cliente('${IdCliente}')`, function(err: any, result: any, fields: any){
        if(err){
            
            console.log("result : ",result);
            res.status(404).json({ text: "La personas no existe" });
        }
        
        return res.json(result[0]);
    })

}

// ==================================================
//        Inserta un cliente
// ==================================================
public async altaCliente(req: Request, res: Response) {

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var Telefono = req.body[2];
    var Patente = req.body[3];
    var Correo = req.body[4];
    var Direccion = req.body[5];
    var Modelo = req.body[6];
    var Observaciones = req.body[7];

    pool.query(`call bsp_alta_cliente('${Apellidos}','${Nombres}','${Telefono}','${Patente}','${Correo}',
    '${Direccion}','${Modelo}','${Observaciones}')`, function(err: any, result: any){

        if(err){
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
//        Lista 
// ==================================================

public async historicoCliente(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);

    var IdCliente = req.params.pIdCliente;

    pool.query(`call bsp_historico_cliente('${IdCliente}','${desde}')`, function(err: any, result: any){
       if(err){
        
           return;
       }

       res.json(result);
   })
}
// ==================================================
//   Elimina un cliente de la BD
// ==================================================

public async bajaCliente(req: Request, res: Response) {
    var IdCliente = req.params.pIdCliente;

    pool.query(`call bsp_baja_cliente('${IdCliente}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }

        if(result[1][0].Mensaje !== 'Ok'){
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

    console.log("pasa actualizaCliente  req.body : ", req.body);
    console.log("pasa actualizaCliente : req.params ", req.params);

    var IdCliente = req.params.IdCliente;
    var Apellidos = req.body.Apellidos;
    var Nombres = req.body.Nombres;
    var Telefono = req.body.Telefono;
    var Patente = req.body.Patente;
    var Correo = req.body.Correo;
    var Direccion = req.body.Direccion;
    var Modelo = req.body.Modelo;
    var Observaciones = req.body.Observaciones;

    console.log("pasa actualizaCliente : req.params ", IdCliente);

    pool.query(`call bsp_editar_cliente('${IdCliente}','${Apellidos}','${Nombres}','${Telefono}','${Patente}','${Correo}',
    '${Direccion}','${Modelo}','${Observaciones}')`, function(err: any, result: any){

        if(err){
            
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