exports.up = function(knex) {
  return knex.schema.CreateTable('accounts', function (table) {
  table.increments('id');
  table.string('first_name');
  table.string('last_name');
  table.string('Account_Number', 12);
  table.string('Pin_code', 6);
  table.integer('Balance');
  table.timestamp(true,true);
});
};


exports.down = function(knex) {
  return knex.schema.dropTable('accounts')
};
