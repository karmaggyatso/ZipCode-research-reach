import React, { Component, useCallback } from 'react';
import './App.css';

function City(props) {
  const {city, state, latitude, longitude, population, totalWages, isEmpty} = props;
  // console.log(isEmpty);
  return (
      <div>
        {isEmpty? 
          <div className = "container align-center card text-left mt-2" style = {{width: "26rem"}}>
          <h4 className = "card-title p-3">{city}, {state}</h4>
          <ul className = "">
            <li>State: {state}</li>
            <li>Location: ({latitude}, {longitude})</li>
            <li>Population (estimated): {population}</li>
            <li>Total Wages: {totalWages}</li>
          </ul>
        </div>
        : <div>
            <p>{props.message}</p>
          </div>
      }
      
    </div>
    );
    
}

function ZipSearchField(props) {
  const {zipChange, userInputZip} = props;
  
  return (<div>
     <form>
            <label htmlFor = "search-input">Zip Code:</label>
            <input type = "text" 
              value = {userInputZip}
              placeholder = "Try 10016"
              onChange = {zipChange}
              />
          </form>
  </div>);
}
 function checksize(arr) {
  return arr.length;
}

class App extends Component {
  state = {
    item: [],
    message: 'No Results',
    zipCode: '',
    result: false,
  }

  // callApi (event) {
  //   event.preventDefault();
  //   console.log(this.state.zipCode);
  //   fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zipCode}`)
  //   .then(res => res.json())
  //   .then(response => {
  //     console.log(response);
  //     this.setState({
  //       item: response
  //     })
  //   })
  //   .catch (error =>{
  //     console.error(error);
  //   });
  // }

  
  

  handleOnChange = (event) => {
    const query = event.target.value;
    const xhr = new XMLHttpRequest();
    // console.log(xhr.status);
    
    this.setState({
      zipCode: event.target.value,
    });
    if (checksize(query) !== 5 || checksize(query) > 5 || checksize(query) < 5) {
      return (
        <div>
          <p>{this.state.message}</p>
        </div>
      )
    } 
    else if (xhr.status) {
      console.log(xhr.state)
      return (
        <div>
          <City isEmpty = {this.state.status} />
        </div>
      )
    }
    else {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${query}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          item: data,
          status: true
        })
      })
      .catch (error =>{
        console.error(error);
      });
      
    }
      
  }

  render() {
    const {zipCode, message} = this.state; // destructuring .. meaning we dont have to type this.state.zipCode everytime
    //console.log(zipCode, this.state.pupulation);

    const {items} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className = "container text-center m-3 ">
        {/* <form>
            <label htmlFor = "search-input">Zip Code:</label>
            <input type = "text" 
              name = "query"
              value = {zipCode}
              placeholder = "Try 10016"
              onChange = {(e)=> this.handleOnChange(e)}
              />
              <button onClick = {(e) => this.callApi(e)}>button</button>
          </form> */}
         

          <ZipSearchField zipChange = {(e) => this.handleOnChange(e)}/>

          <div>
            {
              this.state.item.map(city => (
                <City
                  key={city.RecordNumber} 
                  city = {city.City}
                  state = {city.State}
                  latitude= {city.Lat}
                  longitude = {city.Long}
                  population = {city.EstimatedPopulation}
                  totalWages = {city.TotalWages}
                  isEmpty = {this.state.status}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
