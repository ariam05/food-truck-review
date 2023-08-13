import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router';
const TruckCard = props => {
    const { truck } = props;
    const [avg, setAvg] = useState(0);

    useEffect(() => {
        let sum = 0;
        for(const review of truck.reviews){
            sum += review.rating;
        }
        if(truck.reviews.length == 0){
            setAvg(0);
        } else {
            setAvg(sum/truck.reviews.length);
        }
    }, []);


    return (
        <div className="row">
            <div className="col-sm-6 offset-sm-3">
                <h4>{truck.name}</h4>
                <p><b>Style: </b>{truck.style}</p>
                <p><b>Avg Rating: </b>{avg} stars</p>
            </div>
            <div className="col-sm-3">
                <button className="col-sm-6 btn btn-secondary" onClick={() => navigate(`/truck/${truck._id}/edit`)}>Edit</button>
                <button className="col-sm-6 btn btn-primary" onClick={() => navigate(`/truck/${truck._id}`)}>Review</button>
            </div>
        </div>
    )
}

export default TruckCard
