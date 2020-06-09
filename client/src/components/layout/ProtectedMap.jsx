import React, { useContext, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import StationContext from "../../context/stations/stationContext";
import bolt from "../../assets/bolt.svg";
import L, { panTo } from "leaflet";

const myIcon = L.icon({
  iconUrl: bolt,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -76],
});
// Z powodu problemów z animacją Leaflet - dodałem taką flagę aby animowane było tylko przeskakiwanie po stacjach i rozwiązałem problem :)
let animateflag = false;

const ChargerMap = () => {
  const stationContext = useContext(StationContext);
  const {
    stations,
    getStations,
    position,
    setPosition,
    setZoom,
    zoom,
    setStation,
    getAvailableStations,
    avaiableStations,
  } = stationContext;
  useEffect(() => {
    getAvailableStations();
    //eslint-disable-next-line
  }, []);

  const changePosition = (e) => {
    animateflag = true;
    let pickedStation = avaiableStations.filter(
      (station) => station._id == e.target.options.id
    );

    let lat = Number(pickedStation[0].latitude);
    let lng = Number(pickedStation[0].longitude);

    setPosition([lat, lng]);
    setStation(pickedStation[0]);
  };

  const viewport = {
    center: position,
    zoom: zoom,
  };

  const onViewportChanged = (viewport) => {
    setZoom(viewport.zoom);
    setPosition(viewport.center);
    animateflag = false;
  };

  return (
    <div className="map-container xs=6">
      <Map
        center={position}
        viewport={viewport}
        onViewportChanged={onViewportChanged}
        animate={animateflag}
        easeLinearity={0.35}
        attributionControl={true}
        useFlyTo={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {avaiableStations !== null
          ? avaiableStations.map((station) => {
              return (
                <Marker
                  key={station._id}
                  id={station._id}
                  onClick={changePosition}
                  position={[station.latitude, station.longitude]}
                  icon={myIcon}
                ></Marker>
              );
            })
          : null}
      </Map>
    </div>
  );
};

export default ChargerMap;

{
  /* <Map
center={[50, 10]}
zoom={6}
maxZoom={10}
attributionControl={true}
zoomControl={true}
doubleClickZoom={true}
scrollWheelZoom={true}
dragging={true}
animate={true}
easeLinearity={0.35}
>
<TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
<Marker position={[50, 10]}>
  <Popup>Popup for any custom information.</Popup>
</Marker>
</Map> */
}
