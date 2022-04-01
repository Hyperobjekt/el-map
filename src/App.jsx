import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Header } from "./Header";
import { Map } from "./Map";
import { Scorecards } from "./Scorecards";
import { Charts } from "./Charts";
import Dashboard, { useRouteStore } from "@hyperobjekt/react-dashboard";
import * as APP_CONFIG from "./config.json";
import "@hyperobjekt/scales/dist/style.css";
import { Actions } from "./Actions";
import { Footer } from "./Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard config={APP_CONFIG} enableRouter>
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
