import { Request, Response, NextFunction, response } from 'express';
import pool from '../database';

class AceitesController {

// ==================================================
//        Obtiene una personas de la BD
// ==================================================
public async dameAceite(req: Request, res: Response): Promise<any> {

    var IdAceite = req.params.pIdAceite;

    pool.query(`call bsp_dame_aceite('${IdAceite}')`, function(err: any, result: any){


        if(err){
            
            res.status(404).json({ text: "El aceite no existe" });
        }
        
        return res.json(result[0]);
    })

}

// ==================================================
//        Inserta un cliente
// ==================================================
public async altaAceite(req: Request, res: Response) {

    var Aceite = req.body.pAceite;
    var Descripcion = req.body.Descripcion;

    pool.query(`call bsp_alta_aceite('${Aceite}','${Descripcion}')`, function(err: any, result: any){

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
//        Lista todos los Aceites
// ==================================================

public async listarAceites(req: Request, res: Response): Promise<void> {
    
    pool.query(`call bsp_listar_aceites()`, function(err: any, result: any, fields: any){
       if(err){
           return;
       }
       res.json(result);
   })
}

// ==================================================
//        Lista Aceites desde cierto valor
// ==================================================

public async listarAceitesPaginado(req: Request, res: Response): Promise<void> {
     var desde = req.params.desde || 0;
     desde  = Number(desde);

     pool.query(`call bsp_listar_aceites_paginado('${desde}')`, function(err: any, result: any){
        if(err){
            
            return;
        }
        res.json(result);
    })
 }
 
// ==================================================
//   Elimina un aceite de la BD
// ==================================================

public async eliminarAceite(req: Request, res: Response) {
    var IdAceite = req.params.pIdAceite;

    pool.query(`call bsp_baja_aceite('${IdAceite}')`, function(err: any, result: any, fields: any){

        if(err){
            
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

public async actualizaAceite(req: Request, res: Response) {

    var IdAceite = req.params.pIdAceite;

    var Aceite = req.body.Aceite;
    var Descripcion = req.body.Descripcion;

    pool.query(`call bsp_editar_aceite('${IdAceite}','${Aceite}','${Descripcion}')`, function(err: any, result: any){

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
public async buscarAceite(req: Request, res: Response): Promise<any> {

    const pAceite = req.params.pAceite;
    
    pool.query(`call bsp_buscar_aceite('${pAceite}')`, function(err: any, result: any){
        if(err){
            
            res.status(404).json({ text: "Aceite inexiste" });
        }
        
        return res.json(result);
    })
}

}


const aceitesController = new AceitesController;
export default aceitesController;