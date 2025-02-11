import fetch from "node-fetch";

const getLatLngFromAddress = async (city, state) => {
  try {
    const address = `${city}, ${state}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) throw new Error("Invalid Address");

    return { latitude: data[0].lat, longitude: data[0].lon };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

export default getLatLngFromAddress;
