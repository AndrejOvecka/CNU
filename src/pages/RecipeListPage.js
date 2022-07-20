import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Button, Select, Loader } from '@mantine/core';

import { SearchInput } from '../components/SearchInput';
import { RecipesList } from '../components/RecipesList';
import { AlertBar } from '../components/AlertBar';
import useRecipes from '../hooks/useRecipes';
import removeAccents from '../utils/removeAccents';

const { Col } = Grid;

export function RecipeListPage() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('title');
  const navigate = useNavigate();

  const { isLoading, recipes, hasError } = useRecipes('/recipes');

  const handleSearchInputChange = ({ target }) => setSearchValue(target.value);

  //filtrovanie receptov, odstranenie diakritiky
  useEffect(() => {
    const filterredRecipes = recipes.filter(({ title }) => {
      return removeAccents(title).includes(removeAccents(searchValue));
    });
    setData(filterredRecipes);
  }, [recipes, searchValue]);

  // sorting podla casu pripravy a abecedy
  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        title: 'title',
        preparationTime: 'preparationTime',
      };
      const sortProperty = types[type];
      const sorted = [...data].sort((a, b) =>
        typeof a[sortProperty] === 'string' &&
        typeof b[sortProperty] === 'string'
          ? a[sortProperty].localeCompare(b[sortProperty])
          : b[sortProperty] - a[sortProperty],
      );
      setData(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  return (
    <Container size="xl">
      <Grid>
        <Col span={6}>
          <h1>Recepty</h1>
        </Col>
        <Col span={6} align="right">
          <Button
            size="md"
            color="green"
            onClick={() => navigate('/recipe/add')}
          >
            Přidat recept
          </Button>
        </Col>
      </Grid>
      <Grid>
        <Col lg={10}>
          <SearchInput
            className="mb-4"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </Col>
        <Col lg={2}>
          <Select
            placeholder="Seřadit podle"
            size="md"
            onChange={setSortType}
            data={[
              { value: 'title', label: 'Abecedy' },
              { value: 'preparationTime', label: 'Času přípravy' },
            ]}
          />
        </Col>
      </Grid>
      {isLoading && <Loader className="mb-4" />}
      {hasError && <AlertBar message="Vyskytla se chyba při načítání dat" />}
      <RecipesList recipes={data} />
    </Container>
  );
}
