import React, { Component } from "react";
import '../styles/Address.css';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      street: "",
      houseNumber: "",
      zipCode: "",
      country: ""
    };
    this.address = this.address.bind(this);
  }

  // Create an address
  async address(e) {
    e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL;
    const restURL = API_URL + "/rest/addresses/";

    // Add form validation
    if (
      this.state.city.length > 100 ||
      this.state.street.length > 100 ||
      this.state.houseNumber < 0 ||
      this.state.zipCode.length !== 5 ||
      this.state.country.length > 100
    ) {
      window.alert("Invalid form data.");
      return;
    }

      // Send a POST request to create the address
    await fetch(restURL, {
      method: "POST",
      credentials: 'include',
      headers: {
        mode: 'no-cors',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        city: this.state.city,
        street: this.state.street,
        houseNumber: this.state.houseNumber,
        zipCode: this.state.zipCode,
        country: this.state.country,
      })
    }).then(response => {
      if (response.status === 201) {
        window.alert("Address added.");
        window.location.reload();
      } else {
        window.alert("Something went wrong.");
      }
    })
  }
    // Event handler for city input change
  handleChangeCity(value) {
    this.setState({ city: value });
  }
    // Event handler for street input change
  handleChangeStreet(value) {
    this.setState({ street: value });
  }
    // Event handler for house number input change
  handleChangeHouseNumber(value) {
    this.setState({ houseNumber: value });
  }
    // Event handler for zipCode input change
  handleChangeZipCode(value) {
    this.setState({ zipCode: value });
  }
    // Event handler for country input change
  handleChangeCountry(value) {
    this.setState({ country: value });
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="Address">
        <h2>Pripravenie adresy pre aktivity</h2>
        <form onSubmit={e => this.address(e)}>
          <div className="city">
            <p>Mesto : </p>
            <input
              type="text"
              value={this.state.city}
              className="city-input"
              onChange={event => this.handleChangeCity(event.target.value)}
              maxLength={100} // Set max length to 100 characters
              required
            />
          </div>
          <div className="street">
            <p>Ulica : </p>
            <input
              type="text"
              value={this.state.street}
              className="street-input"
              onChange={event => this.handleChangeStreet(event.target.value)}
              maxLength={100} // Set max length to 100 characters
              required
            />
          </div>
          <div className="houseNumber">
            <p>Popisné číslo : </p>
            <input
              type="number"
              value={this.state.houseNumber}
              className="houseNumber-input"
              onChange={event => this.handleChangeHouseNumber(event.target.value)}
              min={0} // Set minimum value to 0 (negative numbers not allowed)
              required
            />
          </div>
          <div className="zipCode">
            <p>PSČ : </p>
            <input
              type="text"
              value={this.state.zipCode}
              className="zipCode-input"
              onChange={event => this.handleChangeZipCode(event.target.value)}
              pattern="[0-9]{5}" // Set pattern to strictly 5 digits
              required
            />
          </div>
          <div className="country">
            <p>Krajina : </p>
            <input
              type="text"
              value={this.state.country}
              className="country-input"
              onChange={event => this.handleChangeCountry(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="create-button" >Vytvoriť</button>
        </form>
      </div>
    );
  }
}

export default Address;
