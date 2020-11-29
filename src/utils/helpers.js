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
