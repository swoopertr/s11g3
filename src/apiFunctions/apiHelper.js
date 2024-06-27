import { apiURL } from "../constants/apiURL";
//apiURL = "http://localhost:9000/api"

export const ApiHelper = {

    getMovies: async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        redirect: 'follow'
      };
  
      try {
        const response = await fetch(`${apiURL}/movies`, requestOptions);
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`The fetch process failed. ${error.message}`);
      }
    },
  
    getMovieById: async (id) => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        redirect: 'follow'
      };
  
      try {
        const response = await fetch(`${apiURL}/movies/${id}`, requestOptions);
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`The fetch process failed. ${error.message}`);
      }
    },
  
    postMovie: async (title, director, metascore, genre, description) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "id": Date.now().valueOf(),
          "title": title,
          "director": director,
          "metascore": metascore,
          "genre": genre,
          "description": description,

        }),
        redirect: 'follow'
      };
  
      try {
        const response = await fetch(`${apiURL}/movies`, requestOptions);
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`The fetch process failed. ${error.message}`);
      }
    },
  
    putMovies: async (id, title, director, metascore, genre, description) => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
        body: JSON.stringify({
            "title": title,
            "director": director,
            "metascore": metascore,
            "genre": genre,
            "description": description,
  
          }),
        redirect: 'follow'
      };
  
      try {
        const response = await fetch(`${apiURL}/movies/${id}`, requestOptions);
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`The fetch process failed. ${error.message}`);
      }
    },
  
    deleteMovie: async (id) => {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
        redirect: 'follow'
      };
  
      try {
        const response = await fetch(`${apiURL}/movies/${id}`, requestOptions);
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`The fetch process failed. ${error.message}`);
      }
    }
  };
  