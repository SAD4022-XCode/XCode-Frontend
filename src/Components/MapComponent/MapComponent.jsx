import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Tooltip,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import redPin from "../../assets/red pin.png";
import bluePin from "../../assets/blue pin.png";
import "./MapComponent.css";

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
      <Popup>محل فعلی شما</Popup>
    </Marker>
  );
}
const MapComponent = ({ sendDataToParent, lati, long, onlyShow, name }) => {
  const [classes, setClasses] = useState(name);
  const [marker, setMarker] = useState([
    {
      geocode: [lati, long],
      popUp: "محل برگزاری رویداد",
    },
  ]);

  const mapOptions = {
    center: [lati, long],
    zoom: 9,
  };
  const MapEventsHandler = ({ handleMapClick }) => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });
    return null;
  };
  const handleMapClick = (e) => {
    if (onlyShow === true) {
    } else {
      const { lat, lng } = e.latlng;
      setMarker([
        { ...marker, geocode: [lat, lng], popUp: "محل برگزاری رویداد" },
      ]);
      sendDataToParent({ lat, lng });
    }
  };

  return (
    <div className={`map-component ${classes} col-md-12 col-sm-12 col-12`}>
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
