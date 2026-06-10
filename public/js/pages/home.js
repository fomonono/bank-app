const panels = {
  search: document.getElementById("searchPanel"),
  create: document.getElementById("createPanel"),
  transfer: document.getElementById("transferPanel"),
  withdraw: document.getElementById("withdrawPanel"),
};

const searchForm = document.getElementById("searchAccountForm");
const createForm = document.getElementById("createAccountForm");
const transferForm = document.getElementById("transferMoneyForm");
const withdrawForm = document.getElementById("withdrawMoneyForm");
const searchResult = document.getElementById("searchResult");
const transferMessage = document.getElementById("transferMessage");
const withdrawMessage = document.getElementById("withdrawMessage");
const accountNumberInput = document.getElementById("newAccountNumber");
const dashboardBalance = document.getElementById("dashboardBalance");
const dashboardAccounts = document.getElementById("dashboardAccounts");
const dashboardTransfers = document.getElementById("dashboardTransfers");
const dashboardActivity = document.getElementById("dashboardActivity");
const snapshotAccounts = document.getElementById("snapshotAccounts");
const snapshotTransactions = document.getElementById("snapshotTransactions");
const snapshotAverage = document.getElementById("snapshotAverage");

function generateAccountNumber() {
  let accountNumber = "100";

  for (let index = 0; index < 9; index += 1) {
    accountNumber += Math.floor(Math.random() * 10);
  }

  return accountNumber;
}

function setGeneratedAccountNumber() {
  accountNumberInput.value = generateAccountNumber();
}

function showPanel(panelName) {
  Object.values(panels).forEach((panel) => panel.classList.add("hidden"));
  panels[panelName].classList.remove("hidden");

  if (panelName === "create" && !accountNumberInput.value) {
    setGeneratedAccountNumber();
  }

  panels[panelName].scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateDashboard(accounts, transactions) {
  const totalBalance = accounts.reduce((total, account) => total + Number(account.balance || 0), 0);
  const averageBalance = accounts.length ? totalBalance / accounts.length : 0;
  const latestTransaction = transactions[0];

  dashboardBalance.textContent = formatCurrency(totalBalance);
  dashboardAccounts.textContent = accounts.length;
  dashboardTransfers.textContent = transactions.length;
  snapshotAccounts.textContent = accounts.length;
  snapshotTransactions.textContent = transactions.length;
  snapshotAverage.textContent = formatCurrency(averageBalance);

  dashboardActivity.textContent = latestTransaction
    ? `${formatCurrency(latestTransaction.debited)} transfer on ${formatDate(latestTransaction.transaction_date)}`
    : "No transfers recorded yet";
}

function accountSummary(account) {
  return `
    <div class="result-card">
      <div>
        <span class="muted">Account holder</span>
        <strong>${account.first_name} ${account.last_name || ""}</strong>
      </div>
      <div>
        <span class="muted">Account number</span>
        <strong>${account.account_number}</strong>
      </div>
      <div>
        <span class="muted">Balance</span>
        <strong>${formatCurrency(account.balance)}</strong>
      </div>
    </div>
  `;
}

document.getElementById("showSearch").addEventListener("click", () => showPanel("search"));
document.getElementById("showCreate").addEventListener("click", () => showPanel("create"));
document.getElementById("showTransfer").addEventListener("click", () => showPanel("transfer"));
document.getElementById("showWithdraw").addEventListener("click", () => showPanel("withdraw"));
document.getElementById("generateAccountNumber").addEventListener("click", setGeneratedAccountNumber);
document.getElementById("resetView").addEventListener("click", () => {
  Object.values(panels).forEach((panel) => panel.classList.add("hidden"));
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const accountNumber = document.getElementById("accountSearch").value.trim();

  getData(`/accounts/number/${accountNumber}`)
    .then((accounts) => {
      if (!accounts.length) {
        createStatusMessage(searchResult, "No account found with that number.", "error");
        return;
      }

      searchResult.className = "message";
      searchResult.innerHTML = accountSummary(accounts[0]);
      searchResult.classList.remove("hidden");
      searchForm.reset();
    })
    .catch(() => {
      createStatusMessage(searchResult, "Unable to search for this account.", "error");
    });
});

createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const body = Object.fromEntries(new FormData(createForm));

  postData("/accounts", body)
    .then((response) => {
      createStatusMessage(document.getElementById("createMessage"), response.message, "success");
      createForm.reset();
      setGeneratedAccountNumber();
    })
    .catch(() => {
      createStatusMessage(document.getElementById("createMessage"), "Failed to create account.", "error");
    });
});

createForm.addEventListener("reset", () => {
  setTimeout(setGeneratedAccountNumber, 0);
});

transferForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const body = Object.fromEntries(new FormData(transferForm));

  postData("/transfer", {
    source_account: body.source_account,
    destination_account: body.destination_account,
    amount: Number(body.amount),
  })
    .then((response) => {
      createStatusMessage(transferMessage, response.message, "success");
      transferForm.reset();
    })
    .catch((error) => {
      const message = error.response?.data?.error || "Failed to transfer money.";
      createStatusMessage(transferMessage, message, "error");
    });
});

withdrawForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const body = Object.fromEntries(new FormData(withdrawForm));

  postData("/withdraw", {
    source_account: body.source_account,
    amount: Number(body.amount),
  })
    .then((response) => {
      createStatusMessage(withdrawMessage, response.message, "success");
      withdrawForm.reset();
    })
    .catch((error) => {
      const message = error.response?.data?.error || "Failed to withdraw money.";
      createStatusMessage(withdrawMessage, message, "error");
    });
});

Promise.all([getData("/accounts"), getData("/transactions")])
  .then(([accounts, transactions]) => {
    updateDashboard(accounts, transactions);
  })
  .catch(() => {
    dashboardActivity.textContent = "Dashboard data is unavailable";
  });

setGeneratedAccountNumber();
