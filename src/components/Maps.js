import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import LeafletGeocoder from "./LeafletGeocoder";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import SplashScreen from "../SplashScreen";

const places = [
  {
    name: "SPKLU Stasiun Pengisian",
    latitude: -7.7123071744592036,
    longitude: 110.35702189633908,
    description: "Statsiun Pengisian Kendaraan Listrik",
  },
  {
    name: "SPKLU Stasiun Pengisian",
    latitude: -7.729487793670817,
    longitude: 110.31693896933412,
    description: "Statsiun Pengisian Kendaraan Listrik",
  },
  {
    name: "SPKLU Stasiun Pengisian",
    latitude: -7.751855571340118,
    longitude: 110.36105593984007,
    description: "Statsiun Pengisian Kendaraan Listrik",
  },
  {
    name: "SPKLU Stasiun Pengisian",
    latitude: -7.785957764884017,
    longitude: 110.36440333732325,
    description: "Statsiun Pengisian Kendaraan Listrik",
  },
  {
    name: "SPKLU Stasiun Pengisian",
    latitude: -7.7981182253870436,
    longitude: 110.36611995090394,
    description: "Statsiun Pengisian Kendaraan Listrik",
  },
  {
    name: "SPKLU Stasiun Pengisian Gedung Kuning",
    latitude: -7.806242082527924,
    longitude: 110.40224613169292,
    description: "Statsiun Pengisian Kendaraan Listrik",
  },
  {
    name: "Rumah Sakit JIH",
    latitude: -7.757376371222136,
    longitude: 110.40352948078127,
    description: "Rumah Sakit",
  },
  {
    name: "Rumah Sakit Condong Catur",
    latitude: -7.754209646960206,
    longitude: 110.40576685379054,
    description: "Rumah Sakit",
  },
  {
    name: "Rumah Universitas Ahmad Dahlan",
    latitude: -7.746951066755701,
    longitude: 110.42497853660679,
    description: "Rumah Sakit",
  },
  // Tambahkan tempat lain di sini
];

export default function Maps() {
  const [position, setPosition] = useState({ lat: -7.787318, lng: 110.398506 });
  console.log(position);
  const [showSplash, setShowSplash] = useState(true);
  console.log(position)

  const DefaultIcon = L.icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });

  const TrackingIcon = L.icon({
    iconUrl: "/tracking-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 3000); // tampilkan splash screen selama 3 detik

    // Menggunakan Geolocation API untuk mendapatkan lokasi pengguna
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location: ", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // Membersihkan watchId ketika komponen tidak lagi digunakan
    };
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <div className="px-[15px] py-[5px] bg-white shadow-lg shadow-gray-600 ">
            <h1>
              <span className="font-bold">Latitude :</span> {position.lat}
            </h1>
            <h1>
              <span className="font-bold">Longitude :</span> {position.lng}
            </h1>
          </div>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LeafletGeocoder />
            {places.map((place, index) => (
              <Marker
                key={index}
                position={[place.latitude, place.longitude]}
                icon={DefaultIcon}
              >
                <Popup>
                  <strong>{place.name}</strong>
                  <br />
                  {place.description}
                </Popup>
              </Marker>
            ))}
            <Marker position={position} icon={TrackingIcon}>
              <Popup>
                Real-time Location
                <br />
                Latitude: {position.lat}, Longitude: {position.lng}
              </Popup>
            </Marker>
            <LeafletRoutingMachine position={position} />
          </MapContainer>
          <div className="px-[15px] flex justify-center w-full gap-4 rounded-tr-[18px] rounded-tl-[18px] py-[10px] bg-gradient-to-r from-[#3FA0FE] to-[#01112F] shadow-lg shadow-gray-600 ">
            <i className="bx bx-map-pin text-[20px] text-white "></i>
            <i className="bx bxs-parking text-[20px] text-white"></i>
            <i className="bx bxs-battery-charging text-[20px] text-white"></i>
            <i className="bx bxs-key text-[20px] text-white"></i>
          </div>
        </>
      )}
    </>
  );
}
