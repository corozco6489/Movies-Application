import Navbar from "./components/navbar/Navbar";

import Carousel from "./components/carousel/Carousel";
import { useState, useEffect } from "react";
import MovieList from "./components/movielist/MovieList";
import AddFavourites from "./components/add/AddFavourite";
import RemoveFavourites from "./components/remove/RemoveFavourites";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/heading/MovieListHeading";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);


  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=aeb2b829`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};
  return (
    <div className="movie-app">
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <Carousel />
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
			</div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
        
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>

      <div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
    
      
    </div>
  );
}

export default App;
