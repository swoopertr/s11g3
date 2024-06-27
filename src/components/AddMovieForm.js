import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ApiHelper } from '../apiFunctions/apiHelper'

//state
const AddMovieForm = ({}) => {
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
            push('/movies');
        } catch (error) {
            console.error('There was an error adding the movie!', error);
        }
    };
// ekleme ekibi Arkadaşlar route tanımlı değil, movies/add yok route ta ekleyiniz.... ???? 
    // return & form
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title </label>
                <input name="title" value={formState.title} onChange={handleChange} />

                <label>Director </label>
                <input name="director" value={formState.director} onChange={handleChange} />

                <label>Genre </label>
                <input name="genre" value={formState.genre} onChange={handleChange} />

                <label>Metascore </label>
                <input name="metascore" value={formState.metascore} onChange={handleChange} />

                <label>Description </label>
                <input name="description" value={formState.description} onChange={handleChange} />
                <div className="myButton bg-green-700 hover:bg-green-600">
                    <button type='submit'> Add Movie </button>
                </div>
            </form>
        </>
    );

};
export default AddMovieForm;