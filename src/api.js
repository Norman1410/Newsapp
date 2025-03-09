const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

// Función para obtener las noticias más recientes
export const getNews = async () => {
    try {
        const response = await fetch(`${BASE_URL}/top-headlines?country=us&pageSize=50&apiKey=${API_KEY}`);
        const data = await response.json();
        console.log("Noticias obtenidas:", data);
        return data.articles; // NewsAPI devuelve un array en `articles`
    } catch (error) {
        console.error("Error obteniendo noticias:", error);
    }
};
