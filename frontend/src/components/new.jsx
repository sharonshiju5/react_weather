import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Location() {
  const [city, setCity] = useState("Fetching...");

  useEffect(() => {
    const fetchCity = async (lat, lon) => {
      try {
        const apiKey = "5f88e4900f4e5958c2ef72bd1ea26e5a"; // Replace with your API key
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        setCity(response.data.name);
      } catch (error) {
        console.error("Error fetching city:", error);
        setCity("Location not found");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCity(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setCity("Permission denied");
        }
      );
    } else {
      setCity("Geolocation not supported");
    }
  }, []);

  return <h2>Current City: {city}</h2>;
}
