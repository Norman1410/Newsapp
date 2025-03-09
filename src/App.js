import { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News"; // Reemplazamos Movies por News
import Home from "./Components/Home";

const App = () => {
  const [showNews, setShowNews] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Alternar modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Mostrar pantalla de noticias
  const onShowNews = () => {
    setShowNews(true);
  };

  // Volver a la pantalla principal
  const onShowHome = () => {
    setShowNews(false);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
      <Navbar
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        onShowNews={onShowNews} // Cambiado de onShowMovies a onShowNews
        onShowHome={onShowHome}
      />
      <div className="p-6">
        {showNews ? <News /> : <Home />} {/* Cambiado Movies por News */}
      </div>
    </div>
  );
};

export default App;
