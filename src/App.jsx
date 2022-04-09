import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard, { QueryParamRouter } from "@hyperobjekt/react-dashboard";
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

function App() {
  const [dataMode] = useDataMode();
  const config = getConfig(dataMode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard config={config}>
        <QueryParamRouter />
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
