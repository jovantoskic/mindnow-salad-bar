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
  Typography,
  Button,
} from '@material-ui/core';
import Layout from '../../shared/Layout';
import Fetching from '../../shared/Fetching';
import { sortByDescOrder, filterTag } from '../../../utils/helpers';
import { API_BASE_URL } from '../../../constants/apiRoutes';

import './Ingredients.scss';

function Ingredients() {
  const [sorted, setSorted] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [clear, setClear] = useState(false);

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
  }, [clear]);

  return (
    <Layout>
      <div className="ingredients-container">
        {ingredients?.length ? (
          <>
            <div className="ingredients-headline">
              <Typography variant="h5">Selected ingredients</Typography>
              <Button
                type="submit"
                variant="outlined"
                className="clear-button"
                disabled={!ingredients}
                onClick={() => setClear(!clear)}
              >
                Clear
              </Button>
            </div>
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
                            />
                          </TableCell>
                        </Tooltip>
                        <TableCell>
                          <img
                            className="ingredient-image"
                            src={image}
                            alt="ingredient-image"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Fetching message="No ingredients!" />
        )}
      </div>
    </Layout>
  );
}

export default Ingredients;
