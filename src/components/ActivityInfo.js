import '../styles/ActivityInfo.css';
import React, { Component } from "react";

class ActivityInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profiledata: [],
        }
    }

    componentDidMount() {
    }
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };
    render() {
        if (this.props.show) {
            return (
                <div className="ActivityInfo">
                    <p className='Name'>{this.props.data.name}</p>
                    <div className='info-container'>
                        <p className='Category'><b>Kategória :</b> {this.props.data.category.name}</p>
                        <p className='Author'><b>Autor :</b> {`${this.props.data.author.firstName} ${this.props.data.author.lastName}, ${this.props.data.author.email}`}</p>
                        <p className='Description'><b>Popis :</b> {this.props.data.description}</p>
                        <p className="Address"><b>Adresa :</b> {`${this.props.data.address.street} ${this.props.data.address.houseNumber}, ${this.props.data.address.city}`}</p>
                        <p className="fromDate"><b>Od :</b> {this.props.data.fromDate}</p>
                        <p className="toDate"><b>Do :</b> {this.props.data.toDate}</p>
                        <p className="minAge"><b>Maximálny vek :</b> {this.props.data.min_age}</p>
                        <p className="maxAge"><b>Minimálny vek :</b> {this.props.data.max_age}</p>
                        <p className="Price"><b>Poplatok v € :</b> {this.props.data.price}</p>
                    </div>

                    <button onClick={this.onClose}>Zavrieť</button>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

export default ActivityInfo;