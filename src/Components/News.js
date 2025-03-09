import { useState, useEffect } from "react";
import { getNews } from "../api"; // Importamos la nueva función

const News = () => {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const articles = await getNews();
      setNews(articles);
    };
    fetchNews();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Últimas Noticias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <div
            key={index}
            onClick={() => setSelectedNews(selectedNews === index ? null : index)}
            className={`border p-4 rounded shadow cursor-pointer transition-all ${
              selectedNews === index ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="w-full rounded" />
            )}
            <h2 className="text-lg font-semibold mt-2">{article.title}</h2>
            {selectedNews === index && (
              <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{article.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
