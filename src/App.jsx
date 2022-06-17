import { CssBaseline, ThemeProvider } from '@mui/material';
import Dashboard, {
  QueryParamRouter,
  getCurrentUrlQueryParams,
  useDashboardStore,
  useLocationStore,
  useLangStore
} from '@hyperobjekt/react-dashboard';
import '@hyperobjekt/scales/dist/style.css';
import theme from './theme';
import { Header } from './Header';
import { Map } from './Map';
import { Scorecards } from './Scorecards';
import { Charts } from './Charts';
import { Actions } from './Actions';
import { Footer } from './Footer';
import { getConfig } from './Config/utils';
import useDataMode from './hooks/useDataMode';
import { useUpdateParams } from './Router';
import useOnRouteLoad from './Router/useOnRouteLoad';
import InfoModal from './components/InfoModal';
import { getTileData } from './Data';
import { useEffect } from 'react';
import { trackEvent } from './utils';

function App() {
  // set embed if url param indicates embedded
  const urlParams = getCurrentUrlQueryParams();
  const embed = urlParams.embed !== undefined;

  // no need for setter since embed value won't change after load
  const setState = useDashboardStore((state) => state.set);
  setState({ embed });

  // set default data mode from route
  const defaultDataMode = urlParams.m || 'modeled';
  const [dataMode] = useDataMode(defaultDataMode);
  // load config for data mode (with default fallback)
  const config = getConfig(dataMode || defaultDataMode);
  // callback function to handle route updates
  const updateParams = useUpdateParams();
  const handleLoad = useOnRouteLoad();

  const activeLanguage = useLangStore((state) => state.language);
  const setLocationState = useLocationStore((state) => state.set);
  // On first page load, grab selected locations from urlParams and trigger selection
  // (instead of useOnRouteload which introduced bugs)
  useEffect(() => {
    // also track
    trackEvent('dataLayer-loaded', {
      timeStamp: Date.now(),
      language: activeLanguage
      // pageCategory: 'map-tool',
    })
    
    const locationStrings = urlParams?.l?.split('~');
    if (locationStrings) {
      // use the string values to fetch the tile data
      const locationPromises = locationStrings.map((l) => {
        const [geoid, lng, lat] = l.split('_');
        return getTileData({ geoid, lngLat: { lng, lat }, dataMode });
      });
      // once all the features have been retrieved, add them to the location store
      Promise.all(locationPromises).then((features) =>
        // TODO: triggers rerender, so page load with selected locations takes longer
        // than necessary. Fix in react-dashboard?
        setLocationState({ selected: features.filter((f) => !!f?.properties?.n) }),
      );
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard config={config} onLoad={handleLoad}>
        {!embed && <QueryParamRouter updateParams={updateParams} />}
        <Header />
        <Map />
        {!embed && (
          <>
            <InfoModal />
            <Scorecards />
            <Charts />
            <Actions />
            <Footer />
          </>
        )}
      </Dashboard>
    </ThemeProvider>
  );
}

export default App;
