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

  // PROMISES (fetch + then):
  function fetchMoviesHandler() {
    // Request API data:
    // By default, fetch will use GET method (request)
    fetch("https://swapi.dev/api/films/") // API endpoint.
      .then((response) => {
        // Receive the JSON format from the API and translate it into JavaScript object:
        return response.json();
      })
      .then((data) => {
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
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
