import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import axios from 'axios';


const AddProperty = () => {
    const [state, setState] = useState({
      property_description: '',
      property_cost: '',
      property_quantity: '',
    });


  const onChange = e => {
    setState({ [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const data = {
      property_description: state.property_description,
      property_cost: state.property_cost,
      property_quantity: state.property_quantity,
    };

    axios
      .post('http://localhost:8080/api/properties', data)
      .then(res => {
        setState({
            property_description: '',
            property_cost: '',
            property_quantity: '',
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in AddProperty!");
      })
  };

    return (
      <div className="CreateBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/property" className="btn btn-outline-warning float-left">
                  Show Property List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Property</h1>
              <p className="lead text-center">
                  Create new property
              </p>

              <form noValidate onSubmit={onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Property Description'
                    name='property description'
                    className='form-control'
                    value={state.property_description}
                    onChange={onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='number'
                    placeholder='Property Cost'
                    name='property cost'
                    className='form-control'
                    value={state.property_cost}
                    onChange={onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='number'
                    placeholder='Property Quantity'
                    name='property quantity'
                    className='form-control'
                    value={state.property_quantity}
                    onChange={onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }

export default AddProperty;