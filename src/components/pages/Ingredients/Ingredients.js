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
  Tooltip,
  Chip,
} from '@material-ui/core';
import Layout from '../../shared/Layout';
import { sortByDescOrder, filterTag } from '../../../utils/helpers';
import { API_BASE_URL } from '../../../constants/apiRoutes';

import './Ingredients.scss';

function Ingredients() {
  const [sorted, setSorted] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const direction = sorted ? 'desc' : 'asc';

  const sortCalories = () => {
    if (direction === 'asc') {
      setIngredients(ingredients.reverse());
      setSorted(!sorted);
    } else if (direction === 'desc') {
      setIngredients(sortByDescOrder(ingredients, 'calories'));
      setSorted(!sorted);
    }
  };

  const filterByTags = event => {
    filterTag(event, setIngredients);
  };

  useEffect(() => {
    axios.get(API_BASE_URL).then(response => {
      setIngredients(sortByDescOrder(response.data, 'calories'));
    });
  }, []);

  return (
    <Layout>
      <div className="ingredients-container">
        {ingredients && ingredients.length > 0 && (
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
                  <TableCell>Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients.map(data => {
                  const { image, calories, name, tag, id } = data;
                  return (
                    <TableRow key={id}>
                      <TableCell>{name}</TableCell>
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
                          ></Chip>
                        </TableCell>
                      </Tooltip>
                      <TableCell>
                        <img className="ingredient-image" src={image} alt="" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </Layout>
  );
}

export default Ingredients;
