const search = document.getElementById('search');
const create = document.getElementById('create');
const send = document.getElementById('send');
const withdraw = document.getElementById('withdraw');
const userTable = document.getElementById('userTable');
const navigation = document.getElementById('navigation');
const reset = document.getElementById('reset');
const searchAcc = document.getElementById('searchAcc');
const createAcc = document.getElementById('createAcc');
const transferMoney = document.getElementById('transferMoney');
const withdrawMoney = document.getElementById('withdrawMoney');
const actionButton = document.getElementById('actionBtnContainer');

//Search User by Account Number
search.addEventListener('click', (event)=>{
    event.preventDefault()
    actionButton.classList.add('hidden')
    searchAcc.classList.remove('hidden')
    searchAcc.classList.add('block');
})

searchAcc.addEventListener('submit', function(event) {
    event.preventDefault();
    const inputValue = document.getElementById("accountSearch").value;
    axios.get(`http://localhost:5050/accounts/number/${inputValue}`).then((response)=>{
        console.log(response)
        response.data.forEach((user)=>{
            renderUser(
                user.id, 
                user.first_name,
                user.last_name,
                user.email,
                user.account_number, 
                user.phone_number,
                user.pin_code, 
                user.account_type,
                user.balance,
                user.created_at
            )
        })
    })
    userTable.classList.remove('hidden')
    navigation.classList.remove('hidden')
    searchAcc.reset()
});

reset.addEventListener('click', ()=>{
    location.reload()
})

function renderUser(id, fname, lname, email, account, number, pin, acType, balance, date){
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

    const actionTab = document.createElement('td');
    actionTab.setAttribute('class', ' p-2 text-center grid grid-cols-1 gap-2');
    
    const TransactionBtn = document.createElement('button');
    TransactionBtn.setAttribute('class', 'bg-[#2e3a4d] rounded text-white py-1 px-3 buttonClick');
    TransactionBtn.setAttribute('type', 'submit');
    TransactionBtn.innerText = 'Transaction';

    const UpdateBtn = document.createElement('button');
    UpdateBtn.setAttribute('class', 'bg-[#00b94b] rounded text-white py-1 px-3 buttonClick');
    UpdateBtn.setAttribute('type', 'submit');
    UpdateBtn.innerText = 'Update';

    const DeleteBtn = document.createElement('button');
    DeleteBtn.setAttribute('class', 'bg-[#d5263e] rounded text-white py-1 px-3 buttonClick');
    DeleteBtn.setAttribute('type', 'submit');
    DeleteBtn.innerText = 'Delete';

    TransactionBtn.addEventListener('click', () => {
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
    actionTab.appendChild(TransactionBtn);
    actionTab.appendChild(UpdateBtn);
    actionTab.appendChild(DeleteBtn);
    tableRow.appendChild(actionTab);
    userTable.appendChild(tableRow);
}

//Create Account Form Display
create.addEventListener('click', (event)=>{
    event.preventDefault()
    actionButton.classList.add('hidden')
    createAcc.classList.remove('hidden')
    createAcc.classList.add('block');
})

//Transfer Money Form Display
send.addEventListener('click', (event)=>{
    event.preventDefault()
    actionButton.classList.add('hidden')
    transferMoney.classList.remove('hidden')
    transferMoney.classList.add('block');
})

//Withdraw Money Form Display
withdraw.addEventListener('click', (event)=>{
    event.preventDefault()
    actionButton.classList.add('hidden')
    withdrawMoney.classList.remove('hidden')
    withdrawMoney.classList.add('block');
})

//Create Account Form Submmit function
function createAccount(){
    const formData = new FormData(createAcc);
    const body = Object.fromEntries(formData);
    axios.post('http://localhost:5050/accounts', body).then(response =>{
        alert('Account Created Successfully.');
    })
    .catch(error => {
        console.error('Error creating account:', error);
        alert('Failed to create Account!!!');
    });
}

createAcc.addEventListener('submit', (event)=>{
    event.preventDefault()
    createAccount()
})

