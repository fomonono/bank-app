const accountsTableBody = document.getElementById("accountsTableBody");
const accountCount = document.getElementById("accountCount");
const totalBalance = document.getElementById("totalBalance");

function renderAccountRow(account) {
  const row = document.createElement("tr");

  row.appendChild(createTableCell(account.id));
  row.appendChild(createTableCell(`${account.first_name} ${account.last_name || ""}`.trim()));
  row.appendChild(createTableCell(account.email));
  row.appendChild(createTableCell(account.account_number));
  row.appendChild(createTableCell(account.phone_number));
  row.appendChild(createTableCell(account.account_type));
  row.appendChild(createTableCell(formatCurrency(account.balance), "numeric"));
  row.appendChild(createTableCell(formatDate(account.created_at)));

  const actionCell = createTableCell("");
  const button = document.createElement("button");
  button.className = "action-button primary";
  button.type = "button";
  button.textContent = "View";
  button.addEventListener("click", () => {
    sessionStorage.setItem("selectedAccountId", account.id);
    window.location.href = "./account-transactions.html";
  });

  actionCell.appendChild(button);
  row.appendChild(actionCell);
  accountsTableBody.appendChild(row);
}

function updateSummary(accounts) {
  accountCount.textContent = accounts.length;
  const balance = accounts.reduce((total, account) => total + Number(account.balance || 0), 0);
  totalBalance.textContent = formatCurrency(balance);
}

getData("/accounts")
  .then((accounts) => {
    clearTableBody(accountsTableBody);
    updateSummary(accounts);

    if (!accounts.length) {
      showEmptyRow(accountsTableBody, 9, "No accounts found yet.");
      return;
    }

    accounts.forEach(renderAccountRow);
  })
  .catch(() => {
    clearTableBody(accountsTableBody);
    showEmptyRow(accountsTableBody, 9, "Unable to load accounts.");
  });
