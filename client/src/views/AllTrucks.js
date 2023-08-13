import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TruckCard from '../components/TruckCard';

const AllTrucks = () => {
    const [bigError, setBigError] = useState(false);
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/trucks')
            .then(response => setTrucks(response.data.data))
            .catch(err => setBigError(true));
    }, [])

    return (
        <div>
            {
                bigError ?
                <h1>uh oh big problemo</h1>
                :
                trucks.map((item, i) => <TruckCard key={i} truck={item}/>)
            }
        </div>
    )
}

export default AllTrucks
