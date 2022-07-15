import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Input,
  Row,
  Spinner,
} from 'reactstrap';
import { api } from '../api';
import { FormIngredientsList } from '../components/FormIngredientsList';
import { SubmitButton } from '../components/SubmitButton';

import useRecipe from '../hooks/useRecipe';

export function EditRecipePage() {
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, recipe, hasError } = useRecipe(`/recipes/${id}`);

  const [newTitle, setNewTitle] = useState('');
  const [newPreparationTime, setNewPreparationTime] = useState('');
  const [newDirections, setNewDirections] = useState('');
  const [newIngredients, setNewIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientAmountUnit, setIngredientAmountUnit] = useState('');

  useEffect(() => {
    if (recipe) {
      setNewTitle(recipe.title);
      setNewDirections(recipe.directions);
      setNewPreparationTime(recipe.preparationTime);
      setNewIngredients(recipe.ingredients);
    }
  }, [recipe]);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError) {
    return <Alert color="danger">Vyskytla sa chyba</Alert>;
  }

  if (!recipe) {
    return null;
  }

  const { title } = recipe;

  const handleSubmit = async () => {
    try {
      const newRecipe = {
        ...recipe,
        title: newTitle,
        preparationTime: newPreparationTime,
        directions: newDirections,
        ingredients: newIngredients,
      };

      await api.post(`/recipes/${id}`, newRecipe);
      toast.success('Recept byl upraven');
    } catch (errorMessage) {
      setError(true);
      toast.error(error);
    }
    navigate('/');
  };

  const handleAddIngredient = () => {
    newIngredients.push({
      name: ingredientName,
      amount: ingredientAmount,
      amountUnit: ingredientAmountUnit,
    });

    setIngredientName('');
    setIngredientAmount('');
    setIngredientAmountUnit('');
  };

  const handleRemoveIngredient = (name) => {
    console.log('Funkcia sa zvolala');
    setNewIngredients(
      newIngredients.filter((ingredient) => ingredient.name !== name),
    );
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col lg={10}>
            <h1>{title}</h1>
          </Col>
          <Col lg={1}>
            <SubmitButton handleSubmit={() => handleSubmit()} />
          </Col>
          <Col lg={1}>
            <Button
              outline
              color="danger"
              onClick={() => navigate(`/recipes/${id}`)}
            >
              Zpět
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Row>
              <Col>
                <Input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </Col>
              <Col>
                <Input
                  placeholder="Doba připravy min."
                  value={newPreparationTime}
                  type="number"
                  onChange={(e) => setNewPreparationTime(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <h4>Přidat ingredienci</h4>
            </Row>
            <Row>
              <Col lg={4}>
                <Input
                  placeholder="Nazev ingredience"
                  value={ingredientName}
                  type="text"
                  onChange={(e) => setIngredientName(e.target.value)}
                />
              </Col>
              <Col lg={3}>
                <Input
                  placeholder="Množství"
                  type="number"
                  value={ingredientAmount}
                  onChange={(e) => setIngredientAmount(e.target.value)}
                />
              </Col>
              <Col lg={3}>
                <Input
                  placeholder="Jednotka"
                  type="text"
                  value={ingredientAmountUnit}
                  onChange={(e) => setIngredientAmountUnit(e.target.value)}
                />
              </Col>
              <Col lg={2}>
                <Button onClick={() => handleAddIngredient()}>Přidat</Button>
              </Col>
              <Row className="mt-4">
                <FormIngredientsList
                  ingredients={newIngredients}
                  handleRemoveIngredient={handleRemoveIngredient}
                />
              </Row>
            </Row>
          </Col>
          <Col>
            <Input
              placeholder="Postup"
              type="textarea"
              rows="15"
              value={newDirections}
              onChange={(e) => setNewDirections(e.target.value)}
            />
          </Col>
        </Row>
      </Form>
      {/* <h1>Upravit recept</h1>
      <Button onClick={() => handleSubmit()}>Uložit</Button>
      <Form>
        <Row className="mt-4">
          <Col>
            <Input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              placeholder="Doba připravy min."
              value={newPreparationTime}
              type="number"
              onChange={(e) => setNewPreparationTime(e.target.value)}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <p>Ingredience</p>
          <Col>
            <Input
              placeholder="Nazev ingredience"
              value={ingredientName}
              type="text"
              onChange={(e) => setIngredientName(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              placeholder="Množství"
              type="number"
              value={ingredientAmount}
              onChange={(e) => setIngredientAmount(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              placeholder="Jednotka"
              type="text"
              value={ingredientAmountUnit}
              onChange={(e) => setIngredientAmountUnit(e.target.value)}
            />
          </Col>
          <Button onClick={() => handleAddIngredient()}>+</Button>
        </Row>
        <br />
        <Row>
          <Col>
            <Input
              placeholder="Postup"
              type="textarea"
              value={newDirections}
              onChange={(e) => setNewDirections(e.target.value)}
            />
          </Col>
        </Row>
        <br />
        <FormIngredientsList
          ingredients={newIngredients}
          handleRemoveIngredient={handleRemoveIngredient}
        />
      </Form> */}
    </Container>
  );
}
