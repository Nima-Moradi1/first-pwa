import { useState } from 'react';
import './App.css'

import { fetchWeather } from './api/fetchWeather' ;
const App = () => {

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    
  });

  interface WeatherData {
      main?: {
      temp: number;
    };
    name?: string;
    sys?: {
      country: string;
    };
    weather?: [
      {
        description: string;
        icon: string;
      }
    ];
  }

  const [query , setQuery] = useState('') ;
  const [weather , setWeather] = useState<WeatherData>({});
  const search = async (e :React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data) ;
      setQuery('')
    }
  }

  return (
    <div className='bg-black min-h-screen'>
      <div className='flex items-center justify-center m-auto min-h-[30vh] '>
        <input 
      type='text'
      className='pl-16 py-4 shadow-md ring-2 ring-slate-200 shadow-white rounded-2xl focus:ring-2 focus:shadow-lg focus:transition-all focus:ease-in-out focus:duration-300 focus:shadow-blue-300 focus:ring-blue-200 text-xl w-[260px] md:w-[350px] lg:w-[500px] outline-none'
      placeholder='Search a City ...'
      value={query}
      onChange={(e)=> setQuery(e.target.value)}
      onKeyDown={search}
      />
      </div>
      {weather.main && (
        <div className='rounded-3xl mx-auto text-center -mt-5 shadow-lg shadow-white ring-2 ring-slate-200 bg-slate-200 max-w-sm lg:max-w-lg  py-10 gap-10 text-black flex flex-col justify-center items-center'>
          <h2>
            <span className='text-5xl'>{weather.name}</span>
            <sup className='px-5 py-1 text-2xl text-white mx-1 rounded-full bg-orange-500'>{weather.sys?.country}</sup>
          </h2>
          <div className='font-bold text-5xl mt-5'>{Math.round(weather.main.temp)}
          <sup>&deg;C</sup></div>
          <div>
            <img className='mx-auto w-32' alt={weather.weather![0].description ?? ""} src={`https://openweathermap.org/img/wn/${weather.weather![0].icon}@2x.png`}/>
          <p className='uppercase tracking-wider font-bold mt-5 text-2xl'>{weather.weather![0].description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
