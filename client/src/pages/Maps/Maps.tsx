/*import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Popup, LeafletMouseEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Define the type for houses
type House = 0 | 1;

const getStreetColor = (houses: House[]): string => {
    const activeCount = houses.filter(house => house === 1).length;
    if (activeCount === 3) {
        return 'green';
    } else if (activeCount === 2) {
        return 'yellow';
    } else {
        return 'red';
    }
};

const Maps: React.FC = () => {
    const [streets, setStreets] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://your-api-endpoint/getMaps')
            .then(response => response.json())
            .then(data => setStreets(data))
            .catch(error => console.error('Error fetching maps:', error));
    }, []);

    return (
        <div>
            <h1>Карта села Завьялово</h1>
            <MapContainer center={[56.838, 53.367]} zoom={15} style={{ height: "600px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {streets.map((street) => {
                    const { street_name, coordinates, houses } = street;
                    const streetColor = getStreetColor(JSON.parse(houses));
                    const inactiveCount = JSON.parse(houses).filter((house: House) => house === 0).length;

                    return (
                        <Polyline
                            key={street_name}
                            positions={JSON.parse(coordinates)}
                            color={streetColor}
                            weight={5}
                            eventHandlers={{
                                mouseover: (e: LeafletMouseEvent) => {
                                    const target = e.target;
                                    target.setStyle({ weight: 7 });
                                },
                                mouseout: (e: LeafletMouseEvent) => {
                                    const target = e.target;
                                    target.setStyle({ weight: 5 });
                                }
                            }}
                        >
                            <Popup>
                                {street_name}<br />Домов с проблемой: {inactiveCount}
                            </Popup>
                        </Polyline>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Maps;*/
