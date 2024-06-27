import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ApiHelper } from '../apiFunctions/apiHelper';

const EditMovieForm = props => {
    const { push } = useHistory();
    const { id } = useParams();
    
    const [movie, setMovie] = useState({});
    useEffect(() => {
        const MetaCatcher = async () => {
            const MovieCatcher = await ApiHelper.getMovieById(id);
            setMovie(MovieCatcher);
        };
        MetaCatcher()
    },[]);

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const updatedMovies = await ApiHelper.putMovies(id, movie.title, movie.director, movie.metascore, movie.genre, movie.description);
        push(`/movies/${id}`);
    };

    const { title, director, genre, metascore, description } = movie;

    return (
        <div className="bg-white rounded-md shadow flex-1">
            <form onSubmit={handleSubmit}>
                <div className="p-5 pb-3 border-b border-zinc-200">
                    <h4 className="text-xl font-bold">
                        Düzenleniyor <strong>{movie.title}</strong>
                    </h4>
                </div>

                <div className="px-5 py-3">
                    <div className="py-2">
                        <label className="block pb-1 text-lg">Title</label>
                        <input value={title} onChange={handleChange} name="title" type="text" />
                    </div>
                    <div className="py-2">
                        <label className="block pb-1 text-lg">Director</label>
                        <input value={director} onChange={handleChange} name="director" type="text" />
                    </div>
                    <div className="py-2">
                        <label className="block pb-1 text-lg">Genre</label>
                        <input value={genre} onChange={handleChange} name="genre" type="text" />
                    </div>
                    <div className="py-2">
                        <label className="block pb-1 text-lg">Metascore</label>
                        <input value={metascore} onChange={handleChange} name="metascore" type="number" />
                    </div>
                    <div className="py-2">
                        <label className="block pb-1 text-lg">Description</label>
                        <textarea value={description} onChange={handleChange} name="description"></textarea>
                    </div>
                </div>

                <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-2">
                    <Link to={`/movies/${id}`} className="myButton bg-zinc-500">
                        Vazgeç
                    </Link>
                    <button type="submit" className="myButton bg-green-700 hover:bg-green-600">
                        Güncelle
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditMovieForm;
