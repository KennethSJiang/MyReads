import React, { Component } from 'react';
import './App.css'

export default class Book extends Component {
  state = {
    value: ""
  }

  handleChange = (event)=> {
    event.preventDefault(); //do not show query params in URL
    this.setState({value: event.target.value});
    // alert("You'll never have me!" + JSON.stringify(this.props.book));
    if(this.props.onAddToShelf) {
      this.props.onAddToShelf(this.props.book, event.target.value);
    }
  }

  render(){
    const{ book, shelves } = this.props;
    Object.keys(shelves).map((shelf) => {
      return shelves[shelf].filter(shelfBook => book.id === shelfBook.id).map((shelfBook) => {
          book.shelf = shelf;
          return book;
      })
    })

    return(
      <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks['thumbnail']})` }}></div>
        <div className="book-shelf-changer">
        <form>
          <select value={(book.shelf || "none")} onChange={this.handleChange}>
            <option value="moveTo" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </form>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
    )
  }
}
