import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBook from './SearchBook';

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading:[],
      wantToRead:[],
      read:[]
    }
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
        books.map((book) => {
          return this.assignBookToShelf(book);
        })
      })
  }

  assignBookToShelf(book){
    const shelves = this.state.shelves;
    shelves[book.shelf].push(book);
    this.setState(() =>({
      shelves
    }))
  }

  addToShelf(book, shelf){
    const fromShelf = book.shelf;
    const currentShelves = this.state.shelves;
    BooksAPI.update(book, shelf).then((shelves) =>{
      if(fromShelf === shelf){
        console.log("From and To shelves are same.");
        return;
      }

      if(fromShelf){
        const fromShelfBooks = currentShelves[fromShelf].filter((shelfBook) => {
          return book.id !== shelfBook.id;
        })
        currentShelves[fromShelf] = fromShelfBooks;
      }
      currentShelves[shelf].push(book);
      this.setState(()=>({
        currentShelves
      }))
    }).catch((err) => {
      alert("Failed to update book to shelf. API error:" + err)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
            <ListBooks
              shelves={this.state.shelves}
              onAddToShelf={(book, shelf)=>{this.addToShelf(book, shelf)}}/>
        )} />
        <Route path='/search'
          render={() => (
            <SearchBook
              shelves={this.state.shelves}
              onAddToShelf={(book, shelf)=>{this.addToShelf(book, shelf)}}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
