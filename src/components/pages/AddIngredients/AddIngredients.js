import React, { useState } from 'react';
import axios from 'axios';

import { Button, TextField, Typography, MenuItem } from '@material-ui/core';
import Layout from '../../shared/Layout';

import { API_BASE_URL } from '../../../constants/apiRoutes';
import { TAGS } from '../../../constants/appConstants';

import './AddIngredients.scss';

function AddIngredients() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    name: '',
    calories: '',
    image: '',
    tag: '',
  });

  const setDisabled = field => {
    if (field !== '') {
      setIsDisabled(false);
    }
  };

  const handleChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    setDisabled(key);
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post(API_BASE_URL, data).then(response => {
      if (response.data) {
        setData({
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
            required={true}
            className="input-field"
            label="Ingredient name"
            value={data.name}
            type="text"
            variant="outlined"
            color="primary"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="calories"
            required={true}
            className="input-field"
            label="Calories"
            value={data.calories}
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
            value={data.image}
            type="text"
            variant="outlined"
            color="primary"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            select
            name="tag"
            required={true}
            className="input-field"
            label="Add tag to ingredient"
            placeholder="Add tag to ingredient"
            value={data.tag}
            type="text"
            variant="outlined"
            color="primary"
            fullWidth
            onChange={handleChange}
          >
            {TAGS.map(tag => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="outlined" disabled={isDisabled}>
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
