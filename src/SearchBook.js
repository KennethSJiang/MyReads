import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom';
import Book from './Book';

export default class SearchBook extends Component{
  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }))

    if( query === ''){
      this.setState(() => ({
        searchedBooks: []
      }))
    }else{
      BooksAPI.search(query).then((data) => {
        this.setState(() => ({
          searchedBooks: data
        }))
      })
    }
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render() {
    const { query, searchedBooks } = this.state;
    return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to='/' >
              Close
            </Link>

            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(event)=> this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {
               searchedBooks.length > 0 && searchedBooks.map((book) => (
                <li key={book.id}>
                  <Book book={book} shelves={this.props.shelves} onAddToShelf={this.props.onAddToShelf}/>
                </li>
              ))
            }
            </ol>
          </div>
        </div>
    )
  }
}
