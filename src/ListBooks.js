import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import Book from './Book';

export default class ListBooks extends Component{
  render(){
    const { currentlyReading, wantToRead, read } = this.props.shelves;
    return(
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      currentlyReading.map((book) => (
                        <li key={book.id}>
                          <Book book={book} shelves={this.props.shelves} onAddToShelf={this.props.onAddToShelf}/>
                        </li>
                      ))
                    }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {
                    wantToRead.map((book) => (
                      <li key={book.id}>
                        <Book book={book} shelves={this.props.shelves} onAddToShelf={this.props.onAddToShelf}/>
                      </li>
                    ))
                  }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {
                    read.map((book) => (
                      <li key={book.id}>
                        <Book book={book} shelves={this.props.shelves} onAddToShelf={this.props.onAddToShelf}/>
                      </li>
                    ))
                  }
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link
              to='/search' >
              Add a book
            </Link>
          </div>
        </div>
    )
  }
}
