const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('../knexfile')

const app = express();
const port = 5050;

const kn = knex(knexConfig.development)

app.use(cors());
app.use(express.json());

app.get('/greetings', (req, res)=>{
  res.send('Hey There!!!')
})

app.get('/accounts', async(req, res)=>{
  const data = await kn('accounts').select('*');
  res.json(data);
})

app.get('/accounts/:id', async(req, res)=>{
  const { id } = req.params;
  const data = await kn('accounts').where('id', id);
  res.send(data);
})

app.get('/transactions', async(req, res)=>{
  const data = await kn('transactions').select('*');
  res.send(data);
})

app.get('/transactions/:id', async(req, res)=>{
  const { id } = req.params;
  const data = await kn('transactions').where('id', id);
  res.send(data);
})

app.listen(port, ()=>{
  console.log(`I am listening to ${port}`)
})