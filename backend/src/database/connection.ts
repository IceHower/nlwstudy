import knex from 'knex';
import path from 'path';
/* 
Neste codigo, declaramos uma const connection para armazenar o tipo de database que iremos utilizar, e o caminho aonde ela se encontra.
Utiliza-se a função do express path.resolve() para poder passar um "caminho universal" que será utilizado em qualquer OS.
*/
const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'), //Variavel global __dirname sempre irá retornar o caminho do arquivo que está executando ele.
    },
    useNullAsDefault: true,
});

export default connection;