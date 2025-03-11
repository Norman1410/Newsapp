import he from 'he';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/top-headlines";

// Función para limpiar caracteres corruptos y restaurar tildes
const cleanText = (text) => {
    if (!text) return "";

    return he.decode(
        text.replace(/ï¿œ/g, '')  // Elimina caracteres desconocidos
            .replace(/Ã¡/g, 'á').replace(/Ã©/g, 'é').replace(/Ã­/g, 'í')
            .replace(/Ã³/g, 'ó').replace(/Ãº/g, 'ú').replace(/Ã±/g, 'ñ')
            .replace(/â€œ/g, '“').replace(/â€/g, '”') // Comillas especiales
            .replace(/â€“/g, '–').replace(/â€”/g, '—') // Guiones largos
    );
};

// Función para obtener noticias según el idioma
export const getNews = async (language) => {
    try {
        const sources = language === "es"
            ? "el-mundo,infobae,cnn-es"
            : "bbc-news,cnn";

        const url = `${BASE_URL}?sources=${sources}&pageSize=50&apiKey=${API_KEY}`;
        console.log("URL solicitada:", url);

        const response = await fetch(url, {
            headers: {
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            }
        });

        if (!response.ok) throw new Error("Error en la respuesta de la API");

        const jsonData = await response.json();
        console.log("Noticias obtenidas antes de limpiar:", jsonData);

        // Aplicar limpieza de caracteres en títulos y descripciones antes de devolverlos
        const articles = jsonData.articles?.map(article => ({
            ...article,
            title: cleanText(article.title),
            description: cleanText(article.description)
        })) || [];

        console.log("Noticias después de limpiar en API:", articles);
        return articles;
    } catch (error) {
        console.error("Error obteniendo noticias:", error);
        return [];
    }
};
