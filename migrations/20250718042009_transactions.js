exports.up = function(knex) {
  return knex.schema.createTable('transactions', function (table) {
    table.integer('Balance');
    table.integer('Credited');
    table.integer('Debited');
    table.string('Recived_From').notNullable();
    table.string('Transfered_To').notNullable();
    table.string('Transaction_Date').notNullable();
});
};


exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
