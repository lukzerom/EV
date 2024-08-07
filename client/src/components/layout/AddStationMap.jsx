import React, { useContext, useEffect } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import StationContext from "../../context/stations/stationContext";
import bolt from "../../assets/bolt.svg";
import L from "leaflet";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  map: { width: "100%", height: "100%" },
}));

const myIcon = L.icon({
  iconUrl: bolt,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -76],
});

const AddStationMap = () => {
  const stationContext = useContext(StationContext);
  const classes = useStyles();

  useEffect(() => {
    //eslint-disable-next-line
  }, []);

  const { markerPosition, setMarkerPosition } = stationContext;

  const onDragend = (e) => {
    setMarkerPosition(e.target.getLatLng());
  };

  return (
    <Map center={markerPosition} zoom={18} className={classes.map}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker
        draggable={true}
        onDragend={onDragend}
        position={markerPosition}
        icon={myIcon}
      ></Marker>
    </Map>
  );
};

export default AddStationMap;
