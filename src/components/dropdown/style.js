import styled from 'styled-components';
import Select from 'react-select';

export const StyledSelect = styled(Select)`
  display: block;
  flex-grow: 1;
  margin-left: 0.5rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledLabel = styled.label`
  white-space: nowrap;
  margin-right: 0.5rem;
  width: 100px;
`;
