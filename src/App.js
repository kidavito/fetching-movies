import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // PROMISES (fetch + async + await):
  async function fetchMoviesHandler() {
    // Set initial fetching status:
    setIsLoading(true);

    // Set initial error to null:
    // Make sure to clear any previous error.
    setError(null);

    try {
      // Request API data (fetching):
      // By default, fetch will use GET method (request).
      const response = await fetch("https://swapi.dev/api/films/"); // API endpoint.

      // If response not "ok", then:
      // Server doesn't responding or not returning any object.
      // This could be any kind of error (example: 404 error).
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // But if the server is responding, then:
      const data = await response.json();

      // Mapping the API contents:
      const transformMovies = data.results.map((movieData) => {
        return {
          // Based on the API object:
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      // Set the state value with data from the API:
      setMovies(transformMovies);
    } catch (error) {
      // If error, set error state with error message:
      setError(error.message);
    }
    // Set final fetching status:
    setIsLoading(false);
  }

  // // PROMISES (fetch + then):
  // function fetchMoviesHandler() {
  //   // Request API data:
  //   // By default, fetch will use GET method (request)
  //   fetch("https://swapi.dev/api/films/") // API endpoint.
  //     .then((response) => {
  //       // Receive the JSON format from the API and translate it into JavaScript object:
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Mapping the API contents:
  //       const transformMovies = data.results.map((movieData) => {
  //         return {
  //           // Based on the API object:
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //       // Set the state value with data from the API:
  //       setMovies(transformMovies);
  //     });
  // }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && movies.length === 0 && !error && (
          <p>No movie(s) fetched.</p>
        )}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
