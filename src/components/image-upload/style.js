import styled from 'styled-components';
import { colors, pxtorem } from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.charcoal};
  border-radius: ${pxtorem(4)};
  width: 100%;
  max-width: ${pxtorem(500)};
  padding: 1rem;
`;

export const Preview = styled.img`
  display: block;
  width: 100%;
`;
