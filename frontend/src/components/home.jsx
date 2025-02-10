import React, { useState,useEffect } from "react"
import "./home.css"
import rain from "../assets/rain.png"
import clo from "../assets/cloud.png"
import mist from "../assets/mist.png"
import sun from "../assets/sun.svg"
import moon from "../assets/moon.png"
import hum from "../assets/hum.png"
import wind from "../assets/wind.png"
import axios from 'axios';
import Location from "./new"
export default function Home(){

    const[city,setCity]=useState("")
    const [temp, setTemp] = useState(null);
    const[a,seta]=useState("")
    const[Data,setData]=useState({})
    async function fetchData(){
        if (city==null) {
              useEffect(() => {
            const fetchCity = async (lat, lon) => {
                try {
                  const apiKey = "5f88e4900f4e5958c2ef72bd1ea26e5a"; // Replace with your API key
                  const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
                  );
                  setCity(response.data.name);
                  console.log("hai"+response.data.name);
                  
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
        }
        console.log(city);
        
        try {
            const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f88e4900f4e5958c2ef72bd1ea26e5a`,)
            console.log(res);
            const data=res.data
            console.log(data);  
            setData(data)
            let cloud=(data.weather[0].main)
            let night=(data.sys.sunset)
            console.log(night);
            console.log(cloud);
            
            if(night>=1733056301){
                if(cloud=="Rain"){
                    seta(rain)
                    // col.style.background = 'linear-gradient(to right,#7D7975 , #454749)';
                }
                else if(cloud=="Clouds"){
                    seta(clo)
                    // col.style.background = 'linear-gradient(to right,#81a6d7 , #1a66b6)';
                }
                else if(cloud=="Mist"){
                    seta(mist)
                    // col.style.background = 'linear-gradient(to right,#7D7975 , #454749)';
                }
                else{
                    seta(sun)
                }
            }
            else{
                seta(moon)
            }
        } catch (error) {
            if (error.response.status === 404) {
                alert("invalid city")
                
            }
            console.log(error);
            
        }
    }
    useEffect(() => {
        if (Data && Data.main) {
            setTemp((Data.main.feels_like - 273.15).toFixed(2)); // Convert Kelvin to Celsius
        }
    }, [Data]);
    

    return(
        <>
            <div className="body" id="body">
                <div className="container">
                    <div className="search-div">
                        <input type="text" placeholder="city" id="city" name="city" onChange={(e)=>setCity(e.target.value)}/>
                        <button onClick={fetchData} >search</button>
                    </div>
                    <div id="container">
                        <div className="feild">
                            <div className="divs" id="clouds">
                                <img src={a} id="sun"/>
                                {/* <img src={a} classNamet="" id="sun"> */}
                                <p>{Data.weather ? Data.weather[0].main : "search for weather detailes"}</p>
                                <p>{Data.weather ? Data.weather[0].description : ""}</p>
                            </div>
                            <div className="divs">
                                <div className="temp">
                                <h1>{temp !== null ? `${temp}°C` : ""}°c</h1>
                            </div>
                            <div className="city">
                                <h3>${Data.name}</h3>
                            </div>
                            <div className="div2">
                                <div className="subdiv">
                                    <img src={hum} alt="" id="thermmo"/><p>{Data.weather ? Data.main.humidity :""}<br/>hummidity</p>
                                </div>
                                <div className="subdiv">
                                    <img src={wind} alt="" id="thermmo"/><p>{Data.weather ? Data.wind.speed:""} <br/>wind speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {/* <div className="divv" id="img">
                    
                </div> */}
            </div>
            {/* <Location/> */}
        </>
    )
}