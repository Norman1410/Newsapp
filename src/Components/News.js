import { useState, useEffect } from "react";
import { getNews } from "../api";
import { useTranslation } from "react-i18next";
import he from "he";

const News = () => {
  const { i18n, t } = useTranslation();
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  const defaultImage = "/default-news-image.jpg"; // Imagen por defecto

  useEffect(() => {
    const fetchNews = async () => {
      const articles = await getNews(i18n.language);
      setNews(articles);
    };
    fetchNews();
  }, [i18n.language]);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">
        {t("news_main_screen")} ({i18n.language.toUpperCase()})
      </h1>
      {news.length === 0 ? (
        <p className="text-gray-500">{t("no_news")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article, index) => (
            <div
              key={index}
              onClick={() =>
                setSelectedNews(selectedNews === index ? null : index)
              }
              className={`border p-4 rounded shadow cursor-pointer transition-all ${
                selectedNews === index ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
            >
              {/* Imagen de la noticia o imagen por defecto */}
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={article.urlToImage?.trim() ? article.urlToImage : defaultImage}
                  alt={article.urlToImage ? article.title : "Imagen por defecto"}
                  className="w-full h-40 object-cover rounded bg-gray-300"
                />
              </a>

              {/* Título de la noticia con enlace */}
              <h2 className="text-lg font-semibold mt-2">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {he.decode(article.title)}
                </a>
              </h2>

              {/* Descripción solo si la noticia está expandida */}
              {selectedNews === index && (
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                  {article.description?.trim()
                    ? he.decode(article.description)
                    : t("no_description")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
