import React from 'react';
import { useYearOptions, useDashboardState, useLang } from '@hyperobjekt/react-dashboard';
import InlineSelect from './InlineSelect';
import { trackEvent } from '../../utils';
import useDataMode from '../../hooks/useDataMode';

const YearSelect = (props) => {
  const options = useYearOptions();
  const value = useDashboardState('year');
  const setValue = useDashboardState('setYear');
  const label = useLang('SELECT_YEAR_LABEL');
  const [dataMode] = useDataMode();
  const handleChange = (e) => {
    setValue(e.target.value);
    trackEvent('mapYearSelection', {
      mapYearSelection: e.target.value, // why not mapYearSelected?
      datasetType: dataMode,
    });
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
