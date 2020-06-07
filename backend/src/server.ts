import express from 'express'; //Importamos a biblioteca do express
import routes from './routes'; //Importamos as rotas
import path from 'path';
import cors from 'cors';
/*
IMPORTANTE
Não esquecer de instalar os pacotes de tipagem, iniciar a config do ts, e o ts node(npm install ts-node -D) para usufruir da aplicação e de todas as vantagens do typescript :)
Depois para iniciar o servidor use o comando npx ts-node src/server.ts
*/

//Neste codigo declaramos a const app para usar a função do express e as rotas, e tambem conseguir interpretar JSONS
const app = express();
app.use(cors()); // Permite que todas url acessam a api
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads'))); //define uma rota para item estaticos. (que foram criado pelas seeds)

/*Inciamos o servidor na porta 3333, e printamos no console quando ele for iniciado*/
app.listen(3333, () => {
    console.log('Servidor rodando...');
})
//Rota: Endereço completo da requisição.
//Recurso: Qual entidade estamos acessando do sistema.

/*Métodos HTTP
GET: Buscar uma ou mais informações no back-end
POST: Criar uma nova informação no back-end
PUT: Atualizar uma informação no back-end
DELETE: Remover uma informação no back-end
*/

/*Tipos de paramêtro
Request Body: São parametros para criação/atualização de informações

Query Param: São os parametros da propria rota geralmente opcionais, usados mais para buscas, filtros e paginação dentro do back-end
Ex: request.query.search ----> ia realizar a busca passando o que foi digitado

Request Param: São os parametros da própria rota que indentificam um recurso(Usado mais para mexer com um unico elemento). 
Ex: request.params.id ----> Pegaria o id da rota /users/:id
*/  
