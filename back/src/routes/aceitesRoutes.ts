import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import aceitesController from '../controllers/aceitesController';

class AceitesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        this.router.get('/listar',aceitesController.listarAceites);
        this.router.get('/listar/:desde',aceitesController.listarAceitesPaginado);
        this.router.get('/buscar/:pAceite',aceitesController.buscarAceite);
        this.router.post('/alta' , aceitesController.altaAceite);
        this.router.put('/eliminar/:pIdAceite' , aceitesController.eliminarAceite);
        this.router.get('/dame/:pIdAceite',aceitesController.dameAceite);  
        this.router.put('/actualizar/:pIdAceite', aceitesController.actualizaAceite);
        

    }

}

const aceitesRoutes = new AceitesRoutes();
export default aceitesRoutes.router;