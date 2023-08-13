import React from 'react'

const ReviewCard = props => {
    const { review } = props;

    return (
        <div className="row">
            <div className="col-sm-2">
                <p>{ review.name }</p>
            </div>
            <div className="col-sm-8 offset-sm-2">
                <p>{ review.review }</p>
                <p>Rating: { review.rating } stars</p>
            </div>
        </div>
    )
}

export default ReviewCard
