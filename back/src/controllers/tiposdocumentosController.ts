import { Request, Response } from 'express';
import pool from '../database';

// ==================================================
//        Lista los tipos de documento de la BD
// ==================================================

class TiposDocumentosController {

    public async list(req: Request, res: Response): Promise<void> {

        pool.query(`call bsp_listar_tipodocumento()`, function(err: any, result: any, fields: any){
            if(err){
                console.log("error", err);
                return;
            }
            
            res.json(result);
        })

    }

// ==================================================
//        Obtiene un tipo de documento de la BD
// ==================================================


public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    pool.query(`call bsp_dame_tipodocumento('${id}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }

        if (result.length > 0) {
            return res.json(result[0]);
        }
        res.status(404).json({ text: "El tipoDoc no existe" });
    })

}

// ==================================================
//        Inserta un tipo de documento
// ==================================================


public async create(req: Request, res: Response): Promise<any> {

    var documento = req.body.Documento;
    var descripcion = req.body.Descripcion;

    pool.query(`call bsp_alta_tipodocumento('${documento}','${descripcion}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json({ message: 'TipoDoc guardada' });
    })

}

}

const tiposdocumentosController = new TiposDocumentosController;
export default tiposdocumentosController;