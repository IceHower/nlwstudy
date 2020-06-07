/*Aqui temos que usar a sintaxe normal, pois o knexfile nao funciona com o typescript*/
import path from 'path';

module.exports = {
    client:'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),

    },

    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: { //define o diretorio da seeds
        directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true,
};

/* Usar npx knex migrate:latest --knexfile knexfile.ts migrate:latest, para podermos criar a database com as migrations */