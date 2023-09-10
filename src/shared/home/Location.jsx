import { useEffect, useState } from "react";

function Location() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return  latitude && longitude && (`${latitude},${longitude}`) ;
}

export default Location;
