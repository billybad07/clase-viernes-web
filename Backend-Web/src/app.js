import express from "express";
import { PORT } from "./utils/Envs.js";
import { connectDb } from "./database/sql-adapter.js";
import cors from "cors";
import router from "./routes/index.js";
/*express: Importa el framework Express.
PORT: Importa la constante PORT, que contiene el puerto en el que se ejecutará el servidor (definido en tu archivo de variables de entorno).
connectDb: Importa una función que se encarga de establecer la conexión a la base de datos.
cors: Importa el middleware CORS (Cross-Origin Resource Sharing), que permite que tu servidor acepte solicitudes de otros orígenes.
router: Importa las rutas definidas en otro archivo, que gestionan las diferentes endpoints de la API.*/

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5173'
/*Configura CORS para permitir solicitudes desde la URL especificada (http://127.0.0.1:5173), 
lo cual es útil durante el desarrollo si tu cliente (frontend) se está ejecutando en un puerto diferente.*/
}));

app.use(express.json());
//Habilita el middleware para que la
// aplicación pueda analizar el cuerpo de las solicitudes en formato JSON.

const init = async () => {
    //Define una función asíncrona para inicializar la aplicación.
    try {
        const db = await connectDb();
        // Intenta conectar a la base de datos. Si la conexión falla,
        // se captura el error y se muestra en la consola.
    } catch (err) {
        console.error('Error en la inicialización de la aplicación:', err);
        process.exit(1); 
        //Si hay un error en la conexión, el proceso se cierra con un código de error 1.
    }
};

app.use(router);

init().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
});

export default app;
