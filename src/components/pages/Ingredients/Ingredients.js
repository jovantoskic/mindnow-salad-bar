import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@material-ui/core';
import Layout from '../../shared/Layout';

import { sortByDescOrder } from '../../../utils/helpers';
import { store } from '../../../store/store';
import { API_BASE_URL } from '../../../constants/apiRoutes';

import './Ingredients.scss';

function Ingredients() {
  const appContext = useContext(store);
  const { dispatch } = appContext;
  const [sorted, setSorted] = useState(false);

  const order = sorted ? 'desc' : 'asc';

  const updateIngredients = newValue => {
    dispatch({ type: 'UPDATE_INGREDIENTS', payload: newValue });
  };

  const sortIngredients = () => {
    if (order === 'asc') {
      updateIngredients(appContext.state.ingredients.reverse());
      setSorted(!sorted);
    } else if (order === 'desc') {
      updateIngredients(
        sortByDescOrder(appContext.state.ingredients, 'calories')
      );
      setSorted(!sorted);
    }
  };

  const filterTags = event => {
    const tag = event.target.textContent;
    axios.get(`${API_BASE_URL}?filter=${tag}`).then(response => {
      const filteredTags = response.data.filter(result => {
        return result.tag === event.target.textContent;
      });
      updateIngredients(filteredTags);
    });
  };

  useEffect(() => {
    axios.get(API_BASE_URL).then(response => {
      updateIngredients(sortByDescOrder(response.data, 'calories'));
    });
  }, []);

  return (
    <Layout>
      <div className="ingredients-container">
        {appContext.state.ingredients && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ingredient</TableCell>
                  <TableCell>
                    Calories
                    <TableSortLabel
                      active={true}
                      onClick={sortIngredients}
                      direction={order}
                    />
                  </TableCell>
                  <TableCell>Tag</TableCell>
                  <TableCell>Image</TableCell>
                </TableRow>
              </TableHead>
              {appContext.state.ingredients.map(data => {
                const { image, calories, name, tag, id } = data;
                return (
                  <TableBody key={id}>
                    <TableRow>
                      <TableCell>{name}</TableCell>
                      <TableCell>{calories}</TableCell>
                      <TableCell onClick={filterTags}>{tag}</TableCell>
                      <TableCell>
                        <img className="ingredient-image" src={image} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
        )}
      </div>
    </Layout>
  );
}

export default Ingredients;
