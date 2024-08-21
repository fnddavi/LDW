import React, { useState } from 'react';
import './App.css';


function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] =
    useState(null);
  const handleAmountChange = (e) =>
    setAmount(e.target.value);
  const handleFromCurrencyChange = (e) =>
    setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) =>
    setToCurrency(e.target.value);
  const handleConvert = async () => {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/3368b957a5419cccb3811167/latest/${fromCurrency}`
    );
    const data = await response.json();
    const rate = data.conversion_rates[toCurrency];
    setConvertedAmount((amount * rate).toFixed(2));
  };
  return (
    <div className="App">
      <h1>Conversor de Moedas</h1>
      <form>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Digite o valor"
        />
        <select value={fromCurrency}
          onChange={handleFromCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="BRL">BRL</option>
          {/* Adicione mais opções conforme necessário */}
        </select>
        <span>para</span>
        <select value={toCurrency}
          onChange={handleToCurrencyChange}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="BRL">BRL</option>
          {/* Adicione mais opções conforme necessário */}
        </select>
        <button type="button"
          onClick={handleConvert}>Converter</button>
      </form>
      {convertedAmount && (
        <h2>
          {amount} {fromCurrency} é igual a 
          {convertedAmount} {toCurrency}
        </h2>
      )}
    </div>
  );
}
export default App;
