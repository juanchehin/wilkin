import { Request, Response } from 'express';

var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

import pool from '../database';

class LoginController {

// ========================================================
// Login
// ========================================================

public async login(req: Request, res: Response){
    
    const usuario = req.body.usuario;
    const pass = req.body.pass;
// 
pool.query(`call bsp_dame_persona_usuario_pass('${usuario}','${pass}')`, function(err: any, result: string | any[]){

    if(err){
        
        console.log("err es : ",err);
    }

    //
    if(result[0][0].Mensaje !== 'Ok' || null){
        console.log('Error de credenciales');
        
        // Quitar esto para produccion
        res.json({
            ok: true,
            mensaje : 'Error de credenciales'
        });  
        return;
    }

    
    var token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400});
    
    // Respuesta
    res.status(200).json({
        ok: true,
        usuario: result[0][0].correo,
        token: token    // <-- Devuelvo el token al front end
    });
    
})

}

// ==========================================
//  Renueva TOKEN
// ==========================================
public async renuevatoken(req: Request, res: Response): Promise<void> {
    
    var body = req.body;    // Usuario y contraseña

    var token = jwt.sign({ usuario: body.correo }, SEED, { expiresIn: 14400});// 4 horas

    res.status(200).json({
        ok: true,
        token: token
    });

}

}

const loginController = new LoginController;
export default loginController;