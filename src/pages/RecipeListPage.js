import { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Row, Button, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import { SearchInput } from '../components/SearchInput';
import { RecipesList } from '../components/RecipesList';
import useRecipes from '../hooks/useRecipes';
import removeAccents from '../utils/removeAccents';

export function RecipeListPage() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('title');

  const { isLoading, recipes, hasError } = useRecipes('/recipes');

  const handleSearchInputChange = ({ target }) => setSearchValue(target.value);

  useEffect(() => {
    const filterredRecipes = recipes.filter(({ title }) => {
      return removeAccents(title).includes(removeAccents(searchValue));
    });
    setData(filterredRecipes);
  }, [recipes]);

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        title: 'title',
        preparationTime: 'preparationTime',
      };
      const sortProperty = types[type];
      const sorted = [...data].sort(
        (a, b) => b[sortProperty] - a[sortProperty],
      );
      setData(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  console.log(data);
  console.log(sortType);

  return (
    <Container>
      <Row>
        <Col lg={2}>
          <h1>Recepty</h1>
        </Col>
        <Col>
          <Link to="/recipe/add">
            <Button color="success" size="sm">
              Přidat recept
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col lg={10}>
          <SearchInput
            className="mb-4"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </Col>
        <Col lg={2}>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="preparationTime">Čas přípravy</option>
            <option value="title">Abecedně</option>
          </select>
        </Col>
      </Row>
      {isLoading && <Spinner className="mb-4" />}
      {hasError && (
        <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>
      )}
      {data && <RecipesList recipes={data} />}
    </Container>
  );
}
