const balanceSpan = document.querySelector('.balance-amount');
const incomeSpan = document.querySelector('.income-amount');
const expensesSpan = document.querySelector('.expenses-amount');

balanceSpan.textContent = 0;
incomeSpan.textContent = 0;
expensesSpan.textContent = 0;

let balance = 0;
let income = 0;
let expenses = 0;

const addBtn = document.querySelector('.add-btn');

const titleInput = document.querySelector('.title-input');
const amountInput = document.querySelector('.amount-input');
const dateInput = document.querySelector('.date-input');
const incExpSelect = document.getElementById('income-expenses-select');

const incomeList = document.querySelector('.income-list');
const expensesList = document.querySelector('.expenses-list');


function addTitle(array) {
    array.push(titleInput.value)
}

function addAmount(array) {
    array.push(amountInput.value)
}

function addDate(array) {
    array.push(dateInput.value)
}

function updateStats() {
    incomeSpan.textContent = income;
    expensesSpan.textContent = expenses;
    balanceSpan.textContent = income - expenses;
}

function deleteFromList(e) {
    const price = e.parentElement.firstChild.textContent.slice(2);

    if (e.classList.contains("inc")) {
        income -= parseInt(price);
    } else if (e.classList.contains("exp")) {
        expenses -= parseInt(price);
    }

    updateStats();
    e.parentElement.remove();
}

function addToIncomeOrExpenses(list) {
    const span1 = document.createElement("span");
    span1.textContent = `$ ${amountInput.value}`;
    span1.classList.add("price")

    const span2 = document.createElement("span");
    span2.textContent = titleInput.value;
    span2.classList.add("add-what")

    const span3 = document.createElement("span");
    span3.textContent = `(${dateInput.value})`;
    span3.classList.add("add-when");

    const span4 = document.createElement("span");
    span4.textContent = "x";
    span4.classList.add("delete");

    if (list == incomeList) {
        span4.classList.add("inc")
    } else if (list == expensesList) {
        span4.classList.add("exp")
    }

    span4.addEventListener('click', deleteFromList.bind(this, span4));

    const listEl = document.createElement("div");
    listEl.classList.add("list-element")
    listEl.appendChild(span1);
    listEl.appendChild(span2);
    listEl.appendChild(span3);
    listEl.appendChild(span4);

    list.appendChild(listEl);

    if (list == incomeList) {
        income += parseInt(amountInput.value);
    } else if (list == expensesList) {
        expenses += parseInt(amountInput.value);
    }

    updateStats();

    titleInput.value = "";
    amountInput.value = "";
    incExpSelect.value = "";
    dateInput.value = "";
}

function addElement() {
    if (titleInput.value == "" || amountInput.value == "") {
        alert();
        return;
    }
    
    const elementArray = [];

    addTitle(elementArray);
    addAmount(elementArray);
    addDate(elementArray);

    if (incExpSelect.value == "income") {
        addToIncomeOrExpenses(incomeList);
    } else if (incExpSelect.value == "expenses") {
        addToIncomeOrExpenses(expensesList);
    }
}

addBtn.addEventListener('click', addElement)