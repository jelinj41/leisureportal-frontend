import '../styles/Login.css';
import React, { Component } from "react";

class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.sendLogin = this.sendLogin.bind(this);
    }

    componentDidMount() {
    }

    async sendLogin(e) {
        e.preventDefault();
        const API_URL = process.env.REACT_APP_API_URL
        const restURL = API_URL + "/login_form?email="
            + this.state.email
            + "&password="
            + this.state.password;
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8080',
            }
        }).then(response => {
            if (response.status !== 202) {
                window.alert("Credentials dont match")
                window.location.reload(false);
            }
            else {
                window.location.assign("/");

            }
        })
    }

    handleChangePass(value) {
        this.setState({ password: value });
    }
    handleChangeEmail(value) {
        this.setState({ email: value });
    }
    render() {
        return (
            <div className="Login">
                <h2>Prihlásenie</h2>
                <form onSubmit={e => this.sendLogin(e)}>
                    <div className="email">
                        <p>Email : </p>
                        <input type="text" value={this.state.email} className="email-input" onChange={event => this.handleChangeEmail(event.target.value)} />
                    </div>
                    <div className="password">
                        <p>Heslo : </p>
                        <input type="password" value={this.state.password} className="password-input" onChange={event => this.handleChangePass(event.target.value)} />
                    </div>

                    <button type="submit" className="login-button" >Prihlásiť sa</button>
                </form>

            </div>
        )
    }
}

export default Login;