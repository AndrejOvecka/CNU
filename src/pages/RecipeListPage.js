import { useState } from 'react';
import {
  Container,
  Spinner,
  Alert,
  Row,
  Button,
  Col,
  Label,
  Dropdown,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { SearchInput } from '../components/SearchInput';
import { RecipesList } from '../components/RecipesList';
import useRecipes from '../hooks/useRecipes';
import removeAccents from '../utils/removeAccents';

export function RecipeListPage() {
  const [searchValue, setSearchValue] = useState('');

  const { isLoading, recipes, hasError } = useRecipes('/recipes');

  const filterredRecipes = recipes.filter(({ title }) => {
    return removeAccents(title).includes(removeAccents(searchValue));
  });

  const handleSearchInputChange = ({ target }) => setSearchValue(target.value);

  return (
    <Container>
      <Row>
        <Col lg={2}>
          <h1>Recepty</h1>
        </Col>
        <Col>
          <Link to="/add">
            <Button color="success" size="sm">
              Přidat recept
            </Button>
          </Link>
        </Col>
      </Row>
      <Col>
        <SearchInput
          className="mb-4"
          value={searchValue}
          onChange={handleSearchInputChange}
        />
      </Col>
      <Col></Col>
      {isLoading && <Spinner className="mb-4" />}
      {hasError && (
        <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>
      )}
      <RecipesList recipes={filterredRecipes} />
    </Container>
  );
}
