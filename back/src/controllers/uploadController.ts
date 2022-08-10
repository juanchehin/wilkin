import { Request, Response } from 'express';
const path = require('path');
const fs = require('fs');

class UploadController {

// ==================================================
//    fileUpload
// ==================================================

public async subirImagen(req: any, res: Response){

    const id = req.params.id;

    // Validar que exista un archivo
    if (!req.file || Object.keys(req.file).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen...
    const file = req.file.originalname;

    const nombreCortado = file.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ id }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./build/uploads/clientes/${ req.file.filename }`;

    // Path para guardar la imagen
    const filePathMove = `./build/uploads/clientes/${ nombreArchivo }`;

    // Mover la imagen
    fs.rename( path , filePathMove, (err: any) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        // actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}

// ==================================================
//        retornaImagen
// ==================================================
public async retornaImagen(req: Request, res: Response): Promise<any> {
    
    const id = req.params.id;

    const pathImg = path.join( __dirname, `../uploads/clientes/${ id }` );

    console.log("pathImg : ",pathImg)

    // imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        res.json({
            ok: false,
            msg: 'Imagen inexistente'
        });
    }

}

}

const uploadController = new UploadController;
export default uploadController;