import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../shared/Layout';
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
} from '@material-ui/core';
import Fetching from '../../shared/Fetching';
import { API_BASE_URL } from '../../../constants/apiRoutes';
import { sortByDescOrder, sumAllCalories } from '../../../utils/helpers';

import './SaladOverview.scss';

function SaladOverview() {
  const [ingredients, setIngredients] = useState([]);
  const [sorted, setSorted] = useState(false);

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

  useEffect(() => {
    axios.get(API_BASE_URL).then(response => {
      setIngredients(response.data);
    });
  }, []);

  const saladName = localStorage.getItem('saladName');
  const saladTag = localStorage.getItem('saladTag');

  return (
    <Layout>
      <div className="salad-overview-container">
        {ingredients && ingredients.length > 0 ? (
          <div>
            <div className="headlines-container">
              <div className="salad-name-container">
                <p className="salad-name-label">Salad name:</p>
                <p className="salad-name">
                  {saladName ? saladName : 'No name for this salad'}
                </p>
              </div>
              <div className="salad-tag-container">
                <p className="salad-tag-label">Salad tag:</p>
                {saladTag ? (
                  <Chip
                    className="salad-tag"
                    variant="outlined"
                    label={saladTag}
                    color="primary"
                    size="medium"
                  />
                ) : (
                  <p className="salad-tag">No tag for this salad</p>
                )}
              </div>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.map(data => {
                    const { calories, name, id } = data;
                    return (
                      <TableRow key={id}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{calories}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography className="salad-info" variant="h6">
              {`This salad has ${sumAllCalories(
                ingredients
              )} calories in total. ${saladTag ? `And it's ${saladTag}.` : ''}`}
            </Typography>
          </div>
        ) : (
          <Fetching message="No salad created!" />
        )}
      </div>
    </Layout>
  );
}

export default SaladOverview;
