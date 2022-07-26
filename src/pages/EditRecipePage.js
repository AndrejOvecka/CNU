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

  if (ingredients) {
    ingredients.map((ingredient) =>
      ingredient.isGroup ? null : { ...ingredient, isGroup: false },
    );
    console.log('ingredience : ' + JSON.stringify(ingredients));
  }

  const handleSubmit = async (form) => {
    try {
      await api.post(`/recipes/${id}`, form);
      toast.success(`Recept ${title} byl upraven! 🥳`);
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

  return <RecipeForm initialForm={initialForm} handleSubmit={handleSubmit} />;
}
