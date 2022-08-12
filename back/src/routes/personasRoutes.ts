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
        // this.router.get('/clientes/listar/:desde', [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin],personasController.listarClientes);
        
        this.router.get('/clientes/busqueda/:pApellidos/:pNombres',personasController.buscarApellidoNombres);

        this.router.get('/clientes/patente/:pPatente',personasController.buscarPatente);

      
    }

}

const personasRoutes = new PersonasRoutes();
export default personasRoutes.router;