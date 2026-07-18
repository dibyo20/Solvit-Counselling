import React from "react";
import { AppContextProvider } from "./context";
import AppRouter from "./AppRouter.jsx";

function App() {
  return (
    <AppContextProvider>
      <AppRouter />
    </AppContextProvider>
  );
}

export default App;
