import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'styles';

// components
import { Container, StyledLabel, StyledSelect } from './style';

const styles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: colors.black,
    color: state.isSelected ? colors.cyber : colors.white
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    backgroundColor: colors.black,
    border: `1px solid ${colors.white}`
  }),
  placeholder: provided => ({
    ...provided,
    color: colors.white
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: colors.black,
    borderRadius: 0
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: colors.white
  })
};

const Dropdown = ({ className, label, options, onChange }) => (
  <Container className={className}>
    <StyledLabel>{label}</StyledLabel>
    <StyledSelect
      styles={styles}
      isSearchable={false}
      options={options}
      defaultValue={options[0]}
      onChange={onChange}
    />
  </Container>
);

Dropdown.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default Dropdown;
