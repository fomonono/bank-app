exports.up = function(knex) {
  return knex.schema.createTable('accounts', function (table) {
    table.increments('id');
    table.string('first_name').notNullable();
    table.string('last_name');
    table.string('account_number', 12).notNullable();
    table.string('email', 50)
    table.string('account_type', 50)
    table.string('pin_code', 6).notNullable();
    table.integer('balance');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('accounts');
};
