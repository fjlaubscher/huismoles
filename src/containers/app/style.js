import styled, { createGlobalStyle } from 'styled-components';
import { colors, breakpoints, pxtorem } from 'styles/index';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${colors.black};
    color: ${colors.white};
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', sans-serif;
  }
`;

export const Container = styled.div`
  max-width: ${pxtorem(breakpoints.large)};
  margin: 0 auto;

  @media (max-width: ${pxtorem(breakpoints.large)}) {
    padding: 0 1rem;
  }
`;

export const Banner = styled.div`
  max-width: ${pxtorem(830)};
  width: 100%;
  padding: 1rem;
  margin: 0 auto;

  img {
    display: block;
    width: 100%;
  }
`;
