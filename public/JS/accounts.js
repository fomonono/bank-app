const usersTable = document.getElementById('usersTable');

function renderUsers(id, fname, lname, email, account, number, pin, acType, balance, date){
    const tableRow = document.createElement('tr');

    const Id = document.createElement('td');
    Id.setAttribute('class', 'border border-2 p-2');
    Id.innerText = id;

    const fName = document.createElement('td');
    fName.setAttribute('class', 'border border-2 p-2');
    fName.innerText = fname;

    const lName = document.createElement('td');
    lName.setAttribute('class', 'border border-2 p-2');
    lName.innerText = lname;

    const mail = document.createElement('td');
    mail.setAttribute('class', 'border border-2 p-2');
    mail.innerText = email;

    const acc = document.createElement('td');
    acc.setAttribute('class', 'border border-2 p-2');
    acc.innerText = account;

    const phone = document.createElement('td');
    phone.setAttribute('class', 'border border-2 p-2');
    phone.innerText = number;

    const Pin = document.createElement('td');
    Pin.setAttribute('class', 'border border-2 p-2');
    Pin.innerText = pin;

    const accType = document.createElement('td');
    accType.setAttribute('class', 'border border-2 p-2');
    accType.innerText = acType;

    const Balance = document.createElement('td');
    Balance.setAttribute('class', 'border border-2 p-2');
    Balance.innerText = balance;

    const Date = document.createElement('td');
    Date.setAttribute('class', 'border border-2 p-2');
    Date.innerText = date;

    const tableData = document.createElement('td');
    tableData.setAttribute('class', 'border border-2 p-2 text-center');
    
    const tDbtn = document.createElement('button');
    tDbtn.setAttribute('class', 'bg-[#2e3a4d] rounded w-6/12 text-white py-1 px-3 buttonClick');
    tDbtn.setAttribute('value', id);
    tDbtn.setAttribute('type', 'submit');
    tDbtn.innerText = 'Click';

    tDbtn.addEventListener('click', () => {
        const storeValue = id;
        sessionStorage.setItem('storeValue', storeValue)
        window.location.href = `./transactions.html`;
    });

    tableRow.appendChild(Id);
    tableRow.appendChild(fName);
    tableRow.appendChild(lName);
    tableRow.appendChild(mail);
    tableRow.appendChild(acc);
    tableRow.appendChild(phone);
    tableRow.appendChild(Pin);
    tableRow.appendChild(accType);
    tableRow.appendChild(Balance);
    tableRow.appendChild(Date)
    tableData.appendChild(tDbtn);
    tableRow.appendChild(tableData);
    usersTable.appendChild(tableRow);
}

axios.get(`http://localhost:5050/accounts`).then((response)=>{
    console.log(response)
    response.data.forEach((users)=>{
        renderUsers(
            users.id, 
            users.first_name,
            users.last_name,
            users.email,
            users.account_number, 
            users.phone_number,
            users.pin_code, 
            users.account_type,
            users.balance,
            users.created_at
        )
    })
})
