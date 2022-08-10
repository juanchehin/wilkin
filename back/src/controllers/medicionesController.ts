import { Request, Response } from 'express';


import pool from '../database';


class MedicionesController {

// ==================================================
//        Lista las mediciones dado un cliente
// ==================================================


public async listarMediciones(req: Request, res: Response): Promise<void> {

    console.log("listarMediciones");

    const id = req.params.id;
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_mediciones('${desde}','${id}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }

        console.log("listarMediciones result ",result);

        res.json(result);
    })

 }

// ==================================================
//        Inserta una medicion
// ==================================================
public async nuevaMedicion(req: Request, res: Response) {

    var IdPersona = req.body.IdCliente;
    var IdProfesional = req.body.IdProfesional;
    var Altura = req.body.Altura;
    var Peso = req.body.Peso;
    var IMC = req.body.IMC;
    var Musc = req.body.Musc;
    var Grasa = req.body.Grasa;
    var GV = req.body.GV;

     pool.query(`call bsp_alta_medicion(${IdPersona},${IdProfesional},'${Altura}',
     '${Peso}','${IMC}','${Musc}','${Grasa}','${GV}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                // ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        res.json({ Mensaje: 'Ok' });
    })
}


// ==================================================
//        Obtiene una medicion de la BD
// ==================================================

public async getOne(req: Request, res: Response): Promise<any> {
        const { IdMedicion } = req.params;

        pool.query(`call bsp_dame_medicion('${IdMedicion}')`, function(err: any, result: any, fields: any){
            if(err){
                console.log("error", err);
                return;
            }
            if (result[1][0].Mensaje === 'Ok') {
                return res.json(result[0][0]);
            }
    
            res.status(404).json({ text: result[1][0].Mensaje });
        })
        
}
// ==================================================
//        Editar una medicion de la BD
// ==================================================


public async actualizarMedicion(req: Request, res: Response): Promise<any> {

    var Altura = req.body.Altura;
    var Peso = req.body.Peso;
    var IMC = req.body.IMC;
    var Musc = req.body.Musc;
    var Grasa = req.body.Grasa;
    var GV = req.body.GV;
    var IdProfesional = req.body.IdProfesional;
    var IdMedicion = req.body.IdMedicion;

    pool.query(`call bsp_alta_medicion('${IdMedicion}','${IdProfesional}','${Altura}',
    '${Peso}','${IMC}','${Musc}','${Grasa}','${GV}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                // ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        res.json({ Mensaje: 'Ok' });
    })
    
}

 // ==================================================
//   Elimina una medicion
// ==================================================

public async eliminarMedicion(req: Request, res: Response) {

    var IdMedicion = req.params.id;

    pool.query(`call bsp_eliminar_medicion('${IdMedicion}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                Mensaje: result.Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}

}


const medicionesController = new MedicionesController;
export default medicionesController;