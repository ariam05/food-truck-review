import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import ReviewCard from '../components/ReviewCard';
const OneTruck = props => {
    const { id } = props;
    const [truck, setTruck] = useState({
        name: '',
        style: '',
        description: '',
        reviews: []
    });
    const [avg, setAvg] = useState(0);
    const [bigError, setBigError] = useState(false);

    const [review, setReview] = useState({
        name: '',
        rating: 3,
        review: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        rating: '',
        review: ''
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/trucks/${id}`)
            .then(response => {
                const res = response.data;
                if(res.message === "success") {
                    let sum = 0;
                    for(const review of res.data.reviews){
                        sum += review.rating;
                    }
                    if(res.data.reviews.length > 0){
                        setAvg(sum/res.data.reviews.length);
                    } else {
                        setAvg(0);
                    }

                    setTruck(res.data);
                } else {
                    navigate('/');
                }
            })
            .catch(err => setBigError(true));
    }, [id])

    const changeHandler = e => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/trucks/${id}/review`, review)
            .then(response => {
                if(response.data.message == "success"){

                    setTruck({
                        ...truck,
                        reviews: [...truck.reviews, review]
                    });
                    setReview({
                        name: '',
                        review: '',
                        rating: 3
                    });
                    setErrors({
                        name: '',
                        review: '',
                        rating: ''
                    })
                } else {
                    console.log(response.data)
                    setErrors(response.data.data.errors.reviews.errors)
                }
            })
            .catch(err => setBigError(true));
    }

    return (
        <>
            {
                bigError ? 
                <h1>uh oh spaghettios</h1>
                :
                <>
                    <div className="row">
                        <div className="col-sm-10 offset-sm-2">
                            <h2>{truck.name}</h2>
                            <p><b>Style: </b>{truck.style}</p>
                            <p><b>Description: </b>{truck.description}</p>
                            <p><b>Avg Rating: </b>{avg} stars</p>
                        </div>
                    </div>
                    <div className="col-sm-10 offset-sm-1">
                        {
                            truck.reviews.map((item, i) => <ReviewCard key={i} review={item} />)
                        }
                    </div>
                    <form onSubmit={ submitHandler } className="row">

                        <div className="col-sm-6">
                            <div className="form-group row">
                                {
                                    errors.name ?
                                    <span className="col-sm-8 offset-sm-4 text-danger">{errors.name.message}</span>
                                    :
                                    <span className="col-sm-12"></span>
                                }
                                <label htmlFor="name" className="col-sm-4">Name: </label>
                                <input type="text" name="name" className="col-sm-8 form-control" onChange={ changeHandler } value={ review.name }/>
                            </div>
                            <div className="form-group row">
                                {
                                    errors.review ?
                                    <span className="col-sm-8 offset-sm-4 text-danger">{errors.review.message}</span>
                                    :
                                    <span className="col-sm-12"></span>
                                }
                                <label htmlFor="review" className="col-sm-4">Review: </label>
                                <textarea name="review" rows="3" className="col-sm-8 form-control" onChange={ changeHandler } value={ review.review }></textarea>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group row">
                                {
                                    errors.rating ?
                                    <span className="col-sm-8 offset-sm-4 text-danger">{errors.rating.message}</span>
                                    :
                                    <span className="col-sm-12"></span>
                                }
                                <label htmlFor="rating" className="col-sm-4">Rating: </label>
                                <select name="rating" className="col-sm-8 form-control" onChange={ changeHandler } value={ review.rating }>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <input type="button" value="Cancel" className="col-sm-4 offset-sm-4 btn btn-secondary" onClick={ () => navigate('/') }/>
                                <input type="submit" value="Submit" className="col-sm-4 btn btn-primary"/>
                            </div>
                        </div>
                    </form>
                </>
            }
        </>
    )
}

export default OneTruck
