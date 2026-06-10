const transactionsTableBody = document.getElementById("transactionsTableBody");
const accountName = document.getElementById("accountName");
const accountNumber = document.getElementById("accountNumber");
const accountBalance = document.getElementById("accountBalance");

function renderTransactionRow(transaction) {
  const row = document.createElement("tr");

  row.appendChild(createTableCell(transaction.id));
  row.appendChild(createTableCell(formatCurrency(transaction.balance_after), "numeric"));
  row.appendChild(createTableCell(formatCurrency(transaction.credited), "numeric positive"));
  row.appendChild(createTableCell(formatCurrency(transaction.debited), "numeric negative"));
  row.appendChild(createTableCell(`Account ${transaction.received_from}`));
  row.appendChild(createTableCell(`Account ${transaction.transferred_to}`));
  row.appendChild(createTableCell(formatDate(transaction.transaction_date)));

  transactionsTableBody.appendChild(row);
}

const selectedAccountId = sessionStorage.getItem("selectedAccountId");

if (!selectedAccountId) {
  clearTableBody(transactionsTableBody);
  showEmptyRow(transactionsTableBody, 7, "Select an account first.");
} else {
  getData(`/accounts/${selectedAccountId}`).then((accounts) => {
    const account = accounts[0];

    if (!account) return;

    accountName.textContent = `${account.first_name} ${account.last_name || ""}`.trim();
    accountNumber.textContent = account.account_number;
    accountBalance.textContent = formatCurrency(account.balance);
  });

  getData(`/transactions/${selectedAccountId}`)
    .then((transactions) => {
      clearTableBody(transactionsTableBody);

      if (!transactions.length) {
        showEmptyRow(transactionsTableBody, 7, "No transactions found for this account.");
        return;
      }

      transactions.forEach(renderTransactionRow);
    })
    .catch(() => {
      clearTableBody(transactionsTableBody);
      showEmptyRow(transactionsTableBody, 7, "Unable to load account transactions.");
    });
}
