import React, { useEffect, useState } from 'react'
import Movie from './components/Movie'

const API_KEY = 'd376b102b2419f5403a7bcf9619cf6ea';

const MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d376b102b2419f5403a7bcf9619cf6ea&query='

function App() {
  const [ movies, setMovies ] = useState([]);
  const [ searchValue, setSearchValue ] = useState('');

  const getMovies = (API) => {
    fetch(API)
      .then(res => res.json())
      .then(data => setMovies(data.results))
  } 

  useEffect(() => {
    getMovies(MOVIES_API);
  }, [])

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchValue) {
      getMovies(SEARCH_API + searchValue);
      setSearchValue('');
    }

  }

  const handleOnChange = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
    <header >
      <h1>Movie App</h1>
      <form onSubmit={handleOnSubmit}>
        <input className="search" type="text" placeholder="Search..." value={searchValue} onChange={handleOnChange}/>
      </form>
    </header>
    <div className="App">
        {
          movies.length > 0 && movies.map(movie => <Movie {...movie} key={movie.id}/> )
        }
    </div>
    </>
  );
}

export default App;
