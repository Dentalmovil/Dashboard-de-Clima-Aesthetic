import React, { useState } from 'react';

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "TU_API_KEY_AQUI"; // <---61eb4276c68253f71847f445b5efab7c

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;
    
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=es`
      );
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error("Error al obtener el clima", error);
    }
    setLoading(false);
  };

  // Lógica para definir el color de fondo según la temperatura
  const getBackground = () => {
    if (!weather) return "from-slate-500 to-slate-800";
    const temp = weather.main.temp;
    if (temp > 25) return "from-orange-400 to-red-500"; // Cálido
    if (temp < 15) return "from-blue-400 to-indigo-600"; // Frío
    return "from-green-400 to-teal-500"; // Templado
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-all duration-1000 bg-gradient-to-br ${getBackground()} p-4 text-white font-sans`}>
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/30 text-center">
        
        <form onSubmit={fetchWeather} className="mb-8">
          <input 
            type="text" 
            placeholder="Escribe una ciudad..."
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:bg-white/20 transition-all placeholder:text-white/60"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>

        {loading && <p className="animate-pulse">Buscando en las nubes...</p>}

        {weather && weather.main ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <h2 className="text-5xl font-bold mb-2">{weather.name}</h2>
            <p className="text-xl capitalize mb-4 text-white/80">{weather.weather[0].description}</p>
            <div className="text-8xl font-black mb-6">
              {Math.round(weather.main.temp)}°
            </div>
            <div className="flex justify-around text-sm bg-black/10 p-4 rounded-2xl">
              <div>
                <p className="opacity-60">Humedad</p>
                <p className="font-bold text-lg">{weather.main.humidity}%</p>
              </div>
              <div>
                <p className="opacity-60">Viento</p>
                <p className="font-bold text-lg">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        ) : (
          !loading && <p className="text-white/70 italic text-lg">¿Cómo está el cielo hoy?</p>
        )}
      </div>
    </div>
  );
}
