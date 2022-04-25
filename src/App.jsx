import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard, {
  QueryParamRouter,
  getCurrentUrlQueryParams,
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
import { useUpdateParams } from "../Router";

function App() {
  // set default data mode from route
  const urlParams = getCurrentUrlQueryParams();
  const defaultDataMode = urlParams.m || "modelled";
  const [dataMode] = useDataMode(defaultDataMode);
  // load config for data mode (with default fallback)
  const config = getConfig(dataMode || defaultDataMode);
  // callback function to handle route updates
  const updateParams = useUpdateParams();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard config={config}>
        <QueryParamRouter updateParams={updateParams} />
        <Header />
        <Map />
        <Scorecards />
        <Charts />
        <Actions />
        <Footer />
      </Dashboard>
    </ThemeProvider>
  );
}

export default App;
