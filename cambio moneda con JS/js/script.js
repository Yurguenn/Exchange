const droplist = document.querySelectorAll(".drop-list select"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button")

for (let i = 0; i < droplist.length; i++) {
    for (currency_code in country_list) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "NPR" ? "selected" : "";
        }
        let optionTag = ` <option value="${currency_code}"${selected}>${currency_code}</option>`;
        droplist[i].insertAdjacentHTML("beforeend", optionTag);
    }
    droplist[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    for (code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://www.countryflags.io/${country_list[code]}/flat/48.png`
        }
    }
}


window.addEventListener("onload", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});


function getExchangeRate() {
    const amount = document.querySelector(".amount input"),
        exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/c724689751c90b27a2670aa3/latest/${fromCurrency.value}`;
    fetch(url).then(Response => Response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);

        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went wrong";
    })
}