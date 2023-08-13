import React, { useState } from 'react'
import TruckForm from '../components/TruckForm'
import axios from 'axios';
import { navigate } from '@reach/router';

const NewTruck = () => {
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

    const submitHandler = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/trucks", truck)
            .then(response => {
                const res = response.data;
                if(res.message === "success"){
                    navigate("/");
                } else {
                    setErrors(res.data.errors);
                }
            })
            .catch(err => setBigError(true));
    }

    return (
        <div>
            {
                bigError ?
                <h1>uh oh, something went terribly wrong</h1>
                :
                <>
                <h3>New Food Truck</h3>
                <TruckForm
                    truck={truck}
                    errors={errors}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                    action="Submit"
                />
                </>
            }
            
        </div>
    )
}

export default NewTruck
