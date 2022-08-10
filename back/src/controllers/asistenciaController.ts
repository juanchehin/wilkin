import { Request, Response } from 'express';
import pool from '../database';

class AsistenciaController {

// ==================================================
//        Inserta una asistencia
// ==================================================

public async create(req: Request, res: Response) {

    var IdPersona = req.body.IdCliente;
    var IdProfesional = req.body.IdProfesional;
    var Altura = req.body.Altura;
    var Peso = req.body.Peso;
    var IMC = req.body.IMC;
    var Musc = req.body.Musc;
    var Grasa = req.body.Grasa;
    var GV = req.body.GV;

    pool.query(`call bsp_alta_medicion('${IdPersona}','${IdProfesional}','${Altura}','${Peso}','${IMC}','${Musc}','${Grasa}','${GV}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })

}

// ==================================================
//  Lista las asistencias desde cierto valor y dado un IdPersona
// ==================================================

public async listarAsistencias(req: Request, res: Response) {

     var desde = req.params.desde || 0;
     desde  = Number(desde);

     var IdPersona = req.params.IdPersona;

     pool.query(`call bsp_listar_asistencias_cliente('${desde}','${IdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })


 }
// ==================================================
//        Obtiene una asistencia de la BD
// ==================================================

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        pool.query(`call bsp_dame_total_asistencia('${id}')`, function(err: any, result: any, fields: any){
            if(err){
                console.log("error", err);
                return;
            }

            if(result[0][0].Mensaje !== 'Ok'){
                return res.json({
                    // ok: false,
                    Mensaje: result.Mensaje
                });
            }

            res.json({ Mensaje: 'Ok' });
        })
        
    }

// ==================================================
//  Marca la asistencia dado un IdPersona y un IdPlan
// ==================================================

public async marcarAsistenciaPersona(req: Request, res: Response): Promise<any> {
    const IdPersona = req.params.IdPersona;

    pool.query(`call bsp_marcar_asistencia('${IdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }

        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                // ok: false,
                Mensaje: result.Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}

}

const asistenciaController = new AsistenciaController;
export default asistenciaController;