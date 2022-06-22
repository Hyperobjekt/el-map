import React from 'react';
import { useChoroplethOptions, useDashboardState, useLang } from '@hyperobjekt/react-dashboard';
import InlineSelect from './InlineSelect';
import { trackEvent } from '../../utils';
import useDataMode from '../../hooks/useDataMode';
import _ from 'lodash';

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
  const [dataMode] = useDataMode();

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val === 'disable' ? null : val);

    const op = options.find(({ id }) => id === val);
    trackEvent('censusDataSelection', {
      evictionDataType: _.get(op, 'name', val),
      datasetType: dataMode,
    });
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
