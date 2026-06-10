const transactionHistoryBody = document.getElementById("transactionHistoryBody");
const transactionCount = document.getElementById("transactionCount");

function renderHistoryRow(transaction) {
  const row = document.createElement("tr");

  row.appendChild(createTableCell(transaction.id));
  row.appendChild(createTableCell(formatCurrency(transaction.balance_after), "numeric"));
  row.appendChild(createTableCell(formatCurrency(transaction.credited), "numeric positive"));
  row.appendChild(createTableCell(formatCurrency(transaction.debited), "numeric negative"));
  row.appendChild(createTableCell(`Account ${transaction.received_from}`));
  row.appendChild(createTableCell(`Account ${transaction.transferred_to}`));
  row.appendChild(createTableCell(formatDate(transaction.transaction_date)));

  transactionHistoryBody.appendChild(row);
}

getData("/transactions")
  .then((transactions) => {
    clearTableBody(transactionHistoryBody);
    transactionCount.textContent = transactions.length;

    if (!transactions.length) {
      showEmptyRow(transactionHistoryBody, 7, "No transactions have been recorded yet.");
      return;
    }

    transactions.forEach(renderHistoryRow);
  })
  .catch(() => {
    clearTableBody(transactionHistoryBody);
    showEmptyRow(transactionHistoryBody, 7, "Unable to load transaction history.");
  });
