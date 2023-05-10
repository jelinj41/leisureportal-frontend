import React, { useEffect, useState } from "react";
import Participation from "../components/Participation";
function ParticipationPage() {
    const [participations, setParticipations] = useState([])

    const fetchParticipations = () => {
        let restURL = "/rest/participations/myParticipations/";
        fetch(restURL, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setParticipations(data)
            })
    }
    useEffect(() => {
        fetchParticipations()
    }, [])

    let parList = [];
    Array.from(participations).forEach((par, index) => {
        parList.push(<Participation key={`${par.id}-${index}`} data={par} />);
      });
    //Array.from(participations).forEach(par => {
    //    parList.push(
    //        <Participation key={par.id} data={par} />
    //    )
    //});
    return (
        <div className="Page">
            <h2>Zúčastnené aktivity</h2>
            <div className="ParticipationPage">
                {parList}
            </div>
        </div>
    );
}

export default ParticipationPage;
