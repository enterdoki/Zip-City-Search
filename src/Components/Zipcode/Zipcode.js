import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./Zipcode.css";
import axios from 'axios';

class Zipcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
      data: [{
          RecordNumber: "",
          Zipcode: "",
          ZipcodeType: "",
          City: "",
          State: "",
          LocationType: "",
          Lat: "",
          Long: "",
          Xaxis: "",
          Yaxis: "",
          Zaxis: "",
          WorldRegion: "",
          Country: "",
          LocationText: "",
          Location: "",
          Decomissioned: "",
          TaxReturnsFiled: "",
          EstimatedPopulation: "",
          TotalWages: "",
          Notes: ""
          
        }
      ],
      requestType: "zip",
      request: "",
      fetched: true
      
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    console.log(event.target.value)
    this.setState({request: event.target.value});
  } 

  handleSubmit = event => {
    event.preventDefault();
    this.setState({request: event.target.value, requestType: "zip"});
    this.fetchLocationData();
  }
  
  componentDidMount() {
      this.fetchLocationData();
  }

  onEnter = event => {
    if(event.key === "Enter") {
        event.preventDefault();
        this.handleSubmit(event);
    }
  }

  async fetchLocationData() {
    if (this.state.requestType) {
      try {
        let url = 'http://ctp-zip-api.herokuapp.com/' + this.state.requestType + '/' + this.state.request;
        let { data } = await axios.get(url);
        console.log(data);
        this.setState({
            fetched: true,
            data: data});
      } catch (err) {
        console.log(err);
        this.setState({
            fetched:false
        })
        }
    }
  }

  render () {
      const data = this.state.data;
      return (
          <div className = "ZipCode">
            <div className = "Information">
                <TextField
                    label="Enter Zipcode"
                    placeholder="10065"
                    className="TextField"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange}
                    onKeyDown={this.onEnter}
                    
                />
            </div>
            
                <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    onClick={this.handleSubmit}
                >
                    Submit
                </Button>
            
           {this.state.fetched  ?(  
             <div>
                <ul>
                {data.map(obj => {
                    return <li><ZipData RecordNumber={obj.RecordNumber} 
                                    City={obj.City}
                                    State={obj.State}
                                    Lat={obj.Lat}
                                    Long={obj.Long}
                                    EstimatedPopulation={obj.EstimatedPopulation}
                                    TotalWages={obj.TotalWages} /></li>
                })}
                </ul>
            </div>
           ):(
        
         <div></div>)}
        </div>
        );
    }
}

const ZipData = props => {
  return (
      <div className ="Section">
      <u><strong>{props.City}</strong></u><br></br>
      State: {props.State}<br></br>
      Location: ({props.Lat}, {props.Long})<br></br>
      Population (estimated): {props.EstimatedPopulation}<br></br>
      Total Wages: {props.TotalWages}<br></br>
    </div>
  );
}

export default Zipcode;