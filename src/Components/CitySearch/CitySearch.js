import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import "./CitySearch.css"

class CitySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            requestType: "city",
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
        this.setState({request: event.target.value, requestType: "city"});
        this.fetchZipCode();
    }

    onEnter = event => {
        if(event.key === "Enter") {
            event.preventDefault();
            this.handleSubmit(event);
        }
    }

    componentDidMount() {
        this.fetchZipCode();
    }

    async fetchZipCode() {
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
    render() {
        const data = this.state.data;
        return (
            <div className = "City">
            <div className = "Information">
                <TextField
                    label="Enter City"
                    placeholder="SPRINGFIELD"
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
                </div>
        );
    }
}

export default CitySearch;