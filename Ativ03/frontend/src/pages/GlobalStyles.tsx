import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(180deg, #004d00, #90ee90); /* Tons de verde */
    color: #fff;
    height: 100vh;
    justify-content: center;
    align-content: center;
  }`;