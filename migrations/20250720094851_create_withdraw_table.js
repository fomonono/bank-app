exports.up = function (knex) {
  return knex.schema.createTable("withdrawals", (table) => {
    table.increments("id").primary();
    table.string("source_account", 12).notNullable();
    table.decimal("amount", 12, 2).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("withdrawals")
    .dropTableIfExists("withdraw");
};
