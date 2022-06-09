import React from 'react';
import { useYearOptions, useDashboardState, useLang } from '@hyperobjekt/react-dashboard';
import InlineSelect from './InlineSelect';

const YearSelect = (props) => {
  const options = useYearOptions();
  const value = useDashboardState('year');
  const setValue = useDashboardState('setYear');
  const label = useLang('SELECT_YEAR_LABEL');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <InlineSelect
      id="select_year"
      label={label}
      value={value}
      options={options}
      onChange={handleChange}
      {...props}
    />
  );
};

export default YearSelect;
