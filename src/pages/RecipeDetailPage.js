import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Grid, Loader, Group, Title, Tooltip } from '@mantine/core';

import { api } from '../api';

import { DeleteRecipeButton } from '../components/buttons/DeleteRecipeButton';
import { DirecionsList } from '../components/lists/DirectionsList';
import { IngredientsList } from '../components/lists/IngredientsList';
import { AlertBar } from '../components/alerts/AlertBar';
import { SideDishBadge } from '../components/SideDishBadge';
import { PeraparationTimeBox } from '../components/PreparationTimeBox';
import { NoIngredienceBar } from '../components/alerts/NoIngredienceBar';
import useRecipe from '../hooks/useRecipe';

const { Col } = Grid;

export function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, recipe, hasError } = useRecipe(`/recipes/${id}`);

  const handleDeleteRecipe = async (id) => {
    try {
      await api.delete(`/recipes/${id}`);
      toast.success(`Recept ${title} byl smazán!`);
      navigate('/');
    } catch (error) {
      toast.error('Něco se nepovedlo.');
    }
  };

  const {
    title,
    preparationTime,
    ingredients,
    directions,
    sideDish,
    servingCount,
  } = recipe;

  if (isLoading && !recipe) {
    return <Loader />;
  }

  if (hasError) {
    return <AlertBar message="Nepodařilo se načíst recept." />;
  }

  return (
    <>
      <Grid justify="space-between">
        <Col span={9}>
          <Title order={1} align="left">
            {title}
          </Title>
        </Col>
        <Col span={1}>
          <Link to={{ pathname: `/recipe/${id}/edit` }}>
            <Button variant="outline">Upravit</Button>
          </Link>
        </Col>
        <Col span={1}>
          <DeleteRecipeButton
            onClick={() => handleDeleteRecipe(id)}
            title={title}
          />
        </Col>
      </Grid>
      <Grid pl={12}>
        <Group spacing="xs">
          {preparationTime && (
            <PeraparationTimeBox
              preparationTime={preparationTime}
              color="#1c7ed6"
            />
          )}
          {sideDish && (
            <Tooltip label={sideDish} pt={5}>
              <SideDishBadge sideDish={sideDish} />
            </Tooltip>
          )}
        </Group>
      </Grid>
      <Grid gutter="xl" justify="space-between" my={30}>
        <Col span={4}>
          {ingredients && ingredients.length > 0 ? (
            <IngredientsList
              ingredients={ingredients}
              servingCount={servingCount}
            />
          ) : (
            <NoIngredienceBar />
          )}
        </Col>
        <Col span={7}>
          {directions && <DirecionsList directions={directions} />}
        </Col>
      </Grid>
    </>
  );
}
