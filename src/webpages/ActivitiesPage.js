import ActivityHomepage from '../components/ActivityHomepage';
import ActivityInfo from '../components/ActivityInfo';
import React, { useEffect, useState } from "react";

import '../styles/ActivitiesPage.css';

function ActivitiesPage() {

  const API_URL = process.env.REACT_APP_API_URL;
  const restURL = API_URL + "/rest/activities/";
  const [activities, setActivities] = useState([])
  const [show, setShow] = useState(false)
  const [infoToShow, setInfoToShow] = useState([])
  const [profileData, setProfileData] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [cityFilter, setCityFilter] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showOnlyOrganizerActivities, setShowOnlyOrganizerActivities] = useState(false);


  

  async function fetchUser() {
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
        setProfileData(data);
      })
  }

  function showInfo(infoToShow) {
    setInfoToShow(infoToShow);
    setShow(!show);
  }

  async function fetchData() {
    await fetch(restURL, {
      headers: {
        method: "GET",
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setActivities(data)
      })
  }

  async function fetchCategory() {
    const API_URL = process.env.REACT_APP_API_URL
    let restURL = API_URL + "/rest/categories";
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
        console.log('Categories:', data);
        setCategories(data);
      })
  }

  async function fetchAddress() {
    const API_URL = process.env.REACT_APP_API_URL
    let restURL = API_URL + "/rest/addresses";
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
        console.log('Addresses:', data);
        setAddresses(data);
      })
  }

  useEffect(() => {
    fetchData();
    fetchCategory();
    fetchAddress();
    fetchUser();
  }, [showOnlyOrganizerActivities]);
  

  function filterActivities(activity) {
    if (showOnlyOrganizerActivities) {
      return activity.author.id === profileData.id;
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
  
  

  let activityList = [];

  activities.filter(filterActivities).forEach(activity => {
    activityList.push(
      <ActivityHomepage key={activity.id} data={activity} user={profileData} showInfo={showInfo} />
    )
  });

  activityList = activityList.reverse(); // Reverse the array

  let categoryList = [];
  categories.forEach(category => {
    categoryList.push(<option key={category.id} value={category.id}>{category.name}</option>)
  });

  function handleCategoryChange(e) {
    setCategoryFilter(e.target.value);
  }

  let cityList = [];
addresses.forEach(address => {
  if (!cityList.includes(address.city)) {
    cityList.push(address.city);
  }
});

let cityOptions = cityList.map(city => (
  <option key={city} value={city}>{city}</option>
));


  function handleCityChange(e) {
    setCityFilter(e.target.value);
  }

  return (
    <div className="ActivitiesPage">
      <div className="Filters">
        <div className="categories">
          <b>Kategória :</b>
          <select name="category" onChange={handleCategoryChange}>
            <option value="">Všetky kategórie</option>
            {categoryList}             
          </select>
        </div>
        <div className="cities">
          <b>Mesto :</b>
          <select name="city" onChange={handleCityChange}>
            <option value="">Všetky mestá</option>
            {cityOptions}             
          </select>
        </div>
        <div className="organizer">
          <b>Show only:</b>
          <select name="organizer" onChange={(e) => setShowOnlyOrganizerActivities(e.target.value === "my-activities")}>
            <option value="">All activities</option>
            <option value="my-activities">My created activities</option>
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
