import { FaMoon, FaSun } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase"; 
import { signOut } from "firebase/auth"; 

const Navbar = ({ toggleDarkMode, darkMode, onShowNews, onShowHome, user, onShowToday, onShowSports, onShowHealth }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    await signOut(auth);
    alert("Sesión cerrada");
  };

  return (
    <nav className={`px-6 py-4 flex justify-between items-center 
      ${darkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"}`}
    >
      {/* Botón para regresar a la pantalla principal */}
      <button
        onClick={onShowHome}
        className={`text-2xl font-bold px-4 py-1 rounded-lg shadow-md border-2
          ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"}`}
      >
        {t("title")}
      </button>

      <div className="flex space-x-4">
        {/* Botón de Noticias */}
        <button
          onClick={onShowNews}
          className={`px-4 py-2 rounded-lg shadow-md border-2 transition 
            ${darkMode ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"}`}
        >
          {t("news")}
        </button>

        {/* Botón de Noticias */}
        <button
          onClick={onShowToday}
          className={`px-4 py-2 rounded-lg shadow-md border-2 transition 
            ${darkMode ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"}`}
        >
          {t("Entertainment")}
        </button>

        {/* Botón de Noticias */}
        <button
          onClick={onShowHealth}
          className={`px-4 py-2 rounded-lg shadow-md border-2 transition 
            ${darkMode ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"}`}
        >
          {t("Health")}
        </button>

        {/* Botón de Noticias */}
        <button
          onClick={onShowSports}
          className={`px-4 py-2 rounded-lg shadow-md border-2 transition 
            ${darkMode ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"}`}
        >
          {t("Sports")}
        </button>

        {/* Botón de Cambio de Idioma */}
        <button
          onClick={changeLanguage}
          className={`px-4 py-2 rounded-lg flex items-center shadow-md border-2 transition 
            ${darkMode ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"}`}
        >
          {t("language")}
        </button>

        {/* Botón de Modo Oscuro/Claro */}
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg flex items-center shadow-md border-2 transition 
            ${darkMode ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"}`}
        >
          {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          {darkMode ? t("light_mode") : t("dark_mode")}
        </button>



        {/* Botón de Cerrar Sesión (solo si el usuario está autenticado) */}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
