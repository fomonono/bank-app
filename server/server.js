const express = require("express");
const cors = require("cors");
const knex = require("knex");
const path = require("path");
const knexConfig = require("../knexfile");

const app = express();
const port = process.env.PORT || 5050;

//DB connection
const kn = knex(knexConfig.development);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const pages = {
  home: "/pages/home.html",
  accounts: "/pages/accounts.html",
  "account-transactions": "/pages/account-transactions.html",
  "transaction-history": "/pages/transaction-history.html",
};

//Server check
app.get("/greetings", (req, res) => {
  res.send("Hey There!!!");
});

app.get("/", (req, res) => {
  res.redirect(pages.home);
});

app.get(["/home", "/home.html"], (req, res) => {
  res.redirect(pages.home);
});

app.get("/accounts.html", (req, res) => {
  res.redirect(pages.accounts);
});

app.get(["/account-transactions.html", "/transactions.html"], (req, res) => {
  res.redirect(pages["account-transactions"]);
});

app.get(["/transaction-history.html", "/transaction_log.html"], (req, res) => {
  res.redirect(pages["transaction-history"]);
});

//Get all accounts
app.get("/accounts", async (req, res) => {
  const data = await kn("accounts").select("*");
  res.json(data);
});

//Get account by Account Number
app.get("/accounts/number/:account_number", async (req, res) => {
  const { account_number } = req.params;
  const data = await kn("accounts").where("account_number", account_number);
  res.send(data);
});

//Get account by ID
app.get("/accounts/:id", async (req, res) => {
  const { id } = req.params;
  const data = await kn("accounts").where("id", id);
  res.send(data);
});

//Get all Transactions
app.get("/transactions", async (req, res) => {
  const data = await kn("transactions")
    .select("*")
    .orderBy("transaction_date", "desc");
  res.send(data);
});

//Get transactions by account ID
app.get("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const data = await kn("transactions")
    .where("received_from", id)
    .orWhere("transferred_to", id)
    .orderBy("transaction_date", "desc");

  res.send(data);
});

//Post new user to account
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
  if (!source_account || !amount) {
    return res
      .status(400)
      .json({ error: "Source account and amount are required" });
  }

  const withdrawalAmount = Number(amount);
  if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
    return res.status(400).json({ error: "Enter a valid withdrawal amount" });
  }

  try {
    const result = await kn.transaction(async (trx) => {
      const account = await trx("accounts")
        .where("account_number", source_account)
        .first();

      if (!account) {
        return {
          status: 404,
          body: { error: "Source account not found" },
        };
      }

      const currentBalance = Number(account.balance);

      if (currentBalance < withdrawalAmount) {
        return {
          status: 400,
          body: { error: "Insufficient balance" },
        };
      }
      await trx("accounts")
        .where("account_number", source_account)
        .update({
          balance: currentBalance - withdrawalAmount,
        });

      await trx("withdrawals").insert({
        source_account,
        amount: withdrawalAmount,
        created_at: kn.fn.now(),
      });

      return {
        status: 200,
        body: { message: "Withdrawal successful!" },
      };
    });

    return res.status(result.status).json(result.body);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/transfer", async (req, res) => {
  const { source_account, destination_account, amount } = req.body;

  if (!source_account || !destination_account || !amount) {
    return res
      .status(400)
      .json({
        error: "Source account, destination account, and amount are required",
      });
  }

  const transferAmount = Number(amount);
  if (isNaN(transferAmount) || transferAmount <= 0) {
    return res.status(400).json({ error: "Enter a valid transfer amount" });
  }

  try {
    const result = await kn.transaction(async (trx) => {
      const sourceAccount = await trx("accounts")
        .where("account_number", source_account)
        .first();

      const destAccount = await trx("accounts")
        .where("account_number", destination_account)
        .first();

      if (!sourceAccount || !destAccount) {
        return {
          status: 404,
          body: { error: "Source or destination account not found" },
        };
      }

      const sourceBalance = Number(sourceAccount.balance);
      const destinationBalance = Number(destAccount.balance);

      if (sourceBalance < transferAmount) {
        return {
          status: 400,
          body: { error: "Insufficient balance" },
        };
      }

      await trx("accounts")
        .where("account_number", source_account)
        .update({
          balance: sourceBalance - transferAmount,
        });

      await trx("accounts")
        .where("account_number", destination_account)
        .update({
          balance: destinationBalance + transferAmount,
        });

      await trx("transactions").insert({
        balance_after: sourceBalance - transferAmount,
        debited: transferAmount,
        credited: transferAmount,
        received_from: sourceAccount.id,
        transferred_to: destAccount.id,
        transaction_date: kn.fn.now(),
      });

      return {
        status: 200,
        body: { message: "Transfer successful!" },
      };
    });

    return res.status(result.status).json(result.body);
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

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const transfers = await kn("transactions")
      .select(
        "transaction_date",
        "debited",
        "credited",
        kn.raw(
          "CASE WHEN received_from = ? THEN 'outgoing' ELSE 'incoming' END as type",
          [account.id],
        ),
      )
      .where("received_from", account.id)
      .orWhere("transferred_to", account.id)
      .orderBy("transaction_date", "desc");

    return res.status(200).json(transfers);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

//Server listening to the defined port
app.listen(port, () => {
  console.log(`I am listening to ${port}`);
});
