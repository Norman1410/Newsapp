import { useState } from "react";
import { useTranslation } from "react-i18next";

const countries = [
  { code: "all", name: "Todos los países", flag: "" }, // Opción para todos los países
  { code: "us", name: "USA", flag: "https://flagcdn.com/w40/us.png" },
  { code: "mx", name: "México", flag: "https://flagcdn.com/w40/mx.png" },
  { code: "br", name: "Brasil", flag: "https://flagcdn.com/w40/br.png" },
  { code: "ar", name: "Argentina", flag: "https://flagcdn.com/w40/ar.png" },
  { code: "fr", name: "Francia", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "de", name: "Alemania", flag: "https://flagcdn.com/w40/de.png" },
];

const Home = ({ darkMode, handleSearch, newsResults }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to "Todos los países"
  const [selectedNews, setSelectedNews] = useState(null); // Estado para las noticias seleccionadas
  const defaultImage = "https://via.placeholder.com/150"; // Imagen por defecto si no hay urlToImage

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">{t("news_main_screen")}</h1>

      {/* Barra de búsqueda */}
      <div className={`flex w-full max-w-md border rounded-lg overflow-hidden shadow-md ${darkMode ? "bg-gray-900 text-white" : "text-black"}`}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("Search")}
          className={`flex-grow p-2 outline-none
            ${darkMode ? "bg-gray-900 text-white" : "text-black"}`
          }
        />

        {/* Select con banderas */}
        <div className="relative">
          <select
            value={selectedCountry.code}
            onChange={(e) =>
              setSelectedCountry(
                countries.find((c) => c.code === e.target.value)
              )
            }
            className={`p-2 border-l pr-8 appearance-none 
                        ${darkMode ? "bg-gray-900 text-white" : "text-black"}`
            }
            style={{
              backgroundImage: `url(${selectedCountry.flag})`,
              backgroundSize: "20px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
              paddingLeft: "35px",
            }}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de búsqueda */}
        <button
          onClick={() => handleSearch(search, selectedCountry.code)}
          className="bg-blue-500 text-white px-4 hover:bg-blue-600"
        >
          🔍
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsResults.map((article, index) => (
          <div
            key={index}
            className={`border p-4 rounded shadow transition-all 
              ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
          >
            {/* Imagen de la noticia */}
            <img
              src={article.urlToImage?.trim() ? article.urlToImage : defaultImage}
              alt={article.title}
              className="w-full h-40 object-cover rounded bg-gray-500"
            />

            {/* Título con enlace a la noticia */}
            <h2 className="text-lg font-semibold mt-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {article.title}
              </a>
            </h2>

            {/* Botón para mostrar detalles */}
            <button
              onClick={() =>
                setSelectedNews(selectedNews === index ? null : index)
              }
              className="mt-2 text-sm text-gray-400 hover:underline"
            >
              {selectedNews === index ? "Ocultar detalles" : "Ver más detalles"}
            </button>

            {/* Sección de detalles si está expandida */}
            {selectedNews === index && (
              <div
                className={`mt-2 p-3 rounded shadow-md
                  ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}
              >
                <p className="text-sm">
                  {article.description || "No hay descripción disponible."}
                </p>
                <p className="text-xs mt-1 text-gray-400">
                  <strong>Fuente:</strong> {article.source?.name || "Desconocida"}
                </p>
                <p className="text-xs text-gray-400">
                  <strong>Fecha:</strong>{" "}
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString()
                    : "Desconocida"}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-xs hover:underline block mt-1"
                >
                  Leer en la fuente original
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
