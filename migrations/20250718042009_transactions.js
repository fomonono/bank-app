exports.up = function(knex) {
  return knex.schema.createTable('transactions', function (table) {
    table.integer('id');
    table.integer('balance');
    table.integer('credited');
    table.integer('debited');
    table.integer('recived_from')
    .unsigned()
    .references('id')
    .inTable('accounts')
    .onDelete('CASCADE');
    table.integer('transfered_to')
    .unsigned()
    .references('id')
    .inTable('accounts')
    .onDelete('CASCADE');
    table.string('transaction_date').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
