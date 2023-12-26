import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather" ;
const API_KEY = "02c7f0b5201aff796b6b0f8e779aabae" ;
export const fetchWeather = async (query:string)=> {
    const { data } = await axios.get(URL , {
        params : {
            q : query,
            units : 'metric' ,
            APPID : API_KEY ,
        }
    }) ;
    return data ;
}




