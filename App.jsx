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
import React, { useState } from 'react';
import { Search, Cloud, Sun, CloudRain, CloudLightning, Snowflake, Wind, Droplets } from 'lucide-react';

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "TU_API_KEY_AQUI"; // RECUERDA PONER TU KEY

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
      console.error("Error", error);
    }
    setLoading(false);
  };

  // Función para obtener el icono según el clima
  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear': return <Sun size={80} className="text-yellow-300 animate-spin-slow" />;
      case 'Clouds': return <Cloud size={80} className="text-gray-200 animate-bounce" />;
      case 'Rain': return <CloudRain size={80} className="text-blue-300" />;
      case 'Thunderstorm': return <CloudLightning size={80} className="text-purple-400" />;
      case 'Snow': return <Snowflake size={80} className="text-white" />;
      default: return <Cloud size={80} className="text-white" />;
    }
  };

  const getBackground = () => {
    if (!weather) return "from-slate-800 to-slate-950";
    const temp = weather.main.temp;
    if (temp > 25) return "from-orange-500 via-red-500 to-pink-500";
    if (temp < 15) return "from-cyan-500 via-blue-600 to-indigo-800";
    return "from-emerald-400 to-cyan-600";
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackground()} p-6 transition-all duration-1000 font-sans`}>
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 shadow-2xl text-white">
        
        {/* Input con Icono */}
        <form onSubmit={fetchWeather} className="relative mb-10">
          <input 
            type="text" 
            placeholder="Buscar ciudad..."
            className="w-full bg-white/10 border border-white/20 py-4 px-6 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-white/50"
            onChange={(e) => setCity(e.target.value)}
          />
          <Search className="absolute right-4 top-4 text-white/50" />
        </form>

        {weather ? (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-center mb-6">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
            
            <h1 className="text-6xl font-black mb-2">{Math.round(weather.main.temp)}°</h1>
            <h2 className="text-2xl font-medium tracking-wide mb-8">{weather.name}</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
                <Droplets className="text-cyan-300" />
                <div className="text-left">
                  <p className="text-xs text-white/50 uppercase">Humedad</p>
                  <p className="font-bold">{weather.main.humidity}%</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
                <Wind className="text-teal-300" />
                <div className="text-left">
                  <p className="text-xs text-white/50 uppercase">Viento</p>
                  <p className="font-bold">{weather.wind.speed} km/h</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 opacity-50">
            <Sun size={48} className="mx-auto mb-4 animate-pulse" />
            <p className="text-lg">Ingresa una ciudad para ver la magia</p>
          </div>
        )}
      </div>
    </div>
  );
}
{
  "name": "mi-proyecto-clima",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "firebase": "^10.0.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5",
    "tailwindcss": "^3.3.3",
    "postcss": "^8.4.27",
    "autoprefixer": "^10.4.14"
  }
}
import React, { useState, useEffect } from 'react';
import { auth, provider } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Loader2 } from 'lucide-react'; // Icono de carga

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo: Estado de carga inicial

  useEffect(() => {
    // onAuthStateChanged nos dice si hay un usuario activo
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Una vez que Firebase responde, dejamos de cargar
    });
    return () => unsubscribe();
  }, []);

  // 2. Pantalla de Carga Estilizada
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-lg font-medium animate-pulse">Verificando sesión...</p>
      </div>
    );
  }

  // 3. Lógica normal (Login o Dashboard)
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {user ? (
        <Dashboard user={user} /> // Tu componente de Clima
      ) : (
        <LoginScreen /> // Tu componente de Login
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { auth, provider } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Loader2 } from 'lucide-react'; // Icono de carga

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo: Estado de carga inicial

  useEffect(() => {
    // onAuthStateChanged nos dice si hay un usuario activo
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Una vez que Firebase responde, dejamos de cargar
    });
    return () => unsubscribe();
  }, []);

  // 2. Pantalla de Carga Estilizada
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-lg font-medium animate-pulse">Verificando sesión...</p>
      </div>
    );
  }

  // 3. Lógica normal (Login o Dashboard)
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {user ? (
        <Dashboard user={user} /> // Tu componente de Clima
      ) : (
        <LoginScreen /> // Tu componente de Login
      )}
    </div>
  );
}
// ... dentro de tu componente ...
const [history, setHistory] = useState([]);

// Cargar historial al inicio
useEffect(() => {
  const savedHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  setHistory(savedHistory);
}, []);

// Función para añadir al historial (llámala dentro de fetchWeather)
const addToHistory = (cityName) => {
  if (!history.includes(cityName)) {
    const newHistory = [cityName, ...history].slice(0, 3); // Guardamos solo las últimas 3
    setHistory(newHistory);
    localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
  }
};


