exports.up = function (knex) {
  return knex.schema.createTable("accounts", function (table) {
    table.increments("id").primary();
    table.string("first_name", 80).notNullable();
    table.string("last_name", 80);
    table.string("email", 120).notNullable().unique();
    table.string("phone_number", 20).notNullable();
    table.string("account_number", 12).notNullable().unique();
    table.string("pin_code", 6).notNullable();
    table.string("account_type", 50).notNullable();
    table.decimal("balance", 12, 2).notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("accounts");
};
