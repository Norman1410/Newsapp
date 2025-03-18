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

export const getNewsToday = async (language) => {
    try {
        const sources = language === "es"
            ? "el-mundo,infobae,cnn-es"
            : "bbc-news,cnn";

        const today = new Date();
        const todayDate = today.getDate(); // Obtener el día actual

        // Generar un mes y año aleatorio dentro de los últimos 3 años
        const randomYear = Math.floor(Math.random() * 3) + (today.getFullYear() - 3);
        const randomMonth = Math.floor(Math.random() * 12) + 1; // Mes entre 1 y 12

        // Crear la fecha aleatoria en formato YYYY-MM-DD
        const fromDate = `${randomYear}-${String(randomMonth).padStart(2, "0")}-${String(todayDate).padStart(2, "0")}`;
        const toDate = fromDate; // Buscar solo ese día específico en el mes y año aleatorio

        // Construcción de la URL con el nuevo rango de fechas
        const url = `${BASE_URL}?sources=${sources}&from=${fromDate}&to=${toDate}&pageSize=50&apiKey=${API_KEY}`;
        console.log("URL solicitada:", url);

        const response = await fetch(url, {
            headers: {
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            }
        });

        if (!response.ok) throw new Error("Error en la respuesta de la API");

        const jsonData = await response.json();
        if (!jsonData.articles) return [];

        console.log("Noticias obtenidas:", jsonData);

        const articles = jsonData.articles.map(article => ({
            ...article,
            title: cleanText?.(article.title) || article.title,
            description: cleanText?.(article.description) || article.description,
        }));

        console.log("Noticias después de limpiar texto:", articles);
        return articles;
    } catch (error) {
        console.error("Error obteniendo noticias:", error);
        return [];
    }
};

const getNewsByKeyword = async (keyword, language) => {
    try {
        const sources = language === "es" ? "el-mundo,infobae,cnn-es" : "bbc-news,cnn";
        const url = `${BASE_URL}?sources=${sources}&q=${encodeURIComponent(keyword)}&pageSize=50&apiKey=${API_KEY}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la respuesta de la API");

        const jsonData = await response.json();
        return jsonData.articles || [];
    } catch (error) {
        console.error("Error obteniendo noticias:", error);
        return [];
    }
};
//ejemplo mx us br etc
export const getNewsByCountry = async (countryCode) => {
    try {
        // Construcción de la URL con el código de país
        const url = `${BASE_URL}?country=${countryCode}&pageSize=50&apiKey=${API_KEY}`;

        console.log("URL solicitada:", url);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la respuesta de la API");

        const jsonData = await response.json();
        return jsonData.articles || [];
    } catch (error) {
        console.error("Error obteniendo noticias", error);
        return [];
    }
};

//General Negocio Deportes etc
export const getNewsByCategory = async (category) => {
    try {
        const url = `${BASE_URL}?category=${category}&pageSize=50&apiKey=${API_KEY}`;

        console.log("URL solicitada:", url);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la respuesta de la API");

        const jsonData = await response.json();
        return jsonData.articles || [];
    } catch (error) {
        console.error("Error obteniendo noticias por categoría:", error);
        return [];
    }
};