function createTableCell(value, className = "") {
  const cell = document.createElement("td");
  cell.textContent = value ?? "Not available";

  if (className) {
    cell.className = className;
  }

  return cell;
}

function createStatusMessage(container, message, type = "success") {
  container.className = `message message-${type}`;
  container.textContent = message;
  container.classList.remove("hidden");
}

function clearTableBody(tableBody) {
  tableBody.innerHTML = "";
}

function showEmptyRow(tableBody, columnCount, message) {
  const row = document.createElement("tr");
  const cell = createTableCell(message, "empty-table");
  cell.colSpan = columnCount;
  row.appendChild(cell);
  tableBody.appendChild(row);
}
