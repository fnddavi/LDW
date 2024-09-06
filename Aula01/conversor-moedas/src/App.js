import React, { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(''); // Estado para armazenar erros de validação
  const [historico, setHistorico] = useState([]); // Histórico de conversões

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setError(''); // Limpa a mensagem de erro ao alterar o valor
  };

  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);

  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);

  const handleConvert = async () => {
    if (isNaN(amount) || amount <= 0) {
      setError('Por favor, insira um número positivo.');
      return;
    }

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/3368b957a5419cccb3811167/latest/${fromCurrency}`
    );
    const data = await response.json();
    const rate = data.conversion_rates[toCurrency];
    const result = (amount * rate).toFixed(2);
    setConvertedAmount(result);

    // Atualiza o histórico de conversões
    const newConversion = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    setHistorico((prevHistory) => {
      const updatedHistory = [newConversion, ...prevHistory];
      return updatedHistory.slice(0, 5); // Mantém as últimas 5 conversões
    });
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
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe a mensagem de erro */}
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="BRL">BRL</option>
          {/* Adicione mais opções conforme necessário */}
        </select>
        <span>para</span>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="BRL">BRL</option>
          {/* Adicione mais opções conforme necessário */}
        </select>
        <button type="button" onClick={handleConvert}>
          Converter
        </button>
      </form>
      {convertedAmount && (
        <h2>
          {amount} {fromCurrency} é igual a {convertedAmount} {toCurrency}
        </h2>
      )}
      {/* Exibe o histórico das últimas 5 conversões */}
      {historico.length > 0 && (
        <div>
          <h3>Histórico de Conversões</h3>
          <ul>
            {historico.map((conversion, index) => (
              <li key={index}>{conversion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
