exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transactions').del()
  await knex('transactions').insert([
    {
      id: 1,
      balance: 2000, 
      credited: 500,
      debited: null,
      recived_from: 1,
      transfered_to: null,
    },
    {
      id: 2,
      balance: 1500, 
      credited: null,
      debited: 300,
      recived_from: null,
      transfered_to: 2,
    }
  ]);
};
