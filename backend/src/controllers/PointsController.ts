import {Request, Response} from 'express'; //importa o Request e Response dentro do express
import knex from '../database/connection'; //Importa o knex do arquivo connection


class PointsController {
/*Como estamos usando o desustruturamento do javascrip nao precisamos escrever ali no objeto name:name, 
podemos só utilizar o nome da variavel ja que ela é igual. */
    async index(request: Request, response: Response) {
        //Filtro de cidade, uf, items
        const { city, uf , items } = request.query;
        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim())); // Pega os items separa os por virgulas e remove os espaçamentos da esquerda/direita

        /* Procura pelo menos um dos pontos que ta recebendo no query items */
        const listPoint = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*'); //.distinc() para retornar os pontos de coletas distintos

        return response.json(listPoint);
        
    }
    async show(request: Request, response: Response) {
        const {id} = request.params;
        const showPoint = await knex('points').where('id', id).first();
        if(!showPoint) {
            return response.status(400).json({message: "point not found."})
        }
        //O codigo abaixo esta realizando uma busca dos items de coleta que os locais pegam.
        const items = await knex('items').join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id).select('items.title');

        return response.json({showPoint, items});

    }
    async create(request:Request, response:Response) {
        const {name, email, whatsapp, latitude, longitude, city, uf, items} = request.body;
        const trx = await knex.transaction();
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }
        const insertedIds = await trx('points').insert(point);
        const point_id = insertedIds[0] //retorna o id do registro, como so é possivel so fazer um registro de cada vez retorna o registro na posição 0.

        //Cria o relacionamento entre as duas tabelas
        const pointItems = items.map((item_id:number) => { //percorre o array e retorna cada id dentro da variavel item_id
            return {
                item_id,
                point_id, 
            }
        });
    
        await trx('point_items').insert(pointItems);
        await trx.commit();
        return response.json({ 
            id: point_id,
            ...point, // O ... é spread operator, ele faz com que pega as informações de um objeto e retorna em outro
        });
    }
}

export default PointsController;