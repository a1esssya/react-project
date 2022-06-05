import {ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import KillerPage from "./pages/KillerPage";
import UserPage from "./pages/UserPage";
import RegistrationPage from "./pages/RegistrationPage";

const theme = createTheme({
  palette: {
    primary: {
      light: '#0064ff',
      main: '#0347bb',
      dark: '#0A0C26',
    },
    secondary: {
      light: '#4A148C',
      main: '#360E66',
      dark: '#140526',
    },
    success:{
      light: '#00F763',
      main: '#00C851',
      dark: '#006629',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Routes>
            <Route path="/registration" element={<RegistrationPage/>} exact />
            <Route path="/login" element={<LoginPage/>} exact />
            <Route path="/killerSide" element={<KillerPage/>} exact />
            <Route path="/puppeteerSide" element={<UserPage/>} exact />
            <Route path="/" element={<MainPage/>} exact />
          </Routes>
      </Router>
    </ThemeProvider>
  )
}
