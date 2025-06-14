import { type Movie } from "../types/movie.ts";
import axios from "axios";

export interface GetMovieRes {
  results: Movie[];
}

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (newQuery: string): Promise<Movie[]> => {
  if (!TOKEN) {
    throw new Error("TMDB token is missing in .env");
  }

  const res = await axios.get<GetMovieRes>(`${BASE_URL}/search/movie`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      query: newQuery,
    },
  });

  return res.data.results;
};
