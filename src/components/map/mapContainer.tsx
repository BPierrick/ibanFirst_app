import React, { useContext } from "react";
import MapComponent from "./map";
import { AppContext } from "../../store/appProvider";

const MapContainer: React.FC<{}> = () => {
  const appContext = useContext(AppContext);
  return (
    <MapComponent setSelectedCountry={appContext.actions.setSelectedCountry} />
  );
};

export default MapContainer;
