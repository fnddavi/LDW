import React from 'react';
import ExpenseScreen from './pages/ExpenseControlPage';
import { GlobalStyle } from './pages/GlobalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ExpenseScreen />
    </>
  );
};

export default App;