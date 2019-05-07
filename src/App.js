import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import TrainingList from './components/TrainingList';
import CustomerList from './components/CustomerList';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
      Personal Trainer Database Systems
      <i className="fas fa-dumbbell"></i>
      </header>
        <BrowserRouter>
          <div className="container">
            <nav className="navbar navbar-light bg-light">
            <Link to="/TrainingList">Training List</Link>
            <Link to="/CustomerList">Customer List</Link>
            </nav>
            <Route exact path="/" />
            <Route path="/TrainingList" component={TrainingList} />
            <Route path="/CustomerList" component={CustomerList} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
