import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
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
  // Using "useCallback" to store and compare this function if any changes.
  const fetchMoviesHandler = useCallback(async () => {
    // Set initial fetching status.
    // Set initial error to null.
    // To make sure to clear any previous error.
    setIsLoading(true);
    setError(null);

    try {
      // Request API data (fetching):
      // By default, fetch will use GET method (request).
      const response = await fetch(
        "https://fetching-movies-6a2ea-default-rtdb.firebaseio.com/movies.json"
      ); // API endpoint.

      // If response not "ok", then:
      // Server doesn't responding or not returning any object.
      // This could be any kind of error (example: 404 error).
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // But if the server is responding, then:
      const data = await response.json();

      // Mapping the API contents:
      // Based on the API object.
      const transformMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      // Set the state value with data from the API:
      setMovies(transformMovies);
    } catch (error) {
      setError(error.message); // If error, set error state with error message.
    }
    setIsLoading(false); // Set final fetching status.
  }, []);

  // Side Effects:
  // Initial movie fetch (When page loaded).
  // Dependency array will prevent infinite loop.
  // With dependency array, the movie fetch will only run through useEffect only if the "fetchMoviesHandler" function changed.
  // Check the useCallback.
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // Add Movie:
  function addMovieHandler(movie) {
    console.log(movie);
  }

  // Content(s) to be rendered
  // Initial content(s) (default):
  let content = <p>No movie(s) fetched.</p>;

  // If any movies loaded:
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  // If server returning error (server not responding or not returning any object):
  if (error) {
    content = <p>{error}</p>;
  }

  // If loading (while try contacting the server):
  if (isLoading) {
    content = <p>Loading...</p>;
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
