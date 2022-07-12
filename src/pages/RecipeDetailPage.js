import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Spinner, Alert, Row, Col, Button, Input } from 'reactstrap';
import { api } from '../api';

import { DeleteRecipeButton } from '../components/DeleteRecipeButton';
import { Direcions } from '../components/Directions';
import { IngredientsList } from '../components/IngredientsList';
import useRecipe from '../hooks/useRecipe';
import toHoursAndMinutes from '../utils/toHoursAndMinutes';

export function RecipeDetailPage() {
  const [error, setError] = useState(false);
  const [portions, setPortions] = useState(1);
  const { slug } = useParams();
  const navigate = useNavigate();

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
      await api.delete(`/recipes/${_id}`);
      toast.success('Recept byl smazan');
      navigate('/');
    } catch (errorMessage) {
      setError(errorMessage);
      toast.error(error);
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
              <Link to={{ pathname: `/recipe/edit/${_id}` }}>
                <Button outline color="primary" className="mt-2">
                  Upravit
                </Button>
              </Link>
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
            {preparationTime && (
              <h5>Čas přípravy: {toHoursAndMinutes(preparationTime)}</h5>
            )}
          </Row>
          <p>Ingredience:</p>
          <Row>
            <Col className="mt-2">
              <p>Počet porcí</p>
            </Col>
            <Col>
              {ingredients && (
                <Input
                  style={{ width: '60px' }}
                  placeholder={portions}
                  value={portions}
                  type="number"
                  min={1}
                  onChange={(e) => setPortions(e.target.value)}
                />
              )}
            </Col>
          </Row>
          {ingredients && (
            <IngredientsList ingredients={ingredients} portions={portions} />
          )}
        </Col>
        <Col lg={8}>{directions && <Direcions directions={directions} />}</Col>
      </Row>
    </Container>
  );
}
