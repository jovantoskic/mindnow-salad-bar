import React, { useState } from 'react';
import { TAGS } from '../../../constants/appConstants';
import { MenuItem, TextField, Button, Typography } from '@material-ui/core';

import './AddNameOrTag.scss';

function AddNameOrTag() {
  const [data, setData] = useState({
    saladTag: '',
    saladName: '',
  });

  const addNameOrTagToSalad = (get, set) => {
    localStorage.setItem(get, set);
    setData({
      saladTag: '',
      saladName: '',
    });
  };

  const handleChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const savedTag = localStorage.getItem('saladTag');
  const savedName = localStorage.getItem('saladName');

  return (
    <div className="add-name-or-tag-container">
      <div className="tag-name-container">
        <div className="tag-name-fields-container">
          <TextField
            select
            variant="outlined"
            color="primary"
            className="choose-salad-tag"
            name="saladTag"
            size="small"
            label="Choose tag"
            type="text"
            value={data.saladTag}
            onChange={handleChange}
          >
            {TAGS.map(tag => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </TextField>

          <Button
            className="add-tag-button"
            type="button"
            size="medium"
            variant="outlined"
            onClick={() => addNameOrTagToSalad('saladTag', data.saladTag)}
          >
            Add tag
          </Button>
        </div>

        <div className="tag-container">
          <p className="tag-label">Tag name:</p>
          <p className="tag">{savedTag}</p>
        </div>
      </div>

      <div className="tag-name-container">
        <div className="tag-name-fields-container">
          <TextField
            variant="outlined"
            color="primary"
            className="choose-salad-tag"
            name="saladName"
            size="small"
            label="Add name"
            type="text"
            value={data.saladName}
            onChange={handleChange}
          />
          <Button
            className="add-tag-button"
            type="button"
            size="medium"
            variant="outlined"
            onClick={() => addNameOrTagToSalad('saladName', data.saladName)}
          >
            Add name
          </Button>
        </div>

        <div className="name-container">
          <p className="name-label">Salad name:</p>
          <p className="name">{savedName}</p>
        </div>
      </div>
    </div>
  );
}

export default AddNameOrTag;
