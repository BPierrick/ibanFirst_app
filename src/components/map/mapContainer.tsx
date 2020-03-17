import React, { useContext } from "react";
import MapComponent from "./map";
import { AppContext } from "../../store/appProvider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const MapContainer: React.FC<{}> = () => {
  const appContext = useContext(AppContext);
  return (
    <Card>
      <CardContent>
        <MapComponent
          setSelectedCountry={appContext.actions.setSelectedCountry}
        />
      </CardContent>
    </Card>
  );
};

export default MapContainer;
