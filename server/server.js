const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('../knexfile')

const app = express();
const port = 5050;

//DB connection
const kn = knex(knexConfig.development)

app.use(cors());
app.use(express.json());

//Server check
app.get('/greetings', (req, res)=>{
  res.send('Hey There!!!')
})

//Get all accounts
app.get('/accounts', async(req, res)=>{
  const data = await kn('accounts').select('*');
  res.json(data);
})

//Get account by ID
app.get('/accounts/:id', async(req, res)=>{
  const { id } = req.params;
  const data = await kn('accounts').where('id', id);
  res.send(data);
})

//Get account by Account Number
app.get('/accounts/number/:account_number', async(req, res)=>{
  const { account_number } = req.params;
  const data = await kn('accounts').where('account_number', account_number);
  res.send(data);
})

//Get all Transactions
app.get('/transactions', async(req, res)=>{
  const data = await kn('transactions').select('*');
  res.send(data);
})

//Get transactions by ID
app.get('/transactions/:id', async(req, res)=>{
  const { id } = req.params;
  const data = await kn('transactions').where('id', id);
  res.send(data);
})

//Post new user to account
app.post('/accounts', async(req, res)=>{
  try{
    const { first_name, last_name, email, account_number, phone_number, pin_code, account_type, balance } = req.body;
    await kn('accounts').insert({ first_name, last_name, email, account_number, phone_number, pin_code, account_type, balance });
    return res.status(201).json({ message: 'Account Created Successfully' });
  }catch (err) {
    console.error('Database insert error:', err);
    res.status(500).json({ error: 'Failed to create account' });
  }
})

//Server listening to the defined port
app.listen(port, ()=>{
  console.log(`I am listening to ${port}`)
})