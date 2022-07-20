import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Alert,
  Button,
  Container,
  Grid,
  Loader,
  Textarea,
  Title,
  TextInput,
  NumberInput,
  ScrollArea,
  Autocomplete,
} from '@mantine/core';

import { api } from '../api';
import { IngredientsForm } from '../components/IngredientsForm';
import { SubmitButton } from '../components/SubmitButton';
import { BackButton } from '../components/BackButton';

import useRecipe from '../hooks/useRecipe';
import useIngredients from '../hooks/useIngredients';

const { Col } = Grid;

export function EditRecipePage() {
  const [error, setError] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPreparationTime, setNewPreparationTime] = useState('');
  const [newSideDish, setNewSideDish] = useState('');
  const [newDirections, setNewDirections] = useState('');
  const [newIngredients, setNewIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientAmountUnit, setIngredientAmountUnit] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, recipe, hasError } = useRecipe(`/recipes/${id}`);
  const {
    ingredientsList,
    hasError: ingredientsListError,
    isLoading: ingredientsListIsLoading,
  } = useIngredients();

  useEffect(() => {
    if (recipe) {
      setNewTitle(recipe.title);
      setNewDirections(recipe.directions);
      setNewPreparationTime(recipe.preparationTime);
      setNewIngredients(recipe.ingredients);
      setNewSideDish(recipe.sideDish);
    }
  }, [recipe]);

  if (isLoading) {
    return <Loader />;
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
        sideDish: newSideDish,
      };

      await api.post(`/recipes/${id}`, newRecipe);
      toast.success('Recept byl upraven! 🥳');
      navigate(`/recipes/${id}`);
    } catch (errorMessage) {
      setError(true);
      toast.error(error);
    }
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
    setNewIngredients(
      newIngredients.filter((ingredient) => ingredient.name !== name),
    );
  };

  return (
    <Container size="xl">
      <Grid>
        <Col span={10}>
          <Title order={1} align="left">
            {title}
          </Title>
        </Col>
        <Col span={1}>
          <SubmitButton handleSubmit={() => handleSubmit()} />
        </Col>
        <Col span={1}>
          <BackButton text={'Zpět'} url={`/recipes/${id}`} />
        </Col>
      </Grid>
      <Grid justify="space-between" my={30}>
        <Col span={5}>
          <TextInput
            value={newTitle}
            label="Název receptu"
            onChange={(e) => setNewTitle(e.currentTarget.value)}
          />
          <Grid pt={15}>
            <Col span={6}>
              <TextInput
                value={newSideDish}
                label="Příloha"
                onChange={(e) => setNewSideDish(e.currentTarget.value)}
              />
            </Col>
            <Col span={6}>
              <TextInput
                label="Doba připravy min."
                value={newPreparationTime}
                onChange={(e) => setNewPreparationTime(e.currentTarget.value)}
              />
            </Col>
          </Grid>
          <Title order={3} mt={30} mb={10}>
            Přidat ingredienci
          </Title>
          <Grid>
            <Col span={4}>
              <Autocomplete
                placeholder="Nazev ingredience"
                value={ingredientName}
                type="text"
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
                type="text"
                value={ingredientAmountUnit}
                onChange={(e) => setIngredientAmountUnit(e.currentTarget.value)}
              />
            </Col>
            <Col span={2}>
              <Button onClick={() => handleAddIngredient()}>Přidat</Button>
            </Col>
          </Grid>
          <Grid mt={30}>
            <ScrollArea style={{ height: 250, width: 1000 }}>
              <Col span={11}>
                <IngredientsForm
                  ingredients={newIngredients}
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
            value={newDirections}
            onChange={(e) => setNewDirections(e.target.value)}
          />
        </Col>
      </Grid>
    </Container>
  );
}
