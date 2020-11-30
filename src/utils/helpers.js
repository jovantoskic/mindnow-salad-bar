import axios from 'axios';
import { API_BASE_URL } from '../constants/apiRoutes';

export const sortByDescOrder = (arr, key) => {
  if (arr) {
    return arr.sort((a, b) => {
      return a[key] - b[key];
    });
  }
};

export const filterTag = (event, callback) => {
  const tag = event.target.textContent;
  axios.get(`${API_BASE_URL}?filter=${tag}`).then(response => {
    const filteredTags = response.data.filter(result => {
      return result.tag === event.target.textContent;
    });
    callback(filteredTags);
  });
};

export const sumAllCalories = arr => {
  if (arr) {
    const calories = arr.map(ingredient => Number(ingredient.calories));
    return calories.reduce((a, b) => a + b, 0);
  }
};

export const handleChange = (callback, data, name, value) => {
  const key = name;
  const keyValue = value;
  callback({
    ...data,
    [key]: keyValue,
  });
};
