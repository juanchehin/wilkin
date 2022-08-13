import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import personasController from '../controllers/clientesController';

class PersonasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Clientes
        this.router.get('/clientes/listar/:desde',personasController.listarClientes);
        this.router.get('/clientes/busqueda/:pApellidos/:pNombres',personasController.buscarApellidoNombres);
        this.router.get('/clientes/patente/:pPatente',personasController.buscarPatente);      
        this.router.get('/clientes/dame/:pIdCliente',personasController.dameCliente);  
        this.router.put('/clientes/actualizar/:IdCliente', personasController.actualizaCliente);
        this.router.post('/clientes/alta' , personasController.altaCliente);

    }

}

const personasRoutes = new PersonasRoutes();
export default personasRoutes.router;