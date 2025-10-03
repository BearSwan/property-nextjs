'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from 'react-map-gl/mapbox';
import pin from '@/assets/images/pin.svg'
import Spinner from "./spinner";
import 'mapbox-gl/dist/mapbox-gl.css'

const PropertyMap = ({ property }) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longtitude: 0,
        zoom: 12,
        height: '500px',
        width: '100%'
    });
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: 'en',
        region: 'us'
    })

    useEffect(() => { 
        const fetchCoords = async () => {
            try {
                const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`);

                // Check geocode results
                if (res.results.lenth === 0) {
                    setGeocodeError(true);
                    return
                }

                const {lat, lng} = res.results[0].geometry.location;

                setLat(lat);
                setLng(lng);
                setViewport({
                    ...viewport,
                    latitude: lat,
                    longtitude: lng
                })
            } catch (error) {
                console.log("🚀 ~ fetchCoords ~ error:", error);
                setGeocodeError(true);
            } finally {
                setLoading(false)
            }
        }

        fetchCoords();
    }, [])

    if (loading) return <Spinner />

    if (geocodeError) {
        <div>No location data found</div>
    }

    return ( 
        !loading && (
            <Map
                // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 2
                }}
                style={{width: '100%', height: 500}}
                mapStyle="mapbox://styles/mapbox/streets-v9">
                    <Marker longitude={lng} latitude={lat} anchor='bottom'>
                        <Image
                            alt="Map marker"
                            src={pin}
                            width={40}
                            height={40}
                        />
                    </Marker>
            </Map>
        )
    );
}

export default PropertyMap;