const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Función para obtener las películas populares
export const getPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`);
        const data = await response.json();
        console.log("Películas populares:", data);
        return data.results;
    } catch (error) {
        console.error("Error obteniendo películas populares:", error);
    }
};
