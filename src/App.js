import React, {Component} from 'react';
import logo from './logo.svg';
// import CitySearch from "./Components/CitySearch/CitySearch"
import Zipcode from "./Components/Zipcode/Zipcode";
import './App.css';
import CitySearch from './Components/CitySearch/CitySearch';

class App extends Component {
  render () {
    return (
        <div className="App">
          <header className="App-header">
            <div><h2>Zip Code and City Search</h2></div>
            
          </header>
          <Zipcode/>
          <CitySearch/>
        </div>
      );  
  } 
}

export default App;
