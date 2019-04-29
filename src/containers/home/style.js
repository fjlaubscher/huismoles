import styled from 'styled-components';
import Link from 'react-router-dom/Link';
import { colors, pxtorem } from 'styles/index';

import Dropdown from 'components/dropdown';

export const StyledLink = styled(Link)`
  display: block;
  margin-bottom: ${pxtorem(10)};
  color: ${colors.coral};
  :visited {
    color: ${colors.coral};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${pxtorem(500)};
  width: 100%;
  margin: 1rem 0;
  border: 1px solid ${colors.white};
  padding: 1rem;
`;

export const DownloadLink = styled.a`
  border: 1px solid ${colors.white};
  padding: 0.5rem;
  width: 100%;
  color: ${colors.white};
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
`;

export const StyledDropdown = styled(Dropdown)`
  width: 100%;
  margin-bottom: 1rem;
`;
