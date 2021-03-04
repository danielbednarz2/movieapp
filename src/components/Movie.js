import React from 'react'

const IMAGES_API = 'https://image.tmdb.org/t/p/w1280'
const OMDB_API = 'f2bc2564';

const setVoteClass = (vote) => {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 6) {
        return 'yellow'
    } else {
        return 'red'
    }
}


const Movie = ({ title, release_date, backdrop_path, vote_average, vote_count }) => {
    const handleOnClick = () => {
        fetch(`http://www.omdbapi.com/?apikey=${OMDB_API}&t="${title}"&y=${release_date}`)
        .then(res => res.json())
        .then(data => window.open(`https://www.imdb.com/title/${data.imdbID}`))
    }

    return (
        <div className="movie" onClick={handleOnClick}>
            <img src={backdrop_path ? IMAGES_API + backdrop_path : 'https://images.unsplash.com/photo-1458053688450-eef5d21d43b3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=752&q=80'} alt={title} />
            <div className="movie-info">
                <h3>{title}</h3>
                <span>{release_date}</span>
            </div>

            <div className="movie-over">
                <h3>{vote_count} votes</h3>
                <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average} / 10</span>
            </div>
        </div>
        )
}

export default Movie