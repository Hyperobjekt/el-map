import React from 'react';
import { useChoroplethOptions, useDashboardState, useLang } from '@hyperobjekt/react-dashboard';
import InlineSelect from './InlineSelect';

const ChoroplethSelect = (props) => {
  const value = useDashboardState('choroplethMetric');
  const setValue = useDashboardState('setChoroplethMetric');
  const label = useLang('SELECT_CHOROPLETH_LABEL');
  const disabledLabel = useLang('METRIC_DISABLED');
  const options = useChoroplethOptions();
  const disableOption = {
    id: 'disable',
    name: disabledLabel,
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val === 'disable' ? null : val);
  };
  return (
    <InlineSelect
      id="select_choropleth"
      label={label}
      value={value || 'disable'}
      options={[disableOption, ...options]}
      onChange={handleChange}
      {...props}
    />
  );
};

export default ChoroplethSelect;
