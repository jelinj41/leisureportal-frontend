import { Component } from "react";
import ActivityHomepage from '../components/ActivityHomepage';
import ActivityInfo from '../components/ActivityInfo';
import '../styles/ActivitiesPage.css';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      profileData: [],
      activities: [],
      infoToShow: null,
      show: false,
    }
  }
  
  async checkLoggedIn() {
    const API_URL = process.env.REACT_APP_API_URL
    let restURL = API_URL + "/rest/users/isLoggedIn";
    try {
      const response = await fetch(restURL, {
        method: "GET",
        credentials: 'include',
        headers: {
          mode: 'no-cors',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      this.setState({ isLoggedIn: data });
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUser() {
    const API_URL = process.env.REACT_APP_API_URL
    let restURL = API_URL + "/rest/users/current";
    try {
      const response = await fetch(restURL, {
        method: "GET",
        credentials: 'include',
        headers: {
          mode: 'no-cors',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      this.setState({ profileData: data });
    } catch (error) {
      console.error(error);
    }
  }

  async fetchData() {
    const API_URL = process.env.REACT_APP_API_URL
    let restURL = API_URL + "/rest/activities/";
    try {
      const response = await fetch(restURL, {
        headers: {
          method: "GET",
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      this.setState({ activities: data });
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    await this.checkLoggedIn();
    await this.fetchUser();
    await this.fetchData();
  }

  showInfo = (infoToShow) => {
    this.setState({
      infoToShow: infoToShow,
      show: true,
    });
  }

  onClose = () => {
    this.setState({ show: false });
  }

  render() {
    console.log(this.state.isLoggedIn)
    console.log(this.state.profileData)
    let activityList = [];

    this.state.activities.slice(-4).forEach(activity => {
      activityList.push(
        <ActivityHomepage key={activity.id} data={activity} user={this.state.profileData} showInfo={this.showInfo} />
      )
    });

    activityList = activityList.reverse(); // Reverse the array

    return (
      <div className="ActivitiesPage">
        <h2>Najnovšie pridané</h2>
        <div className="ActivitiesContainer">
          {activityList}
        </div>
        <ActivityInfo onClose={this.onClose} data={this.state.infoToShow} show={this.state.show} />
      </div>
    );
  }
}

export default Homepage;
