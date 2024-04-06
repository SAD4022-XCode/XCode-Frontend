import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import redPin from "../../assets/red pin.png";
import bluePin from "../../assets/blue pin.png";
import "./MapComponent.css";
import AxiosInstance from "./Axios";

const blackIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
});
const redIcon = new Icon({
  iconUrl: redPin,
  iconSize: [38, 38],
});
const blueIcon = new Icon({
  iconUrl: bluePin,
  iconSize: [38, 38],
});

function LocationMarker(params) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={redIcon}>
      <Popup>شما</Popup>
    </Marker>
  );
}
const MapComponent = () => {
  const [marker, setMarker] = useState([
    {
      geocode: [35.6997, 51.338],
      popUp: "محل برگزاری رویداد",
    },
  ]);
  const mapOptions = {
    center: [35.6997, 51.338],
    zoom: 9,
  };
  const MapEventsHandler = ({ handleMapClick }) => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });
    return null;
  };
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarker([
      { ...marker, geocode: [lat, lng], popUp: "محل برگزاری رویداد" },
    ]);
    console.log(lat, lng);
  };
  return (
    <div className="map-component">
      <MapContainer className="map-component__map" {...mapOptions}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEventsHandler handleMapClick={handleMapClick} />
        <LocationMarker />
        {marker.map((marker) => (
          <Marker position={marker.geocode} icon={blueIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default MapComponent;
