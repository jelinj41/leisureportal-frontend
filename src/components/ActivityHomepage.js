import '../styles/ActivityHomepage.css';
import React, { Component } from "react";

class ActivityHomepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showed: false,
            registered: false,
            isLoggedIn: false,
        }
        this.renderDelete = this.renderDelete.bind(this);
        this.participationsDownload = this.participationsDownload.bind(this);
        this.renderREG = this.renderREG.bind(this);
    }

    async checkLoggedIn() {
        const API_URL = process.env.REACT_APP_API_URL
        let restURL = API_URL + "/rest/users/isLoggedIn";
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
            this.setState({ isLoggedIn: data });
          })
      }

    renderDelete() {
        if ((this.props.data.author && (this.props.user.id === this.props.data.author.id))
            || this.props.user.id === this.props.data.author
            || this.props.user.type === "admin") {
            return <button className='delete-button' onClick={() => {
                this.DeleteActivity();
            }}>Odstrániť</button>
        }
        else {
            return;
        }
    }
    renderREG() {
        if (this.state.registered) {
            return (<button className='reg-button' onClick={() => {
                this.Exit();
            }}>Odhlásiť sa z aktivity</button>)
        }
        else {
            return (<button className='reg-button' onClick={() => {
                this.Register();
            }}>Prihlásiť sa na aktivitu</button>)
        }
    }

    participationsDownload() {
        if ((this.props.data.author && (this.props.user.id === this.props.data.author.id))
            || this.props.user.id === this.props.data.author
            || this.props.user.type === "admin") {
                return <button onClick={this.downloadResFile}>Prihlásení záujemcovia</button>
        }
        else {
            return;
        }
    }

    registered() {
        if (!this.state.registered) {
            this.props.data.participations.forEach(element => {
                if ((element.user.id === this.props.user.id) ||
                    (element.user === this.props.user.id)) {
                    this.setState({ registered: true })
                }
            }
            );
        }
    }

    async udateParticipation(par) {
        const API_URL = process.env.REACT_APP_API_URL
        const restURL = API_URL + "/rest/participations/";
        await fetch(restURL, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    id: par.user.id,

                },
                activity: {
                    id: par.activity
                },
            })
        })
    }
    async DeleteActivity() {
        const API_URL = process.env.REACT_APP_API_URL
        const restURL = API_URL + "/rest/activities/" + this.props.data.id;
        await fetch(restURL, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        window.location.reload();
    }
    componentDidMount() {
        this.registered();
        this.checkLoggedIn()

    }
    componentDidUpdate() {
    }

    async Register() {
        const API_URL = process.env.REACT_APP_API_URL
        const restURL = API_URL + "/rest/users/registerForActivity/" + this.props.data.id;
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        window.location.reload();
    }

    async Exit() {
        const API_URL = process.env.REACT_APP_API_URL
        const restURL = API_URL + "/rest/users/exit/" + this.props.data.id;
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        })
        window.location.reload();
    }
    downloadResFile = () => {
        const participants = this.props.data.participations.map(participant => `${participant.user.firstName} ${participant.user.lastName}`);
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(participants, null, 4)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "participants.txt";
        document.body.appendChild(element);
        element.click();
    }

    handleFile = (e) => {
        const content = e.target.participation;
        console.log(content)
        var participationArray = JSON.parse(content);
        console.log(participationArray);
        participationArray.forEach(par => {
            this.udateParticipation(par);
        })
        // You can set content in state and show it in render.
    }
    render() {
        this.registered()
        if (!this.state.isLoggedIn) {
            return (
                <div className="ActivityHomepage" key={this.props.data.name}>
                    <div className='Header'>
                        <p className='Name'>{this.props.data.name}</p>
                        <p className="Capacity"><b>Kapacita :</b> {this.props.data.participations.length} / {this.props.data.capacity}</p>
                    </div>
                    
                    <div className="info-container">
                        <p className="Address"><b>Adresa :</b> {`${this.props.data.address.street} ${this.props.data.address.houseNumber}, ${this.props.data.address.city}`}</p>
                        <p className="fromDate"><b>Od :</b> {this.props.data.fromDate}</p>
                        <p className="toDate"><b>Do :</b> {this.props.data.toDate}</p>
                    </div>
                    <p className="login-message"><b>Na zúčastnenie sa je potrebný účet</b></p>

                    <button className='info-button' onClick={() => {
                        this.props.showInfo(this.props.data);
                    }}>Informácie</button>
                </div>
            )
        } else {
            return (
                <div className="ActivityHomepage" key={this.props.data.name}>
                    <div className='Header'>
                        <p className='Name'>{this.props.data.name}</p>
                        <p className="Capacity"><b>Kapacita :</b> {this.props.data.participations.length} / {this.props.data.capacity}</p>
                    </div>                    <div className="info-container">
                        <p className="Address"><b>Adresa :</b> {`${this.props.data.address.street} ${this.props.data.address.houseNumber}, ${this.props.data.address.city}`}</p>
                        <p className="fromDate"><b>Od :</b> {this.props.data.fromDate}</p>
                        <p className="toDate"><b>Do :</b> {this.props.data.toDate}</p>
                    </div>
                    <div className="buttons">
                        <this.renderREG />
                        <button className='info-button' onClick={() => {
                            this.props.showInfo(this.props.data);
                        }}>Informácie</button>
                        <this.renderDelete />
                        <this.participationsDownload />
                    </div>
                </div>)
        }
    }
}

export default ActivityHomepage;