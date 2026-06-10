exports.up = function (knex) {
  return knex.schema.createTable("transactions", function (table) {
    table.increments("id").primary();
    table.decimal("balance_after", 12, 2).notNullable();
    table.decimal("credited", 12, 2).defaultTo(0);
    table.decimal("debited", 12, 2).defaultTo(0);
    table
      .integer("received_from")
      .unsigned()
      .references("id")
      .inTable("accounts")
      .onDelete("CASCADE");
    table
      .integer("transferred_to")
      .unsigned()
      .references("id")
      .inTable("accounts")
      .onDelete("CASCADE");
    table.timestamp("transaction_date").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("transactions");
};
