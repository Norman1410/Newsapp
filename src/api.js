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


const MAX_YEARS = 2; // Solo buscar en los últimos 2 años
const MAX_MONTHS = 6; // Solo buscar en 6 meses aleatorios
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const getNewsToday = async (language) => {
    try {
        if (!API_KEY) {
            console.error("❌ API_KEY no definida");
            return [];
        }

        const sources = language === "es"
            ? "el-mundo,infobae,cnn-es"
            : "bbc-news,cnn";

        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");

        let articles = [];

        for (let i = 1; i <= MAX_YEARS; i++) {
            const randomYear = today.getFullYear() - i;
            for (let j = 0; j < MAX_MONTHS; j++) {
                const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
                const date = `${randomYear}-${randomMonth}-${day}`;

                const url = `${BASE_URL}?language=${language}&from=${date}&to=${date}&pageSize=10&apiKey=${API_KEY}`;
                console.log("📡 Solicitando noticias de:", date);

                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Error ${response.status}`);

                    const jsonData = await response.json();
                    articles = articles.concat(jsonData.articles || []);
                } catch (error) {
                    console.error(`❌ Error en la llamada para ${date}:`, error);
                }

                await delay(1000); // Pausa entre llamadas
            }
        }

        console.log("📰 Noticias encontradas:", articles.length);
        return articles;
    } catch (error) {
        console.error("❌ Error obteniendo noticias:", error);
        return [];
    }
};




//General Negocio Deportes etc
export const getNewsByCategory = async (language,category) => {
    try {

        const url = `${BASE_URL}?category=${category}&pageSize=50&apiKey=${API_KEY}`;

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