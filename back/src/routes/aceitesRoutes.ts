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
        // this.router.get('/listar/:desde',filtrosController.listarFiltrosPaginado);
        // this.router.get('/buscar/:pFiltro',filtrosController.buscarFiltro);
        // this.router.post('/alta' , filtrosController.altaFiltro);
        // this.router.put('/eliminar/:pIdFiltro' , filtrosController.eliminarFiltro);
        // this.router.get('/dame/:pIdFiltro',filtrosController.dameFiltro);  
        // this.router.put('/actualizar/:pIdFiltro', filtrosController.actualizaFiltro);

        // this.router.get('/clientes/busqueda/:pApellidos/:pNombres',personasController.buscarApellidoNombres);
        // this.router.get('/clientes/patente/:pPatente',personasController.buscarPatente);      
        // this.router.get('/clientes/dame/:pIdCliente',personasController.dameCliente);  
        // this.router.get('/clientes/historico/:pIdCliente/:pDesde',personasController.historicoCliente);  
        // this.router.put('/clientes/actualizar/:IdCliente', personasController.actualizaCliente);

    }

}

const aceitesRoutes = new AceitesRoutes();
export default aceitesRoutes.router;