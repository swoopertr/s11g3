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

    const addToFavories = (movie) => {
        const newFavorites = [...favoriteMovies, movie];
        setFavoriteMovies(newFavorites);
    }

    const removeFromFavorites = (id) => {

        const newFavorites = favoriteMovies.filter(movie => movie.id !== id);
        setFavoriteMovies(newFavorites);
    }

    const changeTheme = () => {
        const getHtml = document.getElementsByTagName("html")[0];
        if (getHtml.classList.contains("dark")) {
            getHtml.classList.remove("dark");
        } else {
            getHtml.classList.add("dark");
        }
    }

    return (
        <div>
            <nav className="bg-zinc-800 px-6 py-3">
                <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
                <button onClick={changeTheme} type="button" id="headlessui-listbox-button-:R2lkcr6:" aria-haspopup="listbox" aria-expanded="false" data-headlessui-state="" aria-labelledby="headlessui-label-:R1lkcr6: headlessui-listbox-button-:R2lkcr6:"><span class="dark:hidden"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" class="fill-sky-400/20 stroke-sky-500"></path><path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" class="stroke-sky-500"></path></svg></span><span class="hidden dark:inline"><svg viewBox="0 0 24 24" fill="none" class="w-6 h-6"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" class="fill-sky-400/20"></path><path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" class="fill-sky-500"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z" class="fill-sky-500"></path></svg></span></button>
            </nav>
            

            <div className="max-w-4xl mx-auto px-3 pb-4">
                <MovieHeader />
                <div className="flex flex-col sm:flex-row gap-4">
                    <FavoriteMovieList favoriteMovies={favoriteMovies} />

                    <Switch>

                        <Route path="/movies/edit/:id">
                            <EditMovieForm setMovies={setMovies} />
                        </Route>

                        <Route exact path="/movies/add">
                            <AddMovieForm setMovies={setMovies} />
                        </Route>

                        <Route path="/movies/:id">
                            <Movie setMovies={setMovies} addToFavories={addToFavories} removeFromFavorites={removeFromFavorites} favoriteMovies={favoriteMovies} />
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

