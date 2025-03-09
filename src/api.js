import i18n from "./i18n"; // Importamos i18n para detectar el idioma actual

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const getNews = async () => {
    try {
        const language = i18n.language === "es" ? "es" : "en"; // Detecta el idioma seleccionado
        let url = `${BASE_URL}/top-headlines?pageSize=50&apiKey=${API_KEY}`;

        if (language === "es") {
            // Fuentes en español
            url = `${BASE_URL}/top-headlines?sources=el-mundo,infobae,cnn-es&pageSize=50&apiKey=${API_KEY}`;
        } else {
            // Fuentes en inglés
            url = `${BASE_URL}/top-headlines?sources=bbc-news,cnn&pageSize=50&apiKey=${API_KEY}`;
        }

        console.log("🔍 URL solicitada:", url);
        
        const response = await fetch(url);
        const data = await response.json();

        console.log(`📰 Noticias en ${language}:`, data);

        return data.articles || []; // Devuelve un array vacío si no hay noticias
    } catch (error) {
        console.error("❌ Error obteniendo noticias:", error);
        return [];
    }
};
