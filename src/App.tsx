import React from "react";
import "./App.css";
import TotalAmountComponent from "./components/totalAmount/totalAmount";
import AppProvider from "./store/appProvider";
import MapContainer from "./components/map/mapContainer";
import AccountContainer from "./components/accountContainer/accountContainer";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <MapContainer />
        <TotalAmountComponent />
        <AccountContainer />
      </AppProvider>
    </div>
  );
}

export default App;
