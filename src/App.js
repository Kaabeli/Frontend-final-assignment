import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import './App.css';
import TrainingList from './components/TrainingList';
import CustomerList from './components/CustomerList';
import { Nav, Container } from 'react-bootstrap';
import Calendar from './components/Calendar';

class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <i className="fas fa-dumbbell"></i>
          Personal Trainer Database Systems
      </header>
      <Container>
        <BrowserRouter>
          <Nav variant="tabs" defaultActiveKey="/CustomerList">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/CustomerList">Customer List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/TrainingList">Training List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/Calendar">Calendar</Nav.Link>
            </Nav.Item>
          </Nav>
          <Route exact path="/" />
          <Route path="/TrainingList" component={TrainingList} />
          <Route path="/CustomerList" component={CustomerList} />
          <Route path="/Calendar" component={Calendar}/>

        </BrowserRouter>
        </Container>
      </div>
    );
  }
}

export default App;
