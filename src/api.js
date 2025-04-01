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

        // Obtener la fecha actual y calcular el rango permitido (últimos 30 días)
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        // Filtrar noticias que sean de los últimos 30 días
        const articles = jsonData.articles?.filter(article => {
            if (!article.publishedAt) return false; // Omitir si no tiene fecha

            const articleDate = new Date(article.publishedAt);
            return articleDate >= thirtyDaysAgo; // Solo aceptar noticias recientes
        }).map(article => ({
            ...article,
            title: cleanText(article.title),
            description: cleanText(article.description)
        })) || [];

        console.log("Noticias después de filtrar:", articles);
        return articles;
    } catch (error) {
        console.error("Error obteniendo noticias:", error);
        return [];
    }
};



export const getNewsToday = async () => {
    try {
        if (!API_KEY) {
            console.error("❌ API_KEY no definida");
            return [];
        }

        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const randomYear = today.getFullYear() - Math.floor(Math.random() * 3);
        const maxMonth = randomYear === today.getFullYear() ? today.getMonth() + 1 : 12;
        const randomMonth = String(Math.floor(Math.random() * maxMonth) + 1).padStart(2, "0");
        const date = `${randomYear}-${randomMonth}-${day}`;

        const query = "noticias"; // Término de búsqueda genérico
        const url = `https://newsapi.org/v2/everything?q=${query}&from=${date}&to=${date}&pageSize=1&apiKey=${API_KEY}`;

        console.log("📡 Solicitando noticia de:", date);

        try {
            const response = await fetch(url);
            const jsonData = await response.json();

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${jsonData.message}`);
            }

            const articles = jsonData.articles ? jsonData.articles.slice(0, 1) : [];
            console.log("📰 Noticia encontrada:", articles.length);

            return articles;
        } catch (error) {
            console.error(`❌ Error en la llamada para ${date}:`, error);
            return [];
        }
    } catch (error) {
        console.error("❌ Error obteniendo noticia:", error);
        return [];
    }
};







//General Negocio Deportes etc
export const getNewsByCategory = async (language, category) => {
    try {
        const url = `${BASE_URL}?category=${category}&pageSize=50&apiKey=${API_KEY}`;
        console.log("URL solicitada:", url);

        const response = await fetch(url, {
            headers: {
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta de la API: ${response.status} (${response.statusText})`);
        }

        const jsonData = await response.json();
        console.log("Noticias obtenidas antes de limpiar:", jsonData);

        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setUTCDate(today.getUTCDate() - 30);

        const articles = jsonData.articles?.filter(article => {
            if (!article.publishedAt) return false;
            const articleDate = new Date(article.publishedAt);
            return articleDate >= thirtyDaysAgo;
        }).map(article => ({
            ...article,
            title: cleanText?.(article.title) || article.title,
            description: cleanText?.(article.description) || article.description
        })) || [];

        console.log("Noticias después de filtrar:", articles);
        return articles;
    } catch (error) {
        console.error("Error obteniendo noticias:", error.message);
        return [];
    }
};

