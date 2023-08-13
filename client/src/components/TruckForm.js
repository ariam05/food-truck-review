import React from 'react'
import { Link } from '@reach/router';

const TruckForm = props => {
    const { truck, errors, changeHandler, submitHandler, action, deleteHandler } = props;
    const { name, style, description } = truck;
    return (
        <form onSubmit={ submitHandler } className="col-sm-10 offset-sm-1">
            <div className="form-group row">
                {
                    errors.name ?
                    <span className="col-sm-8 offset-sm-4 text-danger">{ errors.name.message }</span>:
                    <span className="col-sm-12"></span>
                }
                <label htmlFor="name" className="col-sm-4">Name: </label>
                <input type="text" name="name" className="col-sm-8 form-control" onChange={ changeHandler } value={ name } />
            </div>
            <div className="form-group row">
                {
                    errors.style ?
                    <span className="col-sm-8 offset-sm-4 text-danger">{ errors.style.message }</span>:
                    <span className="col-sm-12"></span>
                }
                <label htmlFor="style" className="col-sm-4">Style: </label>
                <input type="text" name="style" className="col-sm-8 form-control" onChange={ changeHandler } value={ style } />
            </div>
            <div className="form-group row">
                {
                    errors.description ?
                    <span className="col-sm-8 offset-sm-4 text-danger">{ errors.description.message }</span>:
                    <span className="col-sm-12"></span>
                }
                <label htmlFor="description" className="col-sm-4">Description: </label>
                <textarea name="description" rows="10" className="col-sm-8 form-control" onChange={ changeHandler } value={ description }></textarea>
            </div>
            <div className="form-group col-sm-12 float-right">
                    {
                        action === "Update" ?
                        <input type="button" value="Delete" className="col-sm-3 btn btn-danger" onClick={ deleteHandler }/>
                        : ''
                    }
                    <Link to="/"><input type="button" value="Cancel" className="col-sm-3 btn btn-secondary"/></Link>
                    <input type="submit" value={ action } className="col-sm-3 btn btn-primary"/>
            </div>
        </form>
    )
}

export default TruckForm
