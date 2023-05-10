import '../styles/Profile.css';
import React, { Component } from "react";

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileData: [],
            readOnly: true,
            buttonText: "Upraviť",
            email: "",
            firstName: "",
            lastName: "",
            age: "",
        }
        this.enableEdit = this.enableEdit.bind(this);
    }

    async fetchData() {
        const restURL = "/rest/users/current";
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
                this.setState({
                    profileData: data,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                });
            })
    }

    
    enableEdit() {
        if (this.state.readOnly) {
            this.setState({ readOnly: false });
            this.setState({ buttonText: "Uložiť" });
        } else {
            this.saveData();
            this.setState({ readOnly: true });
            this.setState({ buttonText: "Upraviť" });
        }
    }

    async saveData() {
        const restURL = "/rest/users/" + this.state.profileData.id;
        await fetch(restURL, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.profileData.id,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                age: this.state.age,
            })
        }).then(response => {
            return response.json()
        })
    }

    async Logout() {
        const restURL = "/logout";
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        })
        window.location.assign("/");
    }

    componentDidMount() {
        this.fetchData();
    }

    handleChangeEmail(value) {
        this.setState({ email: value });
    }
    handleChangeFirstName(value) {
        this.setState({ firstName: value });
    }
    handleChangeLastName(value) {
        this.setState({ lastName: value });
    }
    handleChangeAge(value) {
        this.setState({ age: value });
    }
    handleChangePassword(value) {
        this.setState({ password: value });
    }
    render() {
        return (
            <div className="Profile">
                <h2>Môj profil</h2>
                <div className="firstName">
                    <p>Meno : </p>
                    <input type="text" readOnly={this.state.readOnly} value={this.state.firstName} onChange={event => this.handleChangeFirstName(event.target.value)} className="firstName-input" />
                </div>
                <div className="lastName">
                    <p>Priezvisko : </p>
                    <input type="text" readOnly={this.state.readOnly} value={this.state.lastName} onChange={event => this.handleChangeLastName(event.target.value)} className="lastName-input" />
                </div>
                <div className="email">
                    <p>Email : </p>
                    <input type="text" readOnly={this.state.readOnly} value={this.state.email} onChange={event => this.handleChangeEmail(event.target.value)} className="email-input" />
                </div>
                <div className="age">
                    <p>Vek : </p>
                    <input type="number" readOnly={this.state.readOnly} value={this.state.age} onChange={event => this.handleChangeAge(event.target.value)} className="age-input" />
                </div>
                <button className="edit" onClick={this.enableEdit}>{this.state.buttonText}</button>
                <button className="logout" onClick={this.Logout}>Odhlásiť sa</button>
            </div>
        )
    }
}

export default ProfilePage;