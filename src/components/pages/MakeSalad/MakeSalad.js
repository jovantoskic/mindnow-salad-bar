import React, { useState, useEffect } from 'react';
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
import Fetching from '../../shared/Fetching';
import AddNameOrTag from '../../shared/AddNameOrTag';
import {
  sortByDescOrder,
  filterTag,
  sumAllCalories,
} from '../../../utils/helpers';
import { API_BASE_URL } from '../../../constants/apiRoutes';

import './MakeSalad.scss';

function MakeSalad() {
  const [sorted, setSorted] = useState();
  const [ingredients, setIngredients] = useState([]);

  const direction = sorted ? 'desc' : 'asc';

  const filterByTags = event => {
    filterTag(event, setIngredients);
  };

  const searchByName = event => {
    const name = event.target.textContent;
    axios.get(`${API_BASE_URL}?search=${name}`).then(response => {
      setIngredients(response.data);
    });
  };

  const sortCalories = () => {
    if (direction === 'asc') {
      setIngredients(ingredients.reverse());
      setSorted(!sorted);
    } else if (direction === 'desc') {
      setIngredients(sortByDescOrder(ingredients, 'calories'));
      setSorted(!sorted);
    }
  };

  useEffect(() => {
    axios.get(API_BASE_URL).then(response => {
      setIngredients(sortByDescOrder(response.data, 'calories'));
    });
  }, []);

  return (
    <Layout>
      <div className="make-salad-container">
        {ingredients && ingredients.length > 0 ? (
          <div>
            <AddNameOrTag />
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
                          onClick={sortCalories}
                          direction={direction}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>Tag</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.map(data => {
                    const { calories, name, tag, id } = data;
                    return (
                      <TableRow key={id}>
                        <Tooltip title="Search by name" placement="left">
                          <TableCell
                            className="name-cell"
                            onClick={searchByName}
                          >
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
                              onClick={filterByTags}
                            />
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
                      {sumAllCalories(ingredients)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <Fetching message="No ingredients!" />
        )}
      </div>
    </Layout>
  );
}

export default MakeSalad;
