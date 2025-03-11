import { useState, useEffect } from "react";
import { getNews } from "../api";
import { useTranslation } from "react-i18next";
import he from "he"; // Importar librería para decodificar caracteres

// Función para limpiar caracteres corruptos y restaurar tildes
const cleanText = (text) => {
  if (!text) return "";
  return he.decode(text);
};

const News = () => {
  const { i18n } = useTranslation();
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  const defaultImage = "/default-news-image.jpg"; // Imagen por defecto

  useEffect(() => {
    const fetchNews = async () => {
      const articles = await getNews(i18n.language);

      // Aplicar `cleanText()` a cada noticia antes de guardarla en el estado
      const cleanedArticles = articles.map(article => ({
        ...article,
        title: cleanText(article.title),
        description: cleanText(article.description),
      }));

      console.log("Noticias después de limpiar en News.js:", cleanedArticles);
      setNews(cleanedArticles);
    };
    fetchNews();
  }, [i18n.language]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {i18n.language === "es" ? "Últimas Noticias (ES)" : "Latest News (EN)"}
      </h1>

      {news.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No se encontraron noticias en este idioma.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article, index) => {
            return (
              <div key={index} className="border p-4 rounded shadow transition-all bg-white dark:bg-gray-800">
                {/* Imagen de la noticia */}
                <img
                  src={article.urlToImage?.trim() ? article.urlToImage : defaultImage}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded bg-gray-300"
                />

                {/* Título con enlace a la noticia */}
                <h2 className="text-lg font-semibold mt-2">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {article.title}
                  </a>
                </h2>

                {/* Botón para mostrar detalles */}
                <button
                  onClick={() => setSelectedNews(selectedNews === index ? null : index)}
                  className="mt-2 text-sm text-gray-600 dark:text-gray-300 hover:underline"
                >
                  {selectedNews === index ? "Ocultar detalles" : "Ver más detalles"}
                </button>

                {/* Sección de detalles si está expandida */}
                {selectedNews === index && (
                  <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <p className="text-sm">
                      {article.description || "No hay descripción disponible."}
                    </p>
                    <p className="text-xs mt-1 text-gray-500">
                      <strong>Fuente:</strong> {article.source?.name || "Desconocida"}
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Fecha:</strong>{" "}
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Desconocida"}
                    </p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline block mt-1">
                      Leer en la fuente original
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default News;
