import { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Row, Button, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import { SearchInput } from '../components/SearchInput';
import { RecipesList } from '../components/RecipesList';
import useRecipes from '../hooks/useRecipes';
import removeAccents from '../utils/removeAccents';

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
    <Container>
      <Row>
        <Col lg={2}>
          <h1>Recepty</h1>
        </Col>
        <Col>
          <Button
            color="success"
            size="sm"
            onClick={() => navigate('/recipe/add')}
          >
            Přidat recept
          </Button>
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
          <Row>
            <span>Seřadit podle</span>
            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="title">Abecedy</option>
              <option value="preparationTime">Čas přípravy</option>
            </select>
          </Row>
        </Col>
      </Row>
      {isLoading && <Spinner className="mb-4" />}
      {hasError && (
        <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>
      )}
      <RecipesList recipes={data} />
    </Container>
  );
}
