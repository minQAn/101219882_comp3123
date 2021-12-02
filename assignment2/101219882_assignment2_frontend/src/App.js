import React from 'react';
import './App.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import ViewEmployeeDetails from './components/ViewEmployeeDetails';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route element={<EmployeeList />} path='/' />
          <Route element={<EmployeeList />} path='/api/v1/employees' />
          <Route element={<AddEmployee />} path='/add-employee/_add' />
          <Route element={<AddEmployee />} path="add-employee/:id" /> {/* update */}
          <Route element={<ViewEmployeeDetails />} path="view-employee/:id" />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;

