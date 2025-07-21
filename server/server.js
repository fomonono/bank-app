const express = require("express");
const cors = require("cors");
const knex = require("knex");
const knexConfig = require("../knexfile");

const app = express();
const port = 5050;

const kn = knex(knexConfig.development);

app.use(cors());
app.use(express.json());

app.get("/greetings", (req, res) => {
  res.send("Hey There!!!");
});

app.get("/accounts", async (req, res) => {
  const data = await kn("accounts").select("*");
  res.json(data);
});

app.get("/accounts/:id", async (req, res) => {
  const { id } = req.params;
  const data = await kn("accounts").where("id", id);
  res.send(data);
});

app.get("/accounts/number/:account_number", async (req, res) => {
  const { account_number } = req.params;
  const data = await kn("accounts").where("account_number", account_number);
  res.send(data);
});

app.get("/transactions", async (req, res) => {
  const data = await kn("transactions").select("*");
  res.send(data);
});

app.get("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const data = await kn("transactions").where("id", id);
  res.send(data);
});

app.post("/accounts", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      account_number,
      phone_number,
      pin_code,
      account_type,
      balance,
    } = req.body;
    await kn("accounts").insert({
      first_name,
      last_name,
      email,
      account_number,
      phone_number,
      pin_code,
      account_type,
      balance,
    });
    return res.status(201).json({ message: "Account Created Successfully" });
  } catch (err) {
    console.error("Database insert error:", err);
    res.status(500).json({ error: "Failed to create account" });
  }
});

app.post("/withdraw", async (req, res) => {
  const { source_account, amount } = req.body;
  const withdrawalAmount = Number(amount);

  try {
    const result = await kn.transaction(async (trx) => {
      const account = await trx("accounts")
        .where("account_number", source_account)
        .first();

      await trx("accounts")
        .where("account_number", source_account)
        .update({
          balance: account.balance - withdrawalAmount,
        });

      await trx("withdraw").insert({
        source_account,
        amount: withdrawalAmount,
        created_at: kn.fn.now(),
      });

      return { message: "Withdrawal successful!" };
    });

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/transfer", async (req, res) => {
  const { source_account, destination_account, amount } = req.body;
  const transferAmount = Number(amount);

  try {
    const result = await kn.transaction(async (trx) => {
      const sourceAccount = await trx("accounts")
        .where("account_number", source_account)
        .first();

      const destAccount = await trx("accounts")
        .where("account_number", destination_account)
        .first();

      await trx("accounts")
        .where("account_number", source_account)
        .update({
          balance: sourceAccount.balance - transferAmount,
        });

      await trx("accounts")
        .where("account_number", destination_account)
        .update({
          balance: destAccount.balance + transferAmount,
        });

      await trx("transactions").insert({
        balance: sourceAccount.balance - transferAmount,
        debited: transferAmount,
        credited: transferAmount,
        recived_from: sourceAccount.id,
        transfered_to: destAccount.id,
        transaction_date: kn.fn.now(),
      });

      return { message: "Transfer successful!" };
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Transfer error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Something went wrong" });
  }
});

app.get("/transfers/:account_number", async (req, res) => {
  const { account_number } = req.params;

  try {
    const account = await kn("accounts")
      .where("account_number", account_number)
      .first();

    const transfers = await kn("transactions")
      .select(
        "transaction_date",
        "debited",
        "credited",
        kn.raw(
          "CASE WHEN recived_from = ? THEN 'outgoing' ELSE 'incoming' END as type",
          [account.id]
        )
      )
      .where("recived_from", account.id)
      .orWhere("transfered_to", account.id)
      .orderBy("transaction_date", "desc");

    return res.status(200).json(transfers);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`I am listening to ${port}`);
});
