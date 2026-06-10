exports.seed = async function (knex) {
  await knex.raw(
    "TRUNCATE TABLE withdrawals, transactions, accounts RESTART IDENTITY CASCADE",
  );

  const now = knex.fn.now();

  await knex("accounts").insert([
    {
      first_name: "Karma",
      last_name: "Dorji",
      email: "karma.dorji@demo.cdkbank.com",
      phone_number: "+975170017001",
      account_number: "100245780913",
      pin_code: "123456",
      account_type: "Savings",
      balance: 24780.75,
      created_at: now,
      updated_at: now,
    },
    {
      first_name: "Pema",
      last_name: "Wangmo",
      email: "pema.wangmo@demo.cdkbank.com",
      phone_number: "+975170017002",
      account_number: "100245780914",
      pin_code: "036451",
      account_type: "Checking",
      balance: 13140.2,
      created_at: now,
      updated_at: now,
    },
    {
      first_name: "Sonam",
      last_name: "Tshomo",
      email: "sonam.tshomo@demo.cdkbank.com",
      phone_number: "+975170017003",
      account_number: "100245780915",
      pin_code: "452843",
      account_type: "Business",
      balance: 87350.0,
      created_at: now,
      updated_at: now,
    },
    {
      first_name: "Tandin",
      last_name: "Nima",
      email: "tandin.nima@demo.cdkbank.com",
      phone_number: "+9751170017004",
      account_number: "100245780916",
      pin_code: "046529",
      account_type: "Fixed Deposit",
      balance: 150300.0,
      created_at: now,
      updated_at: now,
    },
  ]);
};
