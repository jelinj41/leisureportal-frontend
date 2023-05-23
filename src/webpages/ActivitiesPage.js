import ActivityHomepage from '../components/ActivityHomepage';
import ActivityInfo from '../components/ActivityInfo';
import React, { useEffect, useState } from "react";

import '../styles/ActivitiesPage.css';

function ActivitiesPage() {
  const API_URL = process.env.REACT_APP_API_URL;
  const restURL = API_URL + "/rest/activities/";
  const [activities, setActivities] = useState([]);
  const [show, setShow] = useState(false);
  const [infoToShow, setInfoToShow] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [cityFilter, setCityFilter] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [organizerFilter, setOrganizerFilter] = useState(null);

      // Get the currently logged in user's data
  async function fetchUser() {
    const API_URL = process.env.REACT_APP_API_URL;
    let restURL = API_URL + "/rest/users/current";
    await fetch(restURL, {
      method: "GET",
      credentials: 'include',
      headers: {
        mode: 'no-cors',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setProfileData(data);
    });
  }

      // Show info of the current activity
  function showInfo(infoToShow) {
    setInfoToShow(infoToShow);
    setShow(!show);
  }

      // Get the activity data
  async function fetchData() {
    await fetch(restURL, {
      headers: {
        method: "GET",
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setActivities(data);
    });
  }

    // Get the category data
  async function fetchCategory() {
    const API_URL = process.env.REACT_APP_API_URL;
    let restURL = API_URL + "/rest/categories";
    await fetch(restURL, {
      method: "GET",
      credentials: 'include',
      headers: {
        mode: 'no-cors',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Categories:', data);
      setCategories(data);
    });
  }

      // Get the addresses data
  async function fetchAddress() {
    const API_URL = process.env.REACT_APP_API_URL;
    let restURL = API_URL + "/rest/addresses";
    await fetch(restURL, {
      method: "GET",
      credentials: 'include',
      headers: {
        mode: 'no-cors',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Addresses:', data);
      setAddresses(data);
    });
  }

  useEffect(() => {
    fetchData();
    fetchCategory();
    fetchAddress();
    fetchUser();
  }, []);

      // Filter activities based on city, category of organizer's own activities
  function filterActivities(activity) {
    if (organizerFilter === "my-activities") {
      if (categoryFilter && cityFilter) {
        const address = addresses.find((address) => address.id === activity.address.id);
        return (
          activity.author.id === profileData.id &&
          activity.category.id === parseInt(categoryFilter) &&
          address.city === cityFilter
        );
      } else if (categoryFilter) {
        return activity.author.id === profileData.id && activity.category.id === parseInt(categoryFilter);
      } else if (cityFilter) {
        const address = addresses.find((address) => address.id === activity.address.id);
        return activity.author.id === profileData.id && address.city === cityFilter;
      } else {
        return activity.author.id === profileData.id;
      }
    } else {
      if (categoryFilter && cityFilter) {
        const address = addresses.find((address) => address.id === activity.address.id);
        return (
          activity.category.id === parseInt(categoryFilter) &&
          address.city === cityFilter
        );
      } else if (categoryFilter) {
        return activity.category.id === parseInt(categoryFilter);
      } else if (cityFilter) {
        const address = addresses.find((address) => address.id === activity.address.id);
        return address.city === cityFilter;
      } else {
        return true;
      }
    }
  }
  
    // Push activities into a new list
  let activityList = [];
  activities.filter(filterActivities).forEach(activity => {
    activityList.push(
      <ActivityHomepage key={activity.id} data={activity} user={profileData} showInfo={showInfo} />
    );
  });
  activityList = activityList.reverse(); // Reverse the array

    // Push categories into a new list
  let categoryList = [];
  categories.forEach(category => {
    categoryList.push(<option key={category.id} value={category.id}>{category.name}</option>);
  });


    // Push cities into a new list
  let cityList = [];
  addresses.forEach(address => {
    if (!cityList.includes(address.city)) {
      cityList.push(address.city);
    }
  });

  let cityOptions = cityList.map(city => (
    <option key={city} value={city}>{city}</option>
  ));

        // Event handler for category input change
  function handleCategoryChange(e) {
    setCategoryFilter(e.target.value);
  }
        // Event handler for city input change
  function handleCityChange(e) {
    setCityFilter(e.target.value);
  }
        // Event handler for organizer activities input change
  function handleOrganizerChange(e) {
    setOrganizerFilter(e.target.value);
  }

  return (
    <div className="ActivitiesPage">
      <div className="Filters">
        <div className="categories">
          <b>Kategória:</b>
          <select name="category" onChange={handleCategoryChange}>
            <option value="">Všetky kategórie</option>
            {categoryList}
          </select>
        </div>
        <div className="cities">
          <b>Mesto:</b>
          <select name="city" onChange={handleCityChange}>
            <option value="">Všetky mestá</option>
            {cityOptions}
          </select>
        </div>
        <div className="organizer">
          <b>Aktivity:</b>
          <select name="organizer" onChange={handleOrganizerChange}>
            <option value="">Všetky aktivity</option>
            <option value="my-activities">Moje vytvorené</option>
          </select>
        </div>
      </div>
      <div className="ActivitiesContainer">
        {activityList}
      </div>
      <ActivityInfo onClose={showInfo} data={infoToShow} show={show} />
    </div>
  );
}

export default ActivitiesPage;
