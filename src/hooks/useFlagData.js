import { useDashboardStore, useAppConfig } from '@hyperobjekt/react-dashboard';
import { useEffect } from 'react';

/**
 * Returns the flag data.
 */
export default function useFlagData() {
  // load the value set in state
  const flagData = useDashboardStore((state) => state.flagData);
  const setState = useDashboardStore((state) => state.set);
  const countyUrl = useAppConfig('county_flags_map');
  const cutoffsUrl = useAppConfig('99_percentile_cutoffs');
  const setFlagData = (flagData) => setState({ flagData });

  useEffect(() => {
    // just run once
    if (flagData) return;
    fetch(countyUrl).then((countyResponse) => {
      countyResponse.json().then((countyData) => {
        fetch(cutoffsUrl).then((cutoffsResponse) => {
          cutoffsResponse.json().then((cutoffsData) => {
            setFlagData({ client: countyData, cutoff: cutoffsData });
          });
        });
      });
    });
  }, []);

  return flagData || {};
}
