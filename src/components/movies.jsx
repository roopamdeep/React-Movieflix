import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../components/common/like";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from '../components/common/listGroup'
import { getGenres } from "../services/fakeGenreService";
class Movies extends Component {
  state = { movies: [], pageSize: 4, currentPage: 1 ,genres:[]};
  componentDidMount(){
    const genres = [{name:'All Genres'},...getGenres()]
    this.setState({movies:getMovies(),genres})
   }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };
  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
    // console.log(movie);
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = genre =>{
    this.setState({selectedGenre:genre, currentPage:1})

  }
  
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies,selectedGenre } = this.state;
    if (count === 0) return <p>There are no movies in the database</p>;
    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);
    // console.log(allMovies);
    // console.log(movies);

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup 
          items={this.state.genres}  
          selectedItem={this.state.selectedGenre}
           onItemSelect={this.handleGenreSelect}/>
          </div>
          <div className='col'>
          <p>Showing {filtered.length} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLiked(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
          
        </div>
       
      </div>
    );
  }
}

export default Movies;
