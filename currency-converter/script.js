const api_url = "https://api.exchangerate-api.com/v4/latest/USD";
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const resultDiv = document.getElementById("result");
let rates = {};

// Fetch and populate currencies
fetch(api_url)
  .then((res) => res.json())
  .then((data) => {
    rates = data.rates;
    populateCurrencies(rates);
  })
  .catch((err) => {
    console.error("Error fetching exchange rates:", err);
    resultDiv.textContent = "Failed to load currency data.";
  });

function populateCurrencies(rates) {
  const currencies = Object.keys(rates);
  currencies.forEach((currency) => {
    const option1 = new Option(currency, currency);
    const option2 = new Option(currency, currency);
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    resultDiv.textContent = "Enter a valid amount.";
    return;
  }

  const converted = (amount / rates[from]) * rates[to];
  resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
}
