import React from "react";
import "./App.css";
import TotalAmountComponent from "./components/totalAmount/totalAmount";
import AppProvider from "./store/appProvider";
import MapContainer from "./components/map/mapContainer";
import AccountContainer from "./components/accountContainer/accountContainer";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Container maxWidth="md">
          <TotalAmountComponent />
          <MapContainer />
          <AccountContainer />
        </Container>
      </AppProvider>
    </div>
  );
}

export default App;
