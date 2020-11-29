export const API_BASE_URL = `https://${process.env.REACT_APP_KEY}.mockapi.io/ingredients`;

// export const API_SORT_DESC_URL = `${API_BASE_URL}?sortby=calories&order=desc`;
// export const API_SORT_ASC_URL = `${API_BASE_URL}?sortby=calories`;

export const API_SORT_DESC_URL = `${API_BASE_URL}?sortby=name&order=desc`;
export const API_SORT_ASC_URL = `${API_BASE_URL}?sortby=name`;
