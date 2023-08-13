import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import TruckForm from '../components/TruckForm';

const EditTruck = props => {
    const { id } = props;

    const [truck, setTruck] = useState({
        name: '',
        style: '',
        description: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        style: '',
        description: ''
    });
    const [bigError, setBigError] = useState(false);
    
    const changeHandler = e => {
        setTruck({
            ...truck,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/trucks/${id}`)
            .then(response => setTruck(response.data.data))
            .catch(err => setBigError(true));
    }, [id])

    const submitHandler = e => {
        e.preventDefault();

        axios.patch(`http://localhost:8000/api/trucks/${id}`, truck)
            .then(response => {
                const res = response.data;
                if(res.message === "success"){
                    navigate('/');
                } else {
                    setErrors(res.data.errors)
                }
            })
            .catch(err => setBigError(true));
    }

    const deleteTruck = e => {
        axios.delete(`http://localhost:8000/api/trucks/${id}`)
            .then(response => navigate('/'))
            .catch(err => setBigError(true));
    }

    return (
        <div>
            {
                bigError ?
                <h1>uh oh, something went terribly wrong</h1>
                :
                <>
                <h3>Edit { truck.name }</h3>
                <TruckForm
                    truck={truck}
                    errors={errors}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                    action="Update"
                    deleteHandler={ deleteTruck }
                />
                </>
            }
        </div>
    )
}

export default EditTruck
