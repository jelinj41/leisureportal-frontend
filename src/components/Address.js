import React, { Component } from "react";
import '../styles/Address.css';

class Address extends Component {


    constructor(props) {
        super(props);
        this.state = {
            city: "",
            street: "",
            houseNumber: 0,
            zipCode: "",
            country: ""
        }
        this.address = this.address.bind(this);
    }

    async address(e) {
        e.preventDefault();
        const restURL = "/rest/addresses/";
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
                window.location.assign("/");
            }
            else {
                window.alert("Something went wrong.");
                window.location.assign("/");
            }
        })
    }
    handleChangeCity(value) {
        this.setState({ city: value });
    }
    handleChangeStreet(value) {
        this.setState({ street: value });
    }
    handleChangeHouseNumber(value) {
        this.setState({ houseNumber: value });
    }
    handleChangeZipCode(value) {
        this.setState({ zipCode: value });
    }
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
                        <input type="text" value={this.state.city}
                            className="city-input"
                            onChange={event => this.handleChangeCity(event.target.value)} required />
                    </div>
                    <div className="street">
                        <p>Ulica : </p>
                        <input type="text" value={this.state.street}
                            className="street-input"
                            onChange={event => this.handleChangeStreet(event.target.value)} required />
                    </div>
                    <div className="houseNumber">
                        <p>Popisné číslo : </p>
                        <input type="number" value={this.state.houseNumber}
                            className="houseNumber-input"
                            onChange={event => this.handleChangeHouseNumber(event.target.value)} required />
                    </div>
                    <div className="zipCode">
                        <p>PSČ : </p>
                        <input type="text" value={this.state.zipCode}
                            className="zipCode-input"
                            onChange={event => this.handleChangeZipCode(event.target.value)} required />
                    </div>
                    <div className="country">
                        <p>Krajina : </p>
                        <input type="text" value={this.state.country}
                            className="country-input"
                            onChange={event => this.handleChangeCountry(event.target.value)} required />
                    </div>
                    <button type="submit" className="create-button" >Vytvoriť</button>
                </form>

            </div>
        )
    }
}

export default Address;