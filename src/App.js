import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News"; 
import Home from "./Components/Home";
import Login from "./Components/Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth"; 

const App = () => {
  const [showNews, setShowNews] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
      <Navbar
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        onShowNews={onShowNews} 
        onShowHome={onShowHome}
        user={user} 
      />
      <div className="p-6">
        {/* Pantalla de carga mientras Firebase verifica la sesión */}
        {loading ? (
          <p className="text-center text-lg">Cargando...</p>
        ) : !user ? (
          <Login darkMode={darkMode} /> // ✅ Pasamos darkMode a Login
        ) : (
          showNews ? <News darkMode={darkMode} /> : <Home />
        )}
      </div>
    </div>
  );
};

export default App;
