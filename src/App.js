import 'reseter.css'
import React, {useEffect, useState} from 'react'
function App() {
    const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
    const API_KEY = 'e4f2f55263ab4f9d82865b3d1dc24827';
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [city, setCity] = useState();
    const [temps, setTemps] = useState([]);
    const [status, setStatus] = useState(0);
    const [icons, setIcons] = useState([]);
    let counter = 0;
    const GetLocation = () => {
        if(status === 0){
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setStatus(100);
                });
            } else {
                console.log("Not Available");
            }
        }
        GetTemps()
    }
    const GetTemps = () => {
        if (status === 100){
            fetch(`${BASE_URL}?lat=${latitude}&lon=${longitude}&key=${API_KEY}`)
                .then((res) => res.json())
                .then((data) => {
                    while(counter < 5)
                    {
                        setTemps(temps => [...temps, data.data[counter].temp]);
                        setIcons(icons => [...icons, data.data[counter].weather.icon])
                        counter++;
                    }
                    setCity(data.city_name)
                    setStatus(101);
                })
        }
    }
    useEffect(() => {
        GetLocation();
    })
  return (
    <>
      <header>
        <h1>
          weather forecast
        </h1>
      </header>
      <section>
          <p id='cityName'>{city}</p>
          <div className="wrap">
              <div className="card">
                  <img src={`./icons/${icons[0]}.png`} alt='icon'/>
                  <p>{temps[0]}</p>
              </div>
              <div className="card">
                  <img src={`./icons/${icons[1]}.png`} alt='icon'/>
                  <p>{temps[1]}</p>
              </div>
              <div className="card">
                  <img src={`./icons/${icons[2]}.png`} alt='icon'/>
                  <p>{temps[2]}</p>
              </div>
              <div className="card">
                  <img src={`./icons/${icons[3]}.png`} alt='icon'/>
                  <p>{temps[3]}</p>
              </div>
              <div className="card">
                  <img src={`./icons/${icons[4]}.png`} alt='icon'/>
                  <p>{temps[4]}</p>
              </div>
          </div>

      </section>
    </>
  );
}

export default App;
