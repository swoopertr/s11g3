import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { ApiHelper } from "../apiFunctions/apiHelper";

import axios from "axios";

const Movie = (props) => {

  const [movie, setMovie] = useState(null);

  const { id } = useParams();
  const { push } = useHistory();
  const {addToFavories, removeFromFavorites, favoriteMovies, setMovies} = props
  const [inFavorites, setInfavorites] = useState(false)

  useEffect(() => {
    const getMovieById = async () => {
     const response = await ApiHelper.getMovieById(id)
    setMovie(response);
    const checkFavorites = favoriteMovies.find(fav => fav.id == response.id);
    if (checkFavorites) {
      setInfavorites(true);
    }
  }
    getMovieById()
  }, [id]);

  const deleteMovie = async() => {
    const response =  await ApiHelper.deleteMovie(id);
    setMovies(response);
    if(inFavorites) {
      removeFromFavorites(id);
    }
    push('/movies')
  }

  const favoriteHandler = () => {
    if (inFavorites) {
      removeFromFavorites(id)
      setInfavorites(false)
    } else {
      addToFavories(movie)
      setInfavorites(true)
    }
    
  }

if (!movie) {
  return <div>Loading...</div>;
}

  return (
    <div className="bg-white rounded-md shadow flex-1">
      <div className="p-5 pb-3 border-b border-zinc-200">
        <h4 className="text-xl font-bold">{movie.title} Detayları</h4>
      </div>
      <div className="px-5 py-3">
        <div className="py-1 flex">
          <div className="view-label">İsim</div>
          <div className="flex-1">{movie.title}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Yönetmen</div>
          <div className="flex-1">{movie.director}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Tür</div>
          <div className="flex-1">{movie.genre}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Metascore</div>
          <div className="flex-1">{movie.metascore}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Açıklama</div>
          <p className="flex-1">{movie.description}</p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-zinc-200 flex justify-end gap-2">
        <button onClick={favoriteHandler} className="myButton bg-blue-600 hover:bg-blue-500 ">
          {inFavorites ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        </button>
        <Link
          to={`/movies/edit/${movie.id}`}
          className="myButton bg-blue-600 hover:bg-blue-500"
        >
          Edit
        </Link>
        <button onClick={deleteMovie} type="button" className="myButton bg-red-600 hover:bg-red-500">
          Sil
        </button>
      </div>
    </div>
  );
};

export default Movie;
