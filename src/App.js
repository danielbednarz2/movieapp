import React, { useEffect, useState } from 'react'
import Movie from './components/Movie'

const { REACT_APP_TMDB_KEY } = process.env;

const MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_TMDB_KEY}&language=en-US&page=1`

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&query=`

function App() {
  const [ movies, setMovies ] = useState([]);
  const [ searchValue, setSearchValue ] = useState('');

  const getMovies = (API) => {
    fetch(API)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.log(err.message))
  } 

  useEffect(() => {
    getMovies(MOVIES_API);
  }, [])

  const handleOnChange = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (searchValue.trim()) {
      getMovies(SEARCH_API + searchValue);
    } else {
      getMovies(MOVIES_API);
    }
  }, [searchValue])

  const resetSearchValue = () => {
    setSearchValue('')
  } 

  return (
    <>
    <header style={{'padding': '0 1.5em'}}>
      <h1 onClick={resetSearchValue} style={{'cursor': 'pointer'}}>Movie App</h1>
        <input className="search" type="text" placeholder="Search..." value={searchValue} onChange={handleOnChange}/>
    </header>
    <div className="App">
        { movies.map(movie => 
          <Movie {...movie} key={movie.id}/> )
        }
    </div>
    </>
  );
}

export default App;
