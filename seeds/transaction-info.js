exports.seed = async function (knex) {
  await knex("transactions").del();

  async function getAccount(accountNumber) {
    const account = await knex("accounts")
      .where("account_number", accountNumber)
      .first();

    if (!account) {
      throw new Error(`Seed account ${accountNumber} was not found.`);
    }

    return account;
  }

  const karma = await getAccount("100245780913");
  const pema = await getAccount("100245780914");
  const sonam = await getAccount("100245780915");
  const tandin = await getAccount("100245780916");

  await knex("transactions").insert([
    {
      balance_after: 24180.75,
      credited: 800.0,
      debited: 800.0,
      received_from: karma.id,
      transferred_to: pema.id,
      transaction_date: "2026-06-01T09:30:00.000Z",
    },
    {
      balance_after: 11640.2,
      credited: 1500.0,
      debited: 1500.0,
      received_from: pema.id,
      transferred_to: sonam.id,
      transaction_date: "2026-06-02T11:15:00.000Z",
    },
    {
      balance_after: 85550.0,
      credited: 1800.0,
      debited: 1800.0,
      received_from: sonam.id,
      transferred_to: tandin.id,
      transaction_date: "2026-06-03T14:45:00.000Z",
    },
    {
      balance_after: 150300.0,
      credited: 750.0,
      debited: 750.0,
      received_from: tandin.id,
      transferred_to: karma.id,
      transaction_date: "2026-06-04T16:20:00.000Z",
    },
  ]);
};
