exports.up = function (knex) {
  return knex.schema.createTable("withdraw", (table) => {
    table.increments("id").primary();
    table.string("source_account").notNullable();
    table.decimal("amount").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("withdraw");
};
