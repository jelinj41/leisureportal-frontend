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
    async fetchUser() {
        let restURL = "/rest/users/current";
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
    async fetchAddress() {
        const restURL = "/rest/addresses/myAddresses";
        await fetch(restURL, {
            headers: {
                mode: 'no-cors',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            data.forEach(address => {
                if (!this.state.addresses.some(option => option.props.value === address.id)) {
                    this.setState(prevState => ({
                        addresses: prevState.addresses.concat(
                            <option key={address.id} value={address.id}>
                                {address.city} - {address.street} - {address.houseNumber} - {address.zipCode} - {address.country}
                            </option>
                        )
                    }));
                }
            });
            if (data[0]) {
                this.setState({ address_id: data[0].id });
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    async fetchCategory() {
        const restURL = "/rest/categories/";
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

    async createActivity(e) {
        e.preventDefault();
        const restURL = "/rest/activities/";
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
            }
            else {
                window.alert("Something went wrong.")
            }
        })
    }
    handleChangeName(value) {
        this.setState({ name: value });
    }
    handleChangeDescription(value) {
        this.setState({ description: value });
    }
    handleChangeAddress(value) {
        this.setState({ address_id: value });
    }
    handleChangeCategory(value) {
        this.setState({ category_id: value });
    }
    handleChangeFromDate(value) {
        this.setState({ fromDate: value });
    }
    handleChangeToDate(value) {
        this.setState({ toDate: value });
    }
    handleChangeMinAge(value) {
        this.setState({ min_age: value });
    }
    handleChangeMaxAge(value) {
        this.setState({ max_age: value });
    }
    handleChangePrice(value) {
        this.setState({ price: value });
    }
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
                <form className='activity-form' onSubmit={e => this.createActivity(e)}>
                    <div className="name">
                        <p>Názov : </p>
                        <input type="text" value={this.state.name}
                            className="name-input"
                            onChange={event => this.handleChangeName(event.target.value)} required />
                    </div>
                    <div className="description">
                        <p>Popis : </p>
                        <input type="text" value={this.state.description}
                            className="description-input"
                            onChange={event => this.handleChangeDescription(event.target.value)} required />
                    </div>
                    <div className="address">
                        <p>Adresa : </p>
                        <select name="address-select" className="address-select"
                            onChange={event => this.handleChangeAddress(event.target.value)}>
                            {this.state.addresses}
                        </select>
                    </div>
                    <div className="category">
                        <p>Kategória : </p>
                        <select name="category-select" className="category-select"
                            onChange={event => this.handleChangeCategory(event.target.value)}>
                            {this.state.categories}
                        </select>
                    </div>
                    <div className="fromDate">
                        <p>Od : </p>
                        <input type="date" value={this.state.fromDate}
                            className="fromDate-input"
                            onChange={event => this.handleChangeFromDate(event.target.value)} required />
                    </div>
                    <div className="toDate">
                        <p>Do: </p>
                        <input type="date" value={this.state.toDate}
                            className="toDate-input"
                            onChange={event => this.handleChangeToDate(event.target.value)} required />
                    </div>
                    <div className="capacity">
                        <p>Capacity : </p>
                        <input type="number" value={this.state.capacity}
                            className="capacity-input"
                            onChange={event => this.handleChangeCapacity(event.target.value)} required />
                    </div>
                    <div className="min_age">
                        <p>Minimálny vek : </p>
                        <input type="number" value={this.state.min_age}
                            className="min_age-input"
                            onChange={event => this.handleChangeMinAge(event.target.value)} required />
                    </div>
                    <div className="max_age">
                        <p>Maximálny vek : </p>
                        <input type="number" value={this.state.max_age}
                            className="max_age-input"
                            onChange={event => this.handleChangeMaxAge(event.target.value)} required />
                    </div>
                    <div className="price">
                        <p>Poplatok v € : </p>
                        <input type="number" value={this.state.price}
                            className="price-input"
                            onChange={event => this.handleChangePrice(event.target.value)} required />
                    </div>
                    <button type="submit" className="create-button" >Vytvoriť</button>
                </form>
            </div>
        )
    }
}

export default Activity;