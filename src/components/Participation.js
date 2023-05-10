import React, { Component } from "react";
import "../styles/Participation.css"
class Participation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentDidMount() {

    }

    render() {
        return (
            <div className="Participation">
                <p className="activity">
                    {this.props.data.activity.name}
                </p>
                <div className="info-container">
                    <p className="adresa">
                        <b>Adresa :</b> {`${this.props.data.activity.address.street} ${this.props.data.activity.address.houseNumber}, ${this.props.data.activity.address.city}`}
                    </p>
                    <p className="fromDate">
                        <b>Od :</b> {this.props.data.activity.fromDate}
                    </p>
                    <p className="toDate">
                        <b>Do :</b> {this.props.data.activity.toDate}
                    </p>
                </div>
            </div>)
    }
}

export default Participation;