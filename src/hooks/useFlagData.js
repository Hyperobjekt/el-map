import { useDashboardStore, useAppConfig } from '@hyperobjekt/react-dashboard';
import { useEffect } from 'react';

let errored = false;

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
    if (flagData || errored) return;
    fetch(countyUrl)
      .then((countyResponse) => {
        countyResponse.json().then((countyData) => {
          fetch(cutoffsUrl).then((cutoffsResponse) => {
            cutoffsResponse.json().then((cutoffsData) => {
              setFlagData({ client: countyData, cutoff: cutoffsData });
            });
          });
        });
      })
      .catch((e) => {
        console.error('Fetching flag data failed: ', e);
        // Only log error once.
        // TODO: fix so that we don't get CORS errors off production (didn't before?)
        errored = true;
      });
  }, []);

  return flagData || {};
}
