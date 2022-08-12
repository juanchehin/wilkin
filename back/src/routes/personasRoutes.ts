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
        this.router.put('/cliente/eliminar/:IdPersona', [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin], personasController.eliminarCliente);
        this.router.put('/cliente/actualizar/:id',  [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin], personasController.actualizaCliente);  
        this.router.post('/cliente' ,  [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin], personasController.createCliente); 
        this.router.get('/clientes/plan/:desde/:IdPlan', [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin], personasController.listarClientesPlan);
        this.router.put('/cliente/activar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.verificaProfesionalAdmin], personasController.activarCliente);  

    }

}

const personasRoutes = new PersonasRoutes();
export default personasRoutes.router;