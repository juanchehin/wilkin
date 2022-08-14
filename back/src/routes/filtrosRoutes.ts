import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import filtrosController from '../controllers/filtrosController';

class FiltrosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Clientes
        this.router.get('/listar/:desde',filtrosController.listarFiltrosPaginado);
        this.router.get('/buscar/:pFiltro',filtrosController.buscarFiltro);
        // this.router.get('/clientes/busqueda/:pApellidos/:pNombres',personasController.buscarApellidoNombres);
        // this.router.get('/clientes/patente/:pPatente',personasController.buscarPatente);      
        // this.router.get('/clientes/dame/:pIdCliente',personasController.dameCliente);  
        // this.router.get('/clientes/historico/:pIdCliente/:pDesde',personasController.historicoCliente);  
        // this.router.put('/clientes/actualizar/:IdCliente', personasController.actualizaCliente);
        // this.router.post('/clientes/alta' , personasController.altaCliente);

    }

}

const filtrosRoutes = new FiltrosRoutes();
export default filtrosRoutes.router;