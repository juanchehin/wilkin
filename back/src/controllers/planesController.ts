import { Request, Response, NextFunction } from 'express';
import pool from '../database';

class PlanesController {

// ==================================================
//       Marca la asistencia de un cliente
// ==================================================

public async marcarAsistencia(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    pool.query(`call bsp_marcarAsistencia('${id}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })
}

// ==================================================
//    Lista el plan activo de un cliente
// ==================================================

public async damePlanCliente(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    pool.query(`call bsp_dame_plan_cliente('${id}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })
}

// ==================================================
//        Lista planes desde cierto valor
// ==================================================

    public async list(req: Request, res: Response): Promise<void> {

        var desde = req.params.desde || 0;
        desde  = Number(desde);

        var incluyeBajas = req.params.incluyeBajas || 0;

        pool.query(`call bsp_listar_planes('${desde}','${incluyeBajas}')`, function(err: any, result: any, fields: any){
            if(err){
                console.log("error", err);
                return;
            }
            res.json(result);
        })
}

    
// ==================================================
//        Lista todos los planes
// ==================================================

public async listAll(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_listar_todos_planes()`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error", err);
            return;
        }
        res.json(result);
    })
}
// ==================================================
//        Obtiene un plan de la BD
// ==================================================
public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        pool.query(`call bsp_dame_plan('${id}')`, function(err: any, result: any, fields: any){
            if(err){
                console.log("error", err);
                return;
            }
            if (result[0][0].Mensaje !== 'El Plan no existe!') {
                return res.json(result[0]);
            }
            res.status(404).json({ text: "El plan no existe" });
        })
    
}

// ==================================================
//        Inserta un plan
// ==================================================


public async create(req: Request, res: Response) {

        var CantClases = req.body.CantClases;
        var Plan = req.body.Plan;
        var Precio = req.body.Precio;
        var Descripcion = req.body.Descripcion;
   
        pool.query(`call bsp_alta_plan('${Plan}','${Precio}','${Descripcion}','${CantClases}')`, function(err: any, result: any, fields: any){
            if(err){
                console.log("error", err);
                return;
            }
            res.json({ Mensaje: 'Ok' });
        })


}

// ==================================================
//        Actualiza un plan
// ==================================================

public async update(req: Request, res: Response): Promise<void> {
        
        
        var pIdPlan = req.params.IdPlan;
        var pPlan = req.body.Plan;
        var pPrecio = req.body.Precio;
        var pCantClases = req.body.CantClases;
        var pDescripcion = req.body.Descripcion;
        var pEstado = req.body.EstadoPlan;


        pool.query(`call bsp_modifica_plan('${pIdPlan}','${pPlan}','${pPrecio}','${pCantClases}','${pDescripcion}','${pEstado}')`, function(err: any, result: any, fields: any){
            if(err){
                console.log("error", err);
                return;
            }
            if(result[0][0].Mensaje !== 'Ok'){
                res.json({ Mensaje: result[0][0].Mensaje });
                console.log("Error en la transaccion ");
                return;
            }
    
            res.json({ Mensaje: 'Ok' });
        })

        
    }

// ==================================================
//        Da de baja un plan
// ==================================================

    public async baja(req: Request, res: Response): Promise<void> {
        
        const { id } = req.params;

        pool.query(`call bsp_darbaja_plan('${id}')`, function(err: any, result: any, fields: any){
            if(err){
                console.log("error", err);
                return;
            }
            if (result[0][0].Mensaje !== 'Ok'){
                res.json({ Mensaje: result[0][0].Mensaje });
            }
            else{
                res.json(result[0][0].Mensaje);
            }
        })

    }

}

const planesController = new PlanesController;
export default planesController;