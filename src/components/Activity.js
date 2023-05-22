import '../styles/Activity.css';
import React, { Component } from "react";

class Activity extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            address_id: "",
            category_id: "",
            fromDate: "",
            toDate: "",
            capacity: "",
            price: "",
            min_age: "",
            max_age: "",
            fetchedCategories: [],
            categories: [],
            fetchedAddresses: [],
            addresses: [],
            profiledata: [],
        }
        this.createActivity = this.createActivity.bind(this);
    }

    // Fetch the current user's profile data
    async fetchUser() {
        const API_URL = process.env.REACT_APP_API_URL
        let restURL = API_URL + "/rest/users/current";
        await fetch(restURL, {
            method: "GET",
            credentials: 'include',
            headers: {
                mode: 'no-cors',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({ profiledata: data });
            })
    }

    // Fetch addresses for the select dropdown
    async fetchAddress() {
        const API_URL = process.env.REACT_APP_API_URL;
        const restURL = API_URL + "/rest/addresses/myAddresses";
        await fetch(restURL, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'mode': 'cors',
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            const addresses = data.map(address => (
                <option key={address.id} value={address.id}>
                    {address.city} - {address.street} - {address.houseNumber} - {address.zipCode} - {address.country}
                </option>
            ));
            this.setState({ addresses });
            if (data[0]) {
                this.setState({ address_id: data[0].id });
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    // Fetch categories for the select dropdown
    async fetchCategory() {
        const API_URL = process.env.REACT_APP_API_URL
        const restURL = API_URL + "/rest/categories/";
        await fetch(restURL, {
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          return response.json()
        }).then(data => {
      
          const categories = data.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ));
      
          this.setState({ categories });
      
          if (data[0]) {
            this.setState({ category_id: data[0].id });
          }
        })
      }

    // Create an activity
    async createActivity(e) {
        e.preventDefault();
        const API_URL = process.env.REACT_APP_API_URL
        const restURL = API_URL + "/rest/activities/";
        
        const minAge = parseInt(this.state.min_age);
         const maxAge = parseInt(this.state.max_age);

        if (
            this.state.name.length > 100 ||
            this.state.description.length > 1500 ||
            this.state.toDate < this.state.fromDate ||
            this.state.capacity < 0 ||
            this.state.capacity > 100000 ||
            this.state.price < 0 ||
            this.state.price > 10000 ||
            minAge < 0 ||
            minAge > 150 ||
            maxAge < 0 ||
            maxAge > 150 ||
            minAge > maxAge
          ) {
            window.alert("Invalid form data.");
            return;
          }

        // Send a POST request to create the activity
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                capacity: this.state.capacity,
                price: this.state.price,
                min_age: this.state.min_age,
                max_age: this.state.max_age,
                author: {
                    id: this.state.profiledata.id
                },
                address: {
                    id: this.state.address_id
                },
                category: {
                    id: this.state.category_id
                }
            })
        }).then(response => {
            if (response.status === 201) {
                window.alert("Activity created");
                window.location.reload();
            }
            else {
                window.alert("Something went wrong.")
            }
        })
    }

    // Event handler for name input change
    handleChangeName(value) {
        this.setState({ name: value });
    }
    // Event handler for description input change    
    handleChangeDescription(value) {
        this.setState({ description: value });
    }
    // Event handler for address input change
    handleChangeAddress(value) {
        this.setState({ address_id: value });
    }
    // Event handler for category input change
    handleChangeCategory(value) {
        this.setState({ category_id: value });
    }
    // Event handler for fromDate input change
    handleChangeFromDate(value) {
        this.setState({ fromDate: value });
    }
    // Event handler for toDate input change
    handleChangeToDate(value) {
        this.setState({ toDate: value });
    }
    // Event handler for min_age input change
    handleChangeMinAge(value) {
        this.setState({ min_age: value });
    }
    // Event handler for max_age input change
    handleChangeMaxAge(value) {
        this.setState({ max_age: value });
    }
    // Event handler for price input change
    handleChangePrice(value) {
        this.setState({ price: value });
    }
    // Event handler for capacity input change
    handleChangeCapacity(value) {
        this.setState({ capacity: value });
    }
    
    componentDidMount() {
        this.fetchAddress();
        this.fetchCategory();
        this.fetchUser();
    }

    render() {
        return (
          <div className="Activity">
            <h2>Vytvorenie aktivity</h2>
            <form className="activity-form" onSubmit={e => this.createActivity(e)}>
              <div className="name">
                <p>Názov : </p>
                <input
                  type="text"
                  value={this.state.name}
                  className="name-input"
                  onChange={event => this.handleChangeName(event.target.value)}
                  maxLength={100} // Set max length to 100 characters
                  required
                />
              </div>
              <div className="description">
                <p>Popis : </p>
                <input
                  type="text"
                  value={this.state.description}
                  className="description-input"
                  onChange={event => this.handleChangeDescription(event.target.value)}
                  maxLength={1500} // Set max length to 1500 characters
                  required
                />
              </div>
              <div className="address">
                <p>Adresa : </p>
                <select
                  name="address-select"
                  className="address-select"
                  onChange={event => this.handleChangeAddress(event.target.value)}
                  required
                >
                  {this.state.addresses}
                </select>
              </div>
              <div className="category">
                <p>Kategória : </p>
                <select
                  name="category-select"
                  className="category-select"
                  onChange={event => this.handleChangeCategory(event.target.value)}
                  required
                >
                  {this.state.categories}
                </select>
              </div>
              <div className="fromDate">
                <p>Od : </p>
                <input
                  type="date"
                  value={this.state.fromDate}
                  className="fromDate-input"
                  onChange={event => this.handleChangeFromDate(event.target.value)}
                  required
                />
              </div>
              <div className="toDate">
                <p>Do: </p>
                <input
                  type="date"
                  value={this.state.toDate}
                  className="toDate-input"
                  onChange={event => this.handleChangeToDate(event.target.value)}
                  required
                />
              </div>
              <div className="capacity">
                <p>Capacity : </p>
                <input
                  type="number"
                  value={this.state.capacity}
                  className="capacity-input"
                  onChange={event => this.handleChangeCapacity(event.target.value)}
                  min={0} // Set minimum value to 0 (negative numbers not allowed)
                  max={100000} // Set maximum value to 100000
                  required
                />
              </div>
              <div className="min_age">
                <p>Minimálny vek : </p>
                <input
                  type="number"
                  value={this.state.min_age}
                  className="min_age-input"
                  onChange={event => this.handleChangeMinAge(event.target.value)}
                  min={0} // Set minimum value to 0 (negative numbers not allowed)
                  max={150} // Set maximum value to 150
                  required
                />
              </div>
              <div className="max_age">
                <p>Maximálny vek : </p>
                <input
                  type="number"
                  value={this.state.max_age}
                  className="max_age-input"
                  onChange={event => this.handleChangeMaxAge(event.target.value)}
                  min={0} // Set minimum value to .
                  max={150} // Set maximum value to 150
                  required
                />
            </div>
                <div className="price">
                <p>Poplatok v € : </p>
                <input 
                    type="number" 
                    value={this.state.price}
                    className="price-input"
                    onChange={event => this.handleChangePrice(event.target.value)} 
                    min={0} // Set minimum value to .
                    max={10000} // Set maximum value to 150
                    required
                />
                </div>
                <button type="submit" className="create-button" >Vytvoriť</button>
                </form>
            </div>
        )
    }
}

export default Activity;