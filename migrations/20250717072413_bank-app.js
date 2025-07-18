module.exports = {
  development: {
    client: 'pg',
    connection: { user: 'me', database: 'my_app' },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};

exports.up = function(knex) {
  return knex.schema.createTable('accounts', function (table) {
  table.increments('id');
  table.string('first_name').notNullable();
  table.string('last_name').notNullable();
  table.string('Account_Number', 12).notNullable();
  table.string('Pin_code', 6).notNullable();
  table.integer('Balance');
  table.timestamp(true,true);
});
};


exports.down = function(knex) {
  return knex.schema.dropTable('accounts');
};
