exports.seed = async function(knex) {
  await knex('accounts').del()
  await knex('accounts').insert([
    {
      first_name: 'Dawa', 
      last_name: 'Tamang', 
      account_number: '123456789098', 
      email: 'dawa@gmail.com',
      account_type: 'Saving Account',
      pin_code: '123456', 
      balance: '111111',
    },
    {
      first_name: 'Dorji', 
      last_name: 'Tshering', 
      account_number: '123456789012',
      email: 'dawa@gmail.com',
      account_type: 'Fix Deposite',
      pin_code: '123656', 
      balance: '222222'
    }
  ]);
};
  