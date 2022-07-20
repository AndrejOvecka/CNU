import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  Button,
  Grid,
  Title,
  TextInput,
  NumberInput,
  Textarea,
  ScrollArea,
  Autocomplete,
} from '@mantine/core';
import { api } from '../api';
import { IngredientsForm } from '../components/IngredientsForm';
import { SubmitButton } from '../components/SubmitButton';
import { BackButton } from '../components/BackButton';
import useIngredients from '../hooks/useIngredients';

const { Col } = Grid;

export function AddRecipePage() {
  const [error, setError] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientAmountUnit, setIngredientAmountUnit] = useState('');
  const [recipe, setRecipe] = useState({
    title: '',
    preparationTime: '',
    directions: '',
    sideDish: '',
    ingredients: [],
  });

  const { ingredientsList, hasError, isLoading } = useIngredients();

  const navigate = useNavigate();

  const handleAddIngredient = () => {
    ingredients.push({
      name: ingredientName,
      amount: ingredientAmount,
      amountUnit: ingredientAmountUnit,
    });

    setIngredientName('');
    setIngredientAmount();
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
        const response = await api.post(`/recipes`, recipe);
        if (response && response.data) {
          const id = response.data._id;
          navigate(`/recipes/${id}`);
        }
        toast.success('Recept byl úspěšně vytvořen!');
      } catch (errorMessage) {
        setError(true);
        toast.error('Něco se nepovedlo.');
      }
    } else {
      toast.error('Název je povinné pole!');
    }
  };

  return (
    <Container size="xl">
      <Grid>
        <Col span={10}>
          <Title order={1} align="left">
            Přidat recept
          </Title>
        </Col>
        <Col span={1}>
          <SubmitButton handleSubmit={() => handleSubmit()} />
        </Col>
        <Col span={1}>
          <BackButton text={'Zpět'} url={`/`} />
        </Col>
      </Grid>
      <Grid justify="space-between" my={30}>
        <Col span={5}>
          <TextInput
            label="Název receptu"
            placeholder="Název receptu"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          />
          <Grid pt={15}>
            <Col span={6}>
              <TextInput
                value={recipe.sideDish}
                label="Příloha"
                placeholder="Příloha"
                onChange={(e) =>
                  setRecipe({ ...recipe, sideDish: e.target.value })
                }
              />
            </Col>
            <Col span={6}>
              <TextInput
                placeholder="Doba připravy min."
                label="Doba připravy min."
                value={recipe.preparationTime}
                onChange={(e) =>
                  setRecipe({ ...recipe, preparationTime: e.target.value })
                }
              />
            </Col>
          </Grid>
          <Title order={3} mt={30} mb={10}>
            Přidat ingredienci
          </Title>
          <Grid>
            <Col span={4}>
              <Autocomplete
                placeholder="Ingredience"
                value={ingredientName}
                onChange={setIngredientName}
                data={ingredientsList}
              />
            </Col>
            <Col span={3}>
              <NumberInput
                placeholder="Množství"
                min={0}
                value={ingredientAmount}
                onChange={(val) => setIngredientAmount(val)}
              />
            </Col>
            <Col span={3}>
              <TextInput
                placeholder="Jednotka"
                value={ingredientAmountUnit}
                onChange={(e) => setIngredientAmountUnit(e.target.value)}
              />
            </Col>
            <Col span={2}>
              <Button onClick={() => handleAddIngredientsToRecipe()}>
                Přidat
              </Button>
            </Col>
          </Grid>
          <Grid mt={30}>
            <ScrollArea style={{ height: 250, width: 1000 }}>
              <Col span={11}>
                <IngredientsForm
                  ingredients={ingredients}
                  handleRemoveIngredient={handleRemoveIngredient}
                />
              </Col>
            </ScrollArea>
          </Grid>
        </Col>
        <Col span={6}>
          <Textarea
            placeholder="Postup"
            size="md"
            autosize
            value={recipe.directions}
            onChange={(e) =>
              setRecipe({ ...recipe, directions: e.target.value })
            }
          />
        </Col>
      </Grid>
    </Container>
  );
}
