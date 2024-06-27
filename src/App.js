import React, { useEffect, useState } from "react";
import { ApiHelper } from "./apiFunctions/apiHelper";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';
//edit movie form
import EditMovieForm from "./components/EditMovieForm";

//add movies component
import AddMovieForm from './components/AddMovieForm'


const App = (props) => {
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const response = await ApiHelper.getMovies();
            setMovies(response);
        }
        getMovies()
    }, []);

    const deleteMovie = (id) => {
    }

    const addToFavorites = (movie) => {

    }

    return (
        <div>
            <nav className="bg-zinc-800 px-6 py-3">
                <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
            </nav>

            <div className="max-w-4xl mx-auto px-3 pb-4">
                <MovieHeader />
                <div className="flex flex-col sm:flex-row gap-4">
                    <FavoriteMovieList favoriteMovies={favoriteMovies} />

                    <Switch>

                        <Route path="/movies/edit/:id">
                            <EditMovieForm />
                        </Route>

                        <Route exact path="/movies/add">
                            <AddMovieForm />
                        </Route>

                        <Route path="/movies/:id">
                            <Movie />
                        </Route>

                        <Route path="/movies">
                            <MovieList movies={movies} />
                        </Route>

                        <Route path="/">
                            <Redirect to="/movies" />
                        </Route>

                    </Switch>
                </div>
            </div>
        </div>
    );
};


export default App;

