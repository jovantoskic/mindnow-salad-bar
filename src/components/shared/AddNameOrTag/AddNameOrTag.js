import React, { useState } from 'react';
import { TAGS } from '../../../constants/appConstants';
import { MenuItem, TextField, Button } from '@material-ui/core';
import { handleChange } from '../../../utils/helpers';

import './AddNameOrTag.scss';

function AddNameOrTag() {
  const [data, setData] = useState({
    saladTag: '',
    saladName: '',
  });

  const setStorageItem = (get, set) => {
    localStorage.setItem(get, set);
    setData({
      saladTag: '',
      saladName: '',
    });
  };

  const handleInputChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    handleChange(setData, data, key, value);
  };

  const clearStorage = name => {
    localStorage.removeItem(name);
    window.location.reload();
  };

  const tagItem = localStorage.getItem('saladTag');
  const saladItem = localStorage.getItem('saladName');

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
            label="Choose salad tag"
            type="text"
            value={data.saladTag}
            onChange={handleInputChange}
          >
            {TAGS.map(tag => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </TextField>
          <Button
            className="add-tag-button"
            type="button"
            size="medium"
            variant="outlined"
            onClick={() => setStorageItem('saladTag', data.saladTag)}
          >
            Add tag
          </Button>
          <Button
            className="delete-tag-button"
            type="button"
            size="medium"
            variant="outlined"
            onClick={() => clearStorage('saladTag')}
          >
            Delete tag
          </Button>
        </div>
        <div className="tag-container">
          <p className="tag-label">Tag name:</p>
          <p className="tag">{tagItem || ''}</p>
        </div>
      </div>

      <div className="tag-name-container">
        <div className="tag-name-fields-container">
          <TextField
            variant="outlined"
            color="primary"
            className="add-salad-name"
            name="saladName"
            size="small"
            label="Add salad name"
            type="text"
            value={data.saladName}
            onChange={handleInputChange}
          />
          <Button
            className="add-name-button"
            type="button"
            size="medium"
            variant="outlined"
            onClick={() => setStorageItem('saladName', data.saladName)}
          >
            Add name
          </Button>
          <Button
            className="delete-name-button"
            type="button"
            size="medium"
            variant="outlined"
            onClick={() => clearStorage('saladName')}
          >
            Delete name
          </Button>
        </div>

        <div className="name-container">
          <p className="name-label">Salad name:</p>
          <p className="name">{saladItem}</p>
        </div>
      </div>
    </div>
  );
}

export default AddNameOrTag;
