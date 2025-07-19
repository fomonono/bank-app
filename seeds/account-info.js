exports.seed = async function(knex) {
  await knex('accounts').del()
  await knex('accounts').insert([
    {
      first_name: 'Dawa', 
      last_name: 'Tamang', 
      email: 'dawa@gmail.com',
      phone_number: '123456',
      account_number: '123456789098', 
      pin_code: '123456', 
      account_type: 'Saving Account',
      balance: '111111',
    },
    {
      first_name: 'Dorji', 
      last_name: 'Tshering', 
      account_number: '123456789012',
      email: 'dawa@gmail.com',
      phone_number: '123456',
      pin_code: '123656', 
      account_type: 'Fix Deposite',
      balance: '222222'
    }
  ]);
};
  