import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom';

export default class SearchBook extends Component{
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }))

    if( query === ''){
      this.setState(() => ({
        books: []
      }))
    }else{
      BooksAPI.search(query).then((data) => {
        this.setState(() => ({
          books: data
        }))
      })
    }
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render() {
    const { query, books } = this.state;
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
              value={this.state.query}
              onChange={(event)=> this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {
               books.length > 0 && books.map((book) => (
                <li key={book.id}>
                  <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks['thumbnail']})` }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
                </li>
              ))
            }
            </ol>
          </div>
        </div>
    )
  }
}
