import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Spinner,
  Alert,
  Row,
  Col,
  List,
  Button,
  ButtonGroup,
  Input,
} from 'reactstrap';
import { api } from '../api';

import { DeleteRecipeButton } from '../components/DeleteRecipeButton';
import { IngredientsList } from '../components/IngredientsList';
import useRecipe from '../hooks/useRecipe';
import splitedDirections from '../utils/splitDirections';
import toHoursAndMinutes from '../utils/toHoursAndMinutes';

export function RecipeDetailPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [portions, setPortions] = useState(1);
  const { slug } = useParams();

  const { isLoading, recipe, hasError } = useRecipe(`/recipes/${slug}`);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError) {
    return <Alert color="danger">Vyskytla sa chyba</Alert>;
  }

  if (!recipe) {
    return null;
  }

  const { _id, title, preparationTime, ingredients, directions } = recipe;

  const handleDeleteRecipe = async (_id) => {
    try {
      setLoading(true);
      await api.delete(`/recipes/${_id}`);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Container>
      <Row className="ml-10">
        <Col lg={8}>
          <h1>{title}</h1>
        </Col>
        <Col lg={4} className="d-flex justify-content-end">
          <Row>
            <Col lg={4} className="mr-4">
              <Button outline color="primary" className="mt-2">
                Upravit
              </Button>
            </Col>
            <Col lg={8}>
              <DeleteRecipeButton
                onClick={() => handleDeleteRecipe(_id)}
                title={title}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Row>
            <h5>Čas přípravy: {toHoursAndMinutes(preparationTime)}</h5>
          </Row>
          <p>Ingredience:</p>
          <Row>
            <Col lg={4} className="mt-2">
              <p>Počet porcí</p>
            </Col>
            <Col>
              <ButtonGroup>
                <Input
                  style={{ width: '45px' }}
                  placeholder={portions}
                  value={portions}
                />
                <Button
                  color="primary"
                  outline
                  size="sm"
                  onClick={() => setPortions(portions + 1)}
                >
                  +
                </Button>

                <Button
                  color="primary"
                  outline
                  size="sm"
                  onClick={() => setPortions(portions - 1)}
                >
                  -
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <IngredientsList ingredients={ingredients} portions={portions} />
          {/* <List type="unstyled">
            {ingredients.map(({ _id, amount, amountUnit, name }) => (
              <li key={_id}>
                {amount * portions} {amountUnit} - {name}
              </li>
            ))}
          </List> */}
        </Col>
        <Col lg={8}>
          <ol>
            {splitedDirections(directions).map((id) => (
              <li key={id} lg={3} md={4} sm={6} xs={12}>
                {id}
              </li>
            ))}
          </ol>
        </Col>
      </Row>
    </Container>
  );
}
