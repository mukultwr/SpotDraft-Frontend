
 import { BrowserRouter,Navigate,Routes,Route } from "react-router-dom";
 import HomePage  from "../src/scenes/homePage";
 import LoginPage from "../src/scenes/loginPage";
 import { useMemo } from "react";
 import { useSelector } from "react-redux";
 import {CssBaseline,ThemeProvider} from "@mui/material";
 import { createTheme } from "@mui/material/styles";
 import { themeSettings } from "./theme";
  

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
