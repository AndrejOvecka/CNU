import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Col, Container, Form, Input, List, Row } from 'reactstrap';
import { api } from '../api';
import { FormIngredientsList } from '../components/FormIngredientsList';
import { SubmitButton } from '../components/SubmitButton';

export function AddRecipePage() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientAmountUnit, setIngredientAmountUnit] = useState('');

  const [recipe, setRecipe] = useState({
    title: '',
    preparationTime: '',
    directions: '',
    ingredients: [],
  });

  const handleAddIngredient = () => {
    ingredients.push({
      name: ingredientName,
      amount: ingredientAmount,
      amountUnit: ingredientAmountUnit,
    });

    setIngredientName('');
    setIngredientAmount('');
    setIngredientAmountUnit('');
  };

  const handleAddIngredientsToRecipe = () => {
    handleAddIngredient();
    setRecipe({ ...recipe, ingredients: ingredients });
  };

  const handleRemoveIngredient = (name) => {
    setIngredients(
      ingredients.filter((ingredient) => ingredient.name !== name),
    );
  };

  useEffect(() => {
    setRecipe({ ...recipe, ingredients: ingredients });
  }, [ingredients]);

  const handleSubmit = async () => {
    if (recipe.title.trim().length !== 0) {
      try {
        await api.post(`/recipes`, recipe);
        toast.success('Recept byl úspěšně vytvořen');
        navigate('/');
      } catch (errorMessage) {
        setError(true);
        toast.error(error);
      }
    } else {
      toast.error('Název je povinné pole');
    }
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col lg={10}>
            <h1>Přidat recept</h1>
          </Col>
          <Col lg={1}>
            <SubmitButton handleSubmit={() => handleSubmit()} />
          </Col>
          <Col lg={1}>
            <Button outline color="danger" onClick={() => navigate('/')}>
              Zpět
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Row>
              <Col>
                <Input
                  placeholder="Název receptu"
                  type="text"
                  value={recipe.title}
                  onChange={(e) =>
                    setRecipe({ ...recipe, title: e.target.value })
                  }
                />
              </Col>
              <Col>
                <Input
                  placeholder="Doba připravy min."
                  value={recipe.preparationTime}
                  type="number"
                  onChange={(e) =>
                    setRecipe({ ...recipe, preparationTime: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <h4>Přidat ingredienci</h4>
            </Row>
            <Row>
              <Col lg={4}>
                <Input
                  placeholder="Ingredience"
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
                <Button onClick={() => handleAddIngredientsToRecipe()}>
                  Přidat
                </Button>
              </Col>
              <Row className="mt-4">
                <FormIngredientsList
                  ingredients={ingredients}
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
              value={recipe.directions}
              onChange={(e) =>
                setRecipe({ ...recipe, directions: e.target.value })
              }
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
