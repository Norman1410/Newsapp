import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News"; 
import Home from "./Components/Home";
import Login from "./Components/Login";
import Today from "./Components/Today";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth"; 
import Sports from "./Components/Sports";

const App = () => {
  const [showNews, setShowNews] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToday, setShowToday] = useState(false);
  const [newsResults, setNewsResults] = useState([]); // Estado para almacenar las noticias (de la barra de busqueda)
  const [showSports, setShowSports] = useState(false);
  // Detectar si el usuario está autenticado al cargar la app
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Alternar modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Mostrar pantalla de noticias (solo si el usuario está autenticado)
  const onShowNews = () => {
    if (user) {
      setShowNews(true);
    } else {
      alert("Debes iniciar sesión para ver las noticias");
    }
  };
  // Volver a la pantalla principal
  const onShowHome = () => {
    setShowNews(false);
    setShowToday(false);
    setShowSports(false);
  };

  const onShowToday = () => {
    if (user) {
      setShowToday(true);
    } else {
      alert("Debes iniciar sesión para ver las noticias");
    }
  };

  const onShowSports = () => {
    if (user) {
      setShowSports(true);
    } else {
      alert("Debes iniciar sesión para ver las noticias");
    }
  };

  const sources = {
    us: "cnn,abc-news",
    mx: "el-mundo,infobae",
    br: "globo",
    ar: "clarin,la-nacion",
    fr: "le-monde",
    de: "der-tagesspiegel"
};

const handleSearch = async (query, country) => {
    const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
    const selectedSources = sources[country] || "cnn"; // Usa CNN si el país no está soportado

    const url = `https://newsapi.org/v2/top-headlines?q=${query}&sources=${selectedSources}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        setNewsResults(data.articles);
    } catch (error) {
        console.error("Error al obtener noticias:", error);
    }
};


  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
      <Navbar
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        onShowNews={onShowNews} 
        onShowHome={onShowHome}
        user={user} 
        onShowToday={onShowToday}
        onShowSports={onShowSports}
      />
      <div className="p-6">
        {/* Pantalla de carga mientras Firebase verifica la sesión */}
        {loading ? (
          <p className="text-center text-lg">Cargando...</p>
        ) : !user ? (
          <Login darkMode={darkMode} /> 
        ) : showNews ? (
          <News darkMode={darkMode} />
        ) : showToday ? (
          <Today darkMode={darkMode} />
        ) : showSports ? (
          <Sports darkMode={darkMode} />
        ) : (
          <Home handleSearch={handleSearch} newsResults={newsResults} />
        )}
      </div>
    </div>
  );
};

export default App;
