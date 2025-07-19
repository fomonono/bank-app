const search = document.getElementById('search');
const create = document.getElementById('create');
const send = document.getElementById('send');
const withdraw = document.getElementById('withdraw');
const searchAcc = document.getElementById('searchAcc');
const actionButton = document.getElementById('actionBtnContainer');
const createAcc = document.getElementById('createAcc');
const transferMoney = document.getElementById('transferMoney');
const withdrawMoney = document.getElementById('withdrawMoney');

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