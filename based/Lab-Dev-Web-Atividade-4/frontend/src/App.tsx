import React from 'react';
import EventScreen from './pages/EventControlPage';
import { GlobalStyle } from './pages/GlobalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <EventScreen />
    </>
  );
};

export default App;