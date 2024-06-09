import "./App.css";
import React, { useState, useEffect } from "react";
import CurrencyRow from "./component/CurrencyRow";

const URL =
  "https://v6.exchangerate-api.com/v6/c131ed4a7c0c856888ad15e2/latest/USD";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  // Determine the base currency
  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    fromAmount = amount / exchangeRate;
    toAmount = amount;
  }

  useEffect(() => {
    fetch(URL).then((response) => {
      response.json().then((data) => {
        console.log(data.conversion_rates);
        const currencyNames = Object.keys(data.conversion_rates);
        const currencyValue = Object.values(data.conversion_rates);
        setCurrencyOptions([...currencyNames]);
        setFromCurrency(currencyNames[0]);
        setExchangeRate(currencyValue[1]);
        setToCurrency(currencyNames[1]);
      });
    });
  }, []);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;
    fetch(
      `https://v6.exchangerate-api.com/v6/c131ed4a7c0c856888ad15e2/latest/${fromCurrency}`
    ).then((response) => {
      response.json().then((data) => {
        setExchangeRate(data.conversion_rates[toCurrency]);
      });
    });
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1>Convertor</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(event) => {
          setFromCurrency(event.target.value);
        }}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div>=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(event) => {
          setToCurrency(event.target.value);
        }}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
