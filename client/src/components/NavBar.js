import React from 'react'
import { Link } from '@reach/router';
const NavBar = () => {
    return (
        <>
        <div className="row">
            <h1>Food Trucks</h1>
        </div>
        <div className="row">
            <Link to="/">Dashboard</Link> | <Link to="/truck/new">New Truck</Link>
        </div>
        </>
    )
}

export default NavBar
