import 'reseter.css'
import React, {useEffect, useState} from 'react'

const handleLoad = () => {

}

function App() {
    const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
    const API_KEY = 'e4f2f55263ab4f9d82865b3d1dc24827';
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [city, setCity] = useState();
    const [temps, setTemps] = useState([]);
    const [loading, setLoading] = useState(true);
    const GetLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } else {
            console.log("Not Available");
        }
    }
    const GetTemps = () => {
        fetch(`${BASE_URL}?lat=${latitude}&lon=${longitude}&key=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                do{
                    let i = 0;
                    setTemps(temps => [...temps, data.data[i].temp]);
                    i++;
                }
                while(temps.length < 5);
                setCity(data.city_name)
                console.log(temps);
                console.log(city);

            })
    }
    useEffect(() => {
        GetLocation();
        GetTemps();
    })
  return (
    <>
      <header>
        <h1>
          weather forecast
        </h1>
      </header>
      <section>
          <div className="wrap">
              <div className="card">
                  <p>PLACEHOLDER</p>
                  <p>PLACEHOLDER</p>
                  <p>PLACEHOLDER</p>
              </div>
              <div className="card">
                  <p>PLACEHOLDER</p>
                  <p>PLACEHOLDER</p>
                  <p>PLACEHOLDER</p>
              </div>
              <div className="card">
                  <p>PLACEHOLDER</p>
                  <p>PLACEHOLDER</p>
                  <p>PLACEHOLDER</p>
              </div>
              <div className="card">
                  <p>PLACEHOLDER</p>
                  <p>PLACEHOLDER</p>
                  <p>PLACEHOLDER</p>
              </div>
              <div className="card">
                  <p>PLACEHOLDER</p>
                  <p>PLACEHOLDER</p>
                  <p>PLACEHOLDER</p>
              </div>
          </div>

      </section>
    </>
  );
}

export default App;
