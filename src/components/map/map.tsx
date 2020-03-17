import React from "react";
import "./map.scss";
import { VectorMap } from "react-jvectormap";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

interface MapComponentProps {
  setSelectedCountry: (code: string) => void;
}

class MapComponent extends React.Component<MapComponentProps, {}> {
  mapRef: React.RefObject<any>;
  selectedRegionCode: string;

  constructor(props: MapComponentProps) {
    super(props);
    this.mapRef = React.createRef();
    this.selectedRegionCode = "";
  }

  //This component should never rerender (it does because of context update)
  shouldComponentUpdate() {
    return false;
  }

  onMapRegionSelected = (code: string) => {
    this.mapRef.current.getMapObject().clearSelectedRegions();
    if (this.selectedRegionCode === code) {
      this.selectedRegionCode = "";
      this.props.setSelectedCountry("");
    } else {
      this.selectedRegionCode = code;
      this.props.setSelectedCountry(code);
      this.mapRef.current.getMapObject().setSelectedRegions(code);
    }
  };

  render() {
    return (
      <Card>
        <CardContent>
          <VectorMap
            map="world_mill"
            ref={this.mapRef}
            backgroundColor="#bababa"
            containerStyle={{
              width: "100%",
              height: "100%"
            }}
            containerClassName="map"
            zoomOnScroll
            regionStyle={{
              initial: {
                fill: "white",
                "fill-opacity": 1,
                stroke: "none",
                "stroke-width": 0,
                "stroke-opacity": 1
              },
              hover: {
                "fill-opacity": 0.8,
                cursor: "pointer",
                fill: "#c9dbff"
              },
              selected: {
                fill: "#7a8eff"
              },
              selectedHover: {}
            }}
            regionLabelStyle={{
              initial: {
                "font-family": "Verdana",
                "font-size": "12",
                "font-weight": "bold",
                cursor: "default",
                fill: "green"
              },
              hover: {
                cursor: "pointer"
              }
            }}
            onRegionTipShow={(event: Event, tip: Object, code: string) => {
              event.preventDefault();
            }}
            onRegionClick={(event: Event, code: string) => {
              this.onMapRegionSelected(code);
            }}
          />
        </CardContent>
      </Card>
    );
  }
}

export default MapComponent;
