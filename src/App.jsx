import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Header } from "./Header";
import { Map } from "./Map";
import Dashboard from "@hyperobjekt/react-dashboard";
import * as APP_CONFIG from "./config.json";
import "@hyperobjekt/scales/dist/style.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard config={APP_CONFIG}>
        <Header />
        <Map />
      </Dashboard>
    </ThemeProvider>
  );
}

export default App;
