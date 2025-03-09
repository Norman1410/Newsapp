import he from "he";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

// Función para limpiar y decodificar caracteres especiales
const cleanText = (text) => {
  if (!text) return "Sin información disponible"; // Evita valores nulos
  return he.decode(text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")); // Decodifica y normaliza
};

// Función para obtener noticias en el idioma seleccionado
export const getNews = async (language = "en") => {
  try {
    let url = `${BASE_URL}/top-headlines?pageSize=50&apiKey=${API_KEY}`;

    if (language === "es") {
      url += "&sources=el-mundo,infobae,cnn-es";
    } else {
      url += "&sources=bbc-news,cnn";
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles) return [];

    return data.articles.map((article) => ({
      ...article,
      title: cleanText(article.title),
      description: cleanText(article.description),
    }));
  } catch (error) {
    console.error("Error obteniendo noticias:", error);
    return [];
  }
};
