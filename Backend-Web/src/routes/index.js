// establece un enrutador para una API utilizando Express,
import { registroRouter, loginRouter, transaccionRouter, prestamoRouter, transferenciaRouter } from "./servicioBancoRouter.js";
//registroRouter, loginRouter, transaccionRouter, prestamoRouter: Estos son enrutadores
 //específicos que manejan las diferentes funcionalidades de la aplicación. 
 //Se importan desde el archivo servicioBancoRouter.js.
import { Router } from "express";
//Router: Se importa el objeto Router de Express, 
//que permite crear manejadores de rutas modulares.

const router = Router();
//Se crea una nueva instancia del enrutador 
//de Express, que se usará para definir las rutas de la API.

// Definición de Rutas
router.post("/registro", registroRouter);
/* Define una ruta POST para el registro de usuarios. Cuando se recibe una solicitud
 POST en /registro, se ejecuta la lógica definida en registroRouter.*/
router.post("/login", loginRouter);/* Define una ruta POST para el inicio de sesión de 
usuarios. La lógica de esta ruta está manejada por loginRouter.*/
router.post("/transaccion", transaccionRouter);
/* Define una ruta POST para el inicio de sesión de usuarios. 
La lógica de esta ruta está manejada por loginRouter.*/
router.post("/prestamo", prestamoRouter);
/*Define una ruta POST para solicitar préstamos. 
La lógica de esta ruta se encuentra en prestamoRouter.*/
router.post("/transferencia", transferenciaRouter);


export default router;
/*Finalmente, se exporta el enrutador para que pueda ser utilizado en otras partes
 de la aplicación, generalmente en la configuración del servidor Express
  donde se importará este archivo.*/