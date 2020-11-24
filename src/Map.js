import React from "react";
import { TileLayer, MapContainer as LeafletMap, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function ChangeMap({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap>
                <ChangeMap center={center} zoom={zoom} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                ></TileLayer>
                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    );
}

export default Map;