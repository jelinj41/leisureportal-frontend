import '../styles/SingUp.css';
import React, { Component } from "react";

class SignUpUser extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            age: 0,
            firstName: '',
            lastName: '',
            type: 'user'
        }
        this.sendSignUp = this.sendSignUp.bind(this);
    }

    componentDidMount() {
    }
    validateInputs() {
        //todo
    }
    async sendSignUp(e) {
        e.preventDefault();
        this.validateInputs();
        const API_URL = process.env.REACT_APP_API_URL
        const restURL = API_URL + "/rest/users";
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                age: this.state.age,
                email: this.state.email,
                password: this.state.password,
                type: this.state.type
            })
        }).then(response => {
            if (response.status === 201) {
                window.alert("User registered");
            }
        })
    }

    handleChangePass(value) {
        this.setState({ password: value });
    }
    handleChangeFirstName(value) {
        this.setState({ firstName: value });
    }
    handleChangeLastName(value) {
        this.setState({ lastName: value });
    }
    handleChangeEmail(value) {
        this.setState({ email: value });
    }
    handleChangeAge(value) {
        this.setState({ age: value });
    }
    handleChangeType(value) {
        this.setState({ type: value });
    }
    render() {
        return (
            <div className="SignUp">
                <h2>Registrácia</h2>
                <form onSubmit={e => this.sendSignUp(e)}>
                    <div className="firstName">
                        <p>Meno : </p>
                        <input type="text" placeholder='First name' value={this.state.firstName} className="firstName-input"
                            onChange={event => this.handleChangeFirstName(event.target.value)} autoFocus={true}  />
                    </div>
                    <div className="lastName">
                        <p>Priezvisko : </p>
                        <input type="text" placeholder='Last name' value={this.state.lastName} className="lastName-input"
                            onChange={event => this.handleChangeLastName(event.target.value)} required />
                    </div>
                    <div className="age">
                        <p>Vek : </p>
                        <input type="number" value={this.state.age} className="age-input"
                            onChange={event => this.handleChangeAge(event.target.value)} required />
                    </div>
                    <div className="email">
                        <p>Email : </p>
                        <input type="email" placeholder='email@mail.com' className="email-input"
                            onChange={event => this.handleChangeEmail(event.target.value)} required />
                    </div>
                    <div className="password">
                        <p>Heslo : </p>
                        <input type="password" value={this.state.password} className="password-input"
                            onChange={event => this.handleChangePass(event.target.value)} required />
                    </div>
                    <div className="type">
                        Typ používateľa :
                        <select name="type-select" className="type-select"
                            onChange={event => this.handleChangeType(event.target.value)}>
                            <option value="user">Záujemca</option>
                            <option value="organizer">Organizátor</option>
                        </select>
                    </div>
                    <button type='submit' className="SignUp-button">Registrovať</button>
                </form>
            </div>
        )
    }
}

export default SignUpUser;