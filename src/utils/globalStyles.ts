import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #fe4365;
    --primary-color-alt: #f9cdad;
    --primary-text: #343838;
    --background: #f4f5f9;
  }

  body {
    margin: 0;
    font-family: "Martel Sans", sans-serif;
    background-color: var(--background);
  }

`;
