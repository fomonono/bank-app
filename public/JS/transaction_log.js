const transactionLogTable = document.getElementById('transactionLogTable');

function renderTransactions(id, balance, credited, debited, recieved, transferred, date){
    const tableRow = document.createElement('tr');

    const Id = document.createElement('td');
    Id.setAttribute('class', 'border border-2 p-2');
    Id.innerText = id;

    const Balance = document.createElement('td');
    Balance.setAttribute('class', 'border border-2 p-2');
    Balance.innerText = balance;

    const redited = document.createElement('td');
    redited.setAttribute('class', 'border border-2 p-2');
    redited.innerText = credited;

    const Dbited = document.createElement('td');
    Dbited.setAttribute('class', 'border border-2 p-2');
    Dbited.innerText = debited;

    const Recieved = document.createElement('td');
    Recieved.setAttribute('class', 'border border-2 p-2');
    Recieved.innerText = `Acc ID: ${recieved}`;

    const Transferred = document.createElement('td');
    Transferred.setAttribute('class', 'border border-2 p-2');
    Transferred.innerText = `Acc ID: ${transferred}`;

    const Date = document.createElement('td');
    Date.setAttribute('class', 'border border-2 p-2 text-center');
    Date.innerText = date;

    tableRow.appendChild(Id);
    tableRow.appendChild(Balance);
    tableRow.appendChild(redited);
    tableRow.appendChild(Dbited);
    tableRow.appendChild(Recieved);
    tableRow.appendChild(Transferred);
    tableRow.appendChild(Date);
    transactionLogTable.appendChild(tableRow)

}

axios.get(`http://localhost:5050/transactions`).then((response)=>{
    console.log(response)
    response.data.forEach((tran)=>{
        renderTransactions(
            tran.id,    
            tran.balance, 
            tran.credited, 
            tran.debited, 
            tran.recived_from, 
            tran.transfered_to,
            tran.transaction_date,
        )
    })
})