import express, { request, response } from 'express'; //Importa o express, request e o response do express.
import knex from './database/connection' //Importa a conexão com o banco de dados.
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

/*Cria a instancia de classes*/
const pointsController = new PointsController(); 
const itemsController = new ItemsController();

const routes = express.Router(); //Define uma consta routes com o metodo Router, para receber as rotas.


/*
Padrao da comunidade dos metodos
index : Para exibir lista
show : Para exibir um unico resultado
create: Para criar
update: Para alterar
delete: Para deletar
*/


//Busca uma lista de items
routes.get('/items', itemsController.index);
//Cria um point
routes.post('/points', pointsController.create); //Pega o metodo create da classe points controller
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show); //Lista um point com id especifico


export default routes; //Exporta a const routes, para podermos acessar de outro arquivo.