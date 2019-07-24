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
      search: true,
      
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    console.log(event.target.value)
    this.setState({request: event.target.value});
  } 

  handleSubmit = event => {
    console.log(event.target.id);
    event.preventDefault();
    this.setState({request: event.target.value, requestType: event.target.getAttribute('id') , search: false});
    this.fetchLocationData();
  }
  
  componentDidMount() {
      this.fetchLocationData();
  }

  async fetchLocationData() {
    if (this.state.requestType) {
      try {
        let url = 'http://ctp-zip-api.herokuapp.com/' + this.state.requestType + '/' + this.state.request;
        console.log(this.state.requestType);
        console.log(this.state.request);
        console.log(url);
        let { data } = await axios.get(url);
        console.log(data);
        this.setState({data: data});
      } catch (err) {
        console.log(err);
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
                />
            </div>
            
                <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    id="zip"
                    onClick={this.handleSubmit}
                >
                    Submit
                </Button>
                <div className = "Section">
           {!this.state.search  &&  
             <div>
                <ul>
                {data.map(obj => {
                    return <ZipData RecordNumber={obj.RecordNumber} 
                                    City={obj.City}
                                    State={obj.State}
                                    Lat={obj.Lat}
                                    Long={obj.Long}
                                    EstimatedPopulation={obj.EstimatedPopulation}
                                    TotalWages={obj.TotalWages} />
                })}
                </ul>
            </div>
        }
         </div> 
          </div>
          
          
         

         
      // 
  
  );
}
}

const ZipData = props => {
  return (
      <div className ="Section">
    <li key={props.RecordNumber}>
      <div>
        <strong>{props.City}</strong> <br />State: {props.State}, Location: ({props.Lat}, {props.Long}), Population (estimated): {props.EstimatedPopulation}, Total Wages: {props.TotalWages}
      </div>
    </li>
    </div>
  );
}

export default Zipcode;