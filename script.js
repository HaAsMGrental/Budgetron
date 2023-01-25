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

// Zmizení delete buttonu
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
        
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa", "fa-trash", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton, true);    
    });
    
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
    productTitleError.classList.add("hide");
    

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


    //konvertor

    const select = document.querySelectorAll(".currency");
    const con_button = document.getElementById("con_button");
    const num = document.getElementById("num");
    const ans = document.getElementById("ans");
    
    //fetch měn a výčet obsahu api
    fetch("https://api.frankfurter.app/currencies")
      .then((data) => data.json())
      .then((data) => {
        display(data);
      });
    
    function display(data) {
      const entries = Object.entries(data);
      for (var i = 0; i < entries.length; i++) {
        select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
      }
    }
    
    con_button.addEventListener("click", () => {
      let currency1 = select[0].value;
      let currency2 = select[1].value;
      let value = num.value;
    
      //kontrola
      if (currency1 != currency2) {
        convert(currency1, currency2, value);
      } else {
        alert("Jsou vybrány stejné měny!");
      }
    });
    
    //převod
    function convert(currency1, currency2, value) {
      const host = "api.frankfurter.app";
      fetch(
        `https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`
      )
        .then((val) => val.json())
        .then((val) => {
          console.log(Object.values(val.rates)[0]);
          ans.value = Object.values(val.rates)[0];
        });
    }
    

