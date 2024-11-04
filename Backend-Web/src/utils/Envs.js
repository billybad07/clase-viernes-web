import dotenv from 'dotenv';
//import dotenv from 'dotenv';: Importa la biblioteca dotenv, 
//que permite gestionar las variables de entorno.
dotenv.config();
//dotenv.config();: Esta línea carga las variables de entorno definidas
// en un archivo .env (si existe) y las hace accesibles a través de process.env.

export const HOST = process.env.HOST ?? 'localhost';
//Se establece la constante HOST a partir de la variable de entorno HOST.
// Si HOST no está definida, se usa 'localhost' como valor predeterminado.
export const PORT = process.env.PORT ?? 3000;
// Se establece la constante PORT desde la variable de entorno PORT.
// Si no está definida, se utiliza 3000 como valor predeterminado.
export const USER = process.env.USER ?? '';
//Se establece la constante USER desde la variable de entorno USER. 
//Si no está definida, se deja como una cadena vacía.
export const PASSWORD = process.env.PASSWORD ?? '';
// Similar a USER, esta constante almacena la variable de entorno PASSWORD,
// con un valor predeterminado de cadena vacía si no está definida.
export const DATABASE = process.env.DATABASE ?? '';
// Se establece la constante DATABASE desde la variable de entorno DATABASE,
// también con un valor predeterminado de cadena vacía.