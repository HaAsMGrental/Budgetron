let celkHodnota = document.getElementById("celkem_hodnota");

let vydaj = document.getElementById("vydaj");

const checkAmountButton = document.getElementById("zadat_vydaj");

const totalAmtButton = document.getElementById("celkem-hodnota-button");

const productTitle = document.getElementById("nazev_vydaje");

const errorMessage = document.getElementById("budget_chyba");

const productTitleError = document.getElementById("nazev_chyba");

const productCostError = document.getElementById("product-cost-error");

const amount = document.getElementById("amt");

const expenditureValue = document.getElementById("vydaj-value");

const balanceValue = document.getElementById("stav");

const list = document.getElementById("seznam");

let tempAmount = 0;


// Nastavení budgetu

totalAmtButton.addEventListener("click", () => {
    tempAmount = celkHodnota.value;
    //prázdný/neg vstup
    if(tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
} else {
    errorMessage.classList.add("hide");
    //nastaví budget
    amount.innerHTML = tempAmount;
    //výpočet aktuálního budgetu
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    
    celkHodnota.value = "";
}
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
      element.disabled = bool;
    });
};

//Úprava seznamu

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").inerText;
        productTitle.value = parentText;
        vydaj.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

//Vytvoření seznamu

const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa", "fa-pencil-square-o", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa", "fa-trash", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);    
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("seznam").appendChild(sublistContent);
};

//Přidání výdajů

checkAmountButton.addEventListener("click", () => {

    //kontrola
    if (!vydaj.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }

    //zobrazení tlačítek
    disableButtons(false);

    //výdaj
    let expenditure = parseInt(vydaj.value);

    //celkové náklady
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;

    //budget - celkové výdaje
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;

    //tvorba seznamu
    listCreator(productTitle.value, vydaj.value);

    //vyčistit editek
    productTitle.value = "";
    vydaj.value = "";
});