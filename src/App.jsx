import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard, {
  QueryParamRouter,
  getCurrentUrlQueryParams,
  useDashboardStore,
} from "@hyperobjekt/react-dashboard";
import "@hyperobjekt/scales/dist/style.css";
import theme from "./theme";
import { Header } from "./Header";
import { Map } from "./Map";
import { Scorecards } from "./Scorecards";
import { Charts } from "./Charts";
import { Actions } from "./Actions";
import { Footer } from "./Footer";
import { getConfig } from "./Config/utils";
import useDataMode from "./hooks/useDataMode";
import { useUpdateParams } from "./Router";
import useOnRouteLoad from "./Router/useOnRouteLoad";

function App() {
  // set embed if url param indicates embedded
  const urlParams = getCurrentUrlQueryParams();
  const embed = urlParams.embed !== undefined;
  // console.log({ embed })
  // no need for setter since embed value won't change after load
  const setState = useDashboardStore((state) => state.set);
  setState({ embed });

  // set default data mode from route
  const defaultDataMode = urlParams.m || "modeled";
  const [dataMode] = useDataMode(defaultDataMode);
  // load config for data mode (with default fallback)
  const config = getConfig(dataMode || defaultDataMode);
  // callback function to handle route updates
  const updateParams = useUpdateParams();
  const handleLoad = useOnRouteLoad();
  console.log("render app ", { urlParams });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard config={config} onLoad={handleLoad}>
        {!embed && <QueryParamRouter updateParams={updateParams} />}
        <Header />
        <Map />
        {!embed && (
          <>
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
