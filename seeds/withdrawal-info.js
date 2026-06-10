exports.seed = async function (knex) {
  await knex("withdrawals").del();

  const accountNumbers = ["100245780913", "100245780914", "100245780915"];

  for (const accountNumber of accountNumbers) {
    const account = await knex("accounts")
      .where("account_number", accountNumber)
      .first();

    if (!account) {
      throw new Error(`Seed account ${accountNumber} was not found.`);
    }
  }

  await knex("withdrawals").insert([
    {
      source_account: "100245780913",
      amount: 150.00,
      created_at: "2026-06-05T10:10:00.000Z",
    },
    {
      source_account: "100245780914",
      amount: 100.00,
      created_at: "2026-06-05T13:25:00.000Z",
    },
    {
      source_account: "100245780915",
      amount: 500.00,
      created_at: "2026-06-06T09:05:00.000Z",
    },
  ]);
};
