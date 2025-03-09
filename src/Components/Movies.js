import { useState, useEffect, useCallback } from "react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
//mattwwherq
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para manejar qué película está expandida

  const fetchMovies = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
      );
      const data = await res.json();

      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error("Error al obtener películas:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Películas Populares</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(selectedMovie === movie.id ? null : movie.id)} // Alterna la expansión
            className={`border p-4 rounded shadow cursor-pointer transition-all ${
              selectedMovie === movie.id ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>

            {selectedMovie === movie.id && (
              <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{movie.overview}</p>
            )}
          </div>
        ))}
      </div>

      {/* Botón para cargar más películas */}
      <div className="text-center mt-6">
        <button
          onClick={() => setPage(page + 1)}
          className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Cargar más
        </button>
      </div>
    </div>
  );
};

export default Movies;
