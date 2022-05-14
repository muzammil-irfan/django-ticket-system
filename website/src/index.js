import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContext from "./context/user/userContext";
import reportWebVitals from "./reportWebVitals";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
const colors = {
  brand: {
    50: "#EBF8FF",
    100: "#BEE3F8",
    200: "#90CDF4",
    300: "#63B3ED",
    400: "#4299E1",
    500: "#3182CE",
    600: "#2B6CB0",
    700: "#2C5282",
    800: "#2A4365",
    900: "#1A365D",
  },
};

const theme = extendTheme({ colors });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* <UserContext.Consumer> */}
        <App />
      {/* </UserContext.Consumer> */}
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
