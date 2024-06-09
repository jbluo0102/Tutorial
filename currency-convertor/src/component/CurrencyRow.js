import React from "react";

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;
  return (
    <div>
      <input
        className="input"
        type="number"
        value={amount}
        onChange={onChangeAmount}
      ></input>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </div>
  );
}
