import React, { useState } from 'react';
import axios from 'axios';

import { Button, TextField, Typography } from '@material-ui/core';
import Layout from '../../shared/Layout';

import { BASE_URL } from '../../../constants/apiRoutes';

import './AddIngredients.scss';

function AddIngredients() {
  const [updated, setUpdated] = useState(false);
  const [state, setState] = useState({
    name: '',
    calories: '',
    image: '',
    tag: '',
  });

  const handleChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    setState({
      ...state,
      [key]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post(BASE_URL, state).then(response => {
      if (response.data) {
        setUpdated(true);
        setState({
          name: '',
          calories: '',
          image: '',
          tag: '',
        });
      }
    });
  };

  return (
    <Layout>
      <div className="add-ingredients-container">
        <form className="add-ingredients-form" onSubmit={handleSubmit}>
          <TextField
            name="name"
            className="input-field"
            label="Ingredient name"
            value={state.name}
            type="text"
            variant="outlined"
            color="primary"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="calories"
            className="input-field"
            label="Calories"
            value={state.calories}
            type="number"
            variant="outlined"
            color="primary"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="image"
            className="input-field"
            label="Ingredient image"
            value={state.image}
            type="text"
            variant="outlined"
            color="primary"
            fullWidth
            onChange={handleChange}
          />

          <TextField
            name="tag"
            className="input-field"
            label="Add tag to ingredient"
            placeholder="Add tag to ingredient"
            value={state.tag}
            type="text"
            variant="outlined"
            color="primary"
            fullWidth
            onChange={handleChange}
          />

          <Button type="submit" variant="outlined">
            Add ingredients
          </Button>
        </form>
        <div className="typography-container">
          <Typography variant="h3">
            Choose ingredients and make your one salad!
          </Typography>
        </div>
      </div>
    </Layout>
  );
}

export default AddIngredients;
