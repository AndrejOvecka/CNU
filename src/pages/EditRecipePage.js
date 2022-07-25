import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '@mantine/core';

import { api } from '../api';

import useRecipe from '../hooks/useRecipe';
import { RecipeForm } from '../components/RecipeForm';
import { formList } from '@mantine/form';
import { AlertBar } from '../components/AlertBar';

export function EditRecipePage() {
  const [error, setError] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, recipe, hasError } = useRecipe(`/recipes/${id}`);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <AlertBar message="Vyskytla se chyba při načítání receptu."></AlertBar>
    );
  }

  if (!recipe) {
    return null;
  }

  const { title, directions, preparationTime, sideDish, ingredients } = recipe;

  const handleSubmit = async (form) => {
    try {
      await api.post(`/recipes/${id}`, form);
      toast.success('Recept byl upraven! 🥳');
      navigate(`/recipes/${id}`);
    } catch (errorMessage) {
      setError(true);
      toast.error(error);
    }
  };

  const initialForm = {
    title: title,
    preparationTime: preparationTime,
    sideDish: sideDish,
    directions: directions,
    ingredients: ingredients ? formList(ingredients) : [{}],
  };

  return (
    <RecipeForm initialForm={initialForm} handleSubmit={handleSubmit} />
    // <Container size="xl">
    //   <Grid>
    //     <Col span={10}>
    //       <Title order={1} align="left">
    //         {title}
    //       </Title>
    //     </Col>
    //     <Col span={1}>
    //       <SubmitButton handleSubmit={() => handleSubmit()} />
    //     </Col>
    //     <Col span={1}>
    //       <BackButton text={'Zpět'} url={`/recipes/${id}`} />
    //     </Col>
    //   </Grid>
    //   <Grid justify="space-between" my={30}>
    //     <Col span={5}>
    //       <TextInput
    //         value={newTitle}
    //         label="Název receptu"
    //         onChange={(e) => setNewTitle(e.currentTarget.value)}
    //       />
    //       <Grid pt={15}>
    //         <Col span={6}>
    //           <TextInput
    //             value={newSideDish}
    //             label="Příloha"
    //             onChange={(e) => setNewSideDish(e.currentTarget.value)}
    //           />
    //         </Col>
    //         <Col span={6}>
    //           <TextInput
    //             label="Doba připravy min."
    //             value={newPreparationTime}
    //             onChange={(e) => setNewPreparationTime(e.currentTarget.value)}
    //           />
    //         </Col>
    //       </Grid>
    //       <Title order={3} mt={30} mb={10}>
    //         Přidat ingredienci
    //       </Title>
    //       <Grid>
    //         <Col>
    //           <Checkbox
    //             checked={isGroup}
    //             label="Přidat skupinu"
    //             onChange={(e) => setIsGroup(e.currentTarget.checked)}
    //           />
    //         </Col>
    //       </Grid>
    //       <Grid>
    //         <Col span={4}>
    //           <Autocomplete
    //             placeholder="Nazev"
    //             value={ingredientName}
    //             type="text"
    //             onChange={setIngredientName}
    //             data={ingredientsList}
    //           />
    //         </Col>
    //         <Col span={3}>
    //           <NumberInput
    //             placeholder="Množství"
    //             min={0}
    //             disabled={isGroup}
    //             value={ingredientAmount}
    //             onChange={(val) => setIngredientAmount(val)}
    //           />
    //         </Col>
    //         <Col span={3}>
    //           <TextInput
    //             placeholder="Jednotka"
    //             type="text"
    //             disabled={isGroup}
    //             value={ingredientAmountUnit}
    //             onChange={(e) => setIngredientAmountUnit(e.currentTarget.value)}
    //           />
    //         </Col>
    //         <Col span={2}>
    //           <Button onClick={() => handleAddIngredient()}>Přidat</Button>
    //         </Col>
    //       </Grid>
    //       <Grid mt={30}>
    //         <Col span={11}>
    //           <IngredientsList
    //             ingredients={newIngredients}
    //             handleRemoveIngredient={handleRemoveIngredient}
    //           />
    //         </Col>
    //       </Grid>
    //     </Col>
    //     <Col span={6}>
    //       <Textarea
    //         placeholder="Postup"
    //         size="md"
    //         autosize
    //         value={newDirections}
    //         onChange={(e) => setNewDirections(e.target.value)}
    //       />
    //     </Col>
    //   </Grid>
    // </Container>
  );
}
