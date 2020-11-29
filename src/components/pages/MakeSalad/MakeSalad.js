import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Chip,
  Tooltip,
} from '@material-ui/core';
import Layout from '../../shared/Layout';
import AddNameOrTag from '../../shared/AddNameOrTag';
import { sortByDescOrder } from '../../../utils/helpers';
import { store } from '../../../store/store';
import { API_BASE_URL } from '../../../constants/apiRoutes';

import './MakeSalad.scss';

function MakeSalad() {
  const appContext = useContext(store);
  const { dispatch } = appContext;
  const [sorted, setSorted] = useState();

  const order = sorted ? 'desc' : 'asc';

  const updateIngredients = newValue => {
    dispatch({ type: 'UPDATE_INGREDIENTS', payload: newValue });
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

  const searchByName = event => {
    const name = event.target.textContent;
    axios.get(`${API_BASE_URL}?search=${name}`).then(response => {
      updateIngredients(response.data);
    });
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

  const sumAllCalories = arr => {
    if (arr) {
      const calories = arr.map(ingredient => Number(ingredient.calories));
      return calories.reduce((a, b) => a + b, 0);
    }
  };

  return (
    <Layout>
      <div className="make-salad-container">
        <AddNameOrTag />
        {appContext.state.ingredients && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ingredient</TableCell>
                  <TableCell>
                    Calories
                    <Tooltip title="Sort by calories" placement="top">
                      <TableSortLabel
                        active={true}
                        onClick={sortIngredients}
                        direction={order}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell>Tag</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appContext.state.ingredients.map(data => {
                  const { calories, name, tag, id } = data;
                  return (
                    <TableRow key={id}>
                      <Tooltip title="Search by name" placement="left">
                        <TableCell className="name-cell" onClick={searchByName}>
                          {name}
                        </TableCell>
                      </Tooltip>
                      <TableCell>{calories}</TableCell>
                      <Tooltip title="Filter by tag" placement="left">
                        <TableCell>
                          <Chip
                            className="tag-cell"
                            variant="outlined"
                            label={tag}
                            color="primary"
                            size="small"
                            onClick={filterTags}
                          ></Chip>
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell className="total-calories">
                    Total number of calories:
                  </TableCell>
                  <TableCell className="total-calories">
                    {sumAllCalories(appContext.state.ingredients)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </Layout>
  );
}

export default MakeSalad;
