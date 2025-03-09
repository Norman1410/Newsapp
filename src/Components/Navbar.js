import { FaMoon, FaSun } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Navbar = ({ toggleDarkMode, darkMode, onShowNews, onShowHome }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Botón para regresar a la pantalla principal */}
      <button
        onClick={onShowHome}
        className="text-2xl font-bold bg-white text-blue-600 px-4 py-1 rounded-lg shadow-md"
      >
        {t("title")}
      </button>

      <div className="flex space-x-4">
        {/* Botón de Noticias */}
        <button
          onClick={onShowNews} // ✅ Cambiado de onShowMovies a onShowNews
          className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          {t("news")}
        </button>

        {/* Botón de Cambio de Idioma */}
        <button
          onClick={changeLanguage}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-gray-700 transition"
        >
          {t("language")}
        </button>

        {/* Botón de Modo Oscuro/Claro con traducción */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-gray-700 transition"
        >
          {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          {darkMode ? t("light_mode") : t("dark_mode")}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
