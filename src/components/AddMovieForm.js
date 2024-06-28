import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ApiHelper } from '../apiFunctions/apiHelper'
import { Link } from 'react-router-dom';

//state
const AddMovieForm = (props) => {
    const {setMovies} = props;
    const [formState, setFormState] = useState({
        title: '',
        director: '',
        genre: '',
        metascore: '',
        description: ''
    })

    //add route
    const { push } = useHistory();

   
    //handlechange
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    //handlesubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiHelper.postMovie(
                formState.title, 
                formState.director, 
                formState.metascore, 
                formState.genre, 
                formState.description);
                setMovies(response)
            push('/movies');
        } catch (error) {
            console.error('There was an error adding the movie!', error);
        }
    };
// ekleme ekibi Arkadaşlar route tanımlı değil, movies/add yok route ta ekleyiniz.... ???? 
    // return & form
    const { title, director, genre, metascore, description } = formState;
    return (
        <>
        <div className="bg-white rounded-md shadow flex-1">
            <form onSubmit={handleSubmit}>
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
                    <Link to={`/movies`} className="myButton bg-zinc-500">
                        Vazgeç
                    </Link>
                    <button type="submit" className="myButton bg-green-700 hover:bg-green-600">
                        Ekle
                    </button>
                </div>
            </form>
            </div>
        </>
    );

};
export default AddMovieForm;