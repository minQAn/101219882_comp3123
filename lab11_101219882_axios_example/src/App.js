import React from 'react';
import './App.css';
import PersonList from './PersonList';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header style={{backgroundColor:"yellowGreen", padding:5, textAlign:"center"}}>
        <h3>User List</h3>
      </header>
      <PersonList />
    </div>
  );
}

export default App;
