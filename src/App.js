import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=2429055a'; 

const App = () => { 
   // useState is a hook that allows you to add state to a functional component
   // useEffect is a hook that allows you to perform side effects in your components
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

//   searchMovies is an asynchronous function that fetches movie data from the API based on the provided title
//   The function uses the fetch API to make a GET request to the OMDB API with the specified title
  const searchMovies = async (title) => {
   // API_URL is a constant that holds the base URL for the OMDB API
   // The API key is included in the URL to authenticate the request
    const response  = await fetch(`${API_URL}&s=${title}`);
   //  The response is then converted to JSON format
   // The data is then stored in the movies state variable using the setMovies function
    const data = await response.json(); 
    setMovies(data.Search);

  }
   // useEffect is used to perform side effects in functional components
   // It takes a function as its first argument and an array of dependencies as its second argument
  useEffect(() => {
        searchMovies('Spiderman');
  }, []); 
// The empty array as the second argument means that this effect will only run once when the component mounts
// The searchMovies function is called with the initial search term 'Spiderman' to fetch and display the movies when the component mounts
  return (
    <div className="app">
       <h1>Tewos Movies</h1>
       <div className="search">
            <input 
                  placeholder="Search For Movies"
                  value={searchTerm}
                  // The value of the input field is controlled by the searchTerm state variable
                  // The onChange event handler updates the searchTerm state variable with the current value of the input field
                  onChange={(e) => setSearchTerm(e.target.value)}  
            />
            <img 
                  src={SearchIcon}
                  alt="Search"
                  onClick={() => searchMovies(searchTerm)}
            />
       </div>
          {
             movies?.length > 0
             ?(
              <div className="container">
                 {movies.map((movie) => (
                  <MovieCard movie={movie} />
                 ))}
              </div>
             ) : (
                 
              <div className="empty">
                 <h2>No movies found</h2>
              </div>
             )
          }
    </div>
  )
} 

export default App
