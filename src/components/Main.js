import React from 'react'
import {useRef} from "react"
import clear from "./clear.svg"
import rainy from "./rainy.svg"
import cloudy from "./cloudy.svg"
import overcast from "./overcast.svg"


function implementCards(data){
    let parentDiv = document.querySelector(".day-cards");
    parentDiv.innerHTML = "";
    for(let x = 0; x < 6; x++){
        let cardDiv = document.createElement("div");
        let dateDiv = document.createElement("div");
        let condDiv = document.createElement("div");
        let tempDiv = document.createElement("div");
        let tempMaxDiv = document.createElement("div");
        let tempMinDiv = document.createElement("div");
        cardDiv.classList.add("dayCard");
        dateDiv.textContent = data.days[x].datetime;
        if(data.days[x].icon === "clear-day"){
            let image = document.createElement("img");
            image.src = clear;
            condDiv.appendChild(image)

        } else if(data.days[x].icon === "rain") {
            let image = document.createElement("img");
            image.src = rainy;
            condDiv.appendChild(image)
        } else if(data.days[x].icon === "cloudy") {
            let image = document.createElement("img")
            image.src = cloudy;
            condDiv.appendChild(image)           
        } else if(data.days[x].icon === "partly-cloudy-day") {
            let image = document.createElement("img")
            image.src = overcast;
            condDiv.appendChild(image) 
        }
        tempDiv.textContent = `Temperature: ${data.days[x].temp}`;
        tempMaxDiv.textContent = `Max Temperature: ${data.days[x].tempmax}`;
        tempMinDiv.textContent = `Min Temperature: ${data.days[x].tempmin}`;

        parentDiv.appendChild(cardDiv);
        cardDiv.appendChild(dateDiv);
        cardDiv.appendChild(condDiv);
        cardDiv.appendChild(tempDiv);
        cardDiv.appendChild(tempMaxDiv);
        cardDiv.appendChild(tempMinDiv);



    
        
        parentDiv.appendChild(cardDiv);
    }
}


function Main() {
    const inputRef = useRef(null);

    function handleClick() {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputRef.current.value}?unitGroup=metric&include=days&key=DPD5FUR8FF8TFK3BTLMXYXTAC&contentType=json`)
            .then(response => response.json())
            .then(data => implementCards(data));

  }
  return (
    <div className='main-content' id="main-content">
        <div className='form-div' id="form-div">
            <div className="custom-form" id="custom-form">
                <label htmlFor="city">Enter the city: </label>
                <input type="text" id="city" className="city" ref={inputRef}></input>
            </div>
            
            <button id="submit-button" className="submit-button" onClick={handleClick}>Submit</button>
        </div>
        <div className='day-cards' id="day-cards">
            
        </div>

        
        
    </div>
  )
}
///// ADDDDD ERRROR HANDLING ---- UNFINISHED
export default Main