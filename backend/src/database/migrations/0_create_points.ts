import Knex from 'knex';

export async function up(knex:Knex) { //knex:Knex ---> dizemos que a variavel knex é do tipo Knex, para podermos pegar
    //CRIAR UMA TABELA
   return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable(); 
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();

    });

}

export async function down(knex:Knex) {
    //VOLTAR ATRAS (DELETAR A TABELA)
    //Ex: Se adicionarmos um campo novo na tabela com o metodo up, ao executar o metodo down ele deve remover o msm.
   return knex.schema.dropTable('points');

}