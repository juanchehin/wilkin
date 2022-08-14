import { Request, Response, NextFunction, response } from 'express';
import pool from '../database';

class FiltrosController {

// ==================================================
//        Obtiene una personas de la BD
// ==================================================
public async dameFiltro(req: Request, res: Response): Promise<any> {

    var IdFiltro = req.params.IdFiltro;

    pool.query(`call bsp_dame_filtro('${IdFiltro}')`, function(err: any, result: any, fields: any){
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
public async altaFiltro(req: Request, res: Response) {

    var Filtro = req.body[0];
    var Descripcion = req.body[1];

    pool.query(`call bsp_alta_filtro('${Filtro}','${Descripcion}')`, function(err: any, result: any){

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
//        Lista Filtros desde cierto valor
// ==================================================

public async listarFiltrosPaginado(req: Request, res: Response): Promise<void> {
     var desde = req.params.desde || 0;
     desde  = Number(desde);

     pool.query(`call bsp_listar_filtros_paginado('${desde}')`, function(err: any, result: any, fields: any){
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

public async eliminarFiltro(req: Request, res: Response) {
    var IdFiltro = req.params.IdFiltro;

    pool.query(`call bsp_eliminar_cliente('${IdFiltro}')`, function(err: any, result: any, fields: any){
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


public async actualizaFiltro(req: Request, res: Response) {

    console.log("pasa actualizaCliente  req.body : ", req.body);
    console.log("pasa actualizaCliente : req.params ", req.params);

    var IdFiltro = req.params.IdFiltro;
    var Filtro = req.body.Filtro;
    var Descripcion = req.body.Descripcion;

    console.log("pasa actualizaIdFiltro : req.params ", IdFiltro);

    pool.query(`call bsp_editar_filtro('${IdFiltro}','${Filtro}','${Descripcion}')`, function(err: any, result: any){

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
//        Busqueda 
// ==================================================
public async buscarFiltro(req: Request, res: Response): Promise<any> {

    const pFiltro = req.params.pFiltro;
    
    pool.query(`call bsp_buscar_filtro('${pFiltro}')`, function(err: any, result: any, fields: any){
        if(err){
            
            res.status(404).json({ text: "Filtro inexiste" });
        }
        
        return res.json(result);
    })
}

}


const filtrosController = new FiltrosController;
export default filtrosController;