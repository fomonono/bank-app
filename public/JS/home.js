const search = document.getElementById('search');
const create = document.getElementById('create');
const send = document.getElementById('send');
const withdraw = document.getElementById('withdraw');

const searchAcc = document.getElementById('searchAcc');
const createAcc = document.getElementById('createAcc');
const transferMoney = document.getElementById('transferMoney');
const withdrawMoney = document.getElementById('withdrawMoney');
const actionButton = document.getElementById('actionBtnContainer');

search.addEventListener('click', (event)=>{
    event.preventDefault()
    actionButton.classList.add('hidden')
    searchAcc.classList.remove('hidden')
    searchAcc.classList.add('block');
})

create.addEventListener('click', (event)=>{
    event.preventDefault()
    actionButton.classList.add('hidden')
    createAcc.classList.remove('hidden')
    createAcc.classList.add('block');
})

send.addEventListener('click', (event)=>{
    event.preventDefault()
    actionButton.classList.add('hidden')
    transferMoney.classList.remove('hidden')
    transferMoney.classList.add('block');
})

withdraw.addEventListener('click', (event)=>{
    event.preventDefault()
    actionButton.classList.add('hidden')
    withdrawMoney.classList.remove('hidden')
    withdrawMoney.classList.add('block');
})

function createAccount(){
    const formData = new FormData(createAcc);
    const body = Object.fromEntries(formData);
    axios.post('http://localhost:5050/accounts', body).then(response =>{
        alert('Account Created');
    })
    .catch(error => {
        console.error('Error creating account:', error);
        alert('Failed to create account');
    });
}

createAcc.addEventListener('submit', (event)=>{
    event.preventDefault()
    createAccount()
})

