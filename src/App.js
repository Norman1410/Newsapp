import { useState } from "react";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Home from "./Components/Home";

const App = () => {
  const [showMovies, setShowMovies] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Alternar modo oscuro pantalla
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Mostrar pantalla de películas
  const onShowMovies = () => {
    setShowMovies(true);
  };

  // Volver a la pantalla principal
  const onShowHome = () => {
    setShowMovies(false);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
      <Navbar
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        onShowMovies={onShowMovies}
        onShowHome={onShowHome}
      />
      <div className="p-6">
        {showMovies ? <Movies /> : <Home />}
      </div>
    </div>
  );
};

export default App;
