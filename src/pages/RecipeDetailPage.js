import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Grid,
  Loader,
  Container,
  Group,
  Text,
  Title,
  Badge,
} from '@mantine/core';

import { api } from '../api';

import { DeleteRecipeButton } from '../components/DeleteRecipeButton';
import { Direcions } from '../components/Directions';
import { IngredientsPaper } from '../components/IngredientsPaper';
import useRecipe from '../hooks/useRecipe';
import toHoursAndMinutes from '../utils/toHoursAndMinutes';
import { AlertBar } from '../components/AlertBar';
import { Clock, Meat } from 'tabler-icons-react';

const { Col } = Grid;

export function RecipeDetailPage() {
  const [error, setError] = useState(false);
  const [portions, setPortions] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, recipe, hasError } = useRecipe(`/recipes/${id}`);

  const handleDeleteRecipe = async (id) => {
    try {
      await api.delete(`/recipes/${id}`);
      toast.success('Recept byl smazán!');
      navigate('/');
    } catch (errorMessage) {
      setError(true);
      toast.error('Něco se nepovedlo.');
    }
  };

  if (isLoading && !recipe) {
    return <Loader />;
  }

  if (hasError) {
    return <AlertBar message="Nepodařilo se načíst recept." />;
  }

  const { title, preparationTime, ingredients, directions, sideDish } = recipe;

  return (
    <Container size="xl">
      <Grid>
        <Col span={10}>
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
          <Clock size={20} strokeWidth={2} color={'#1c7ed6'} />
          {preparationTime && (
            <Text size="md" color="blue" weight="500">
              {' '}
              {toHoursAndMinutes(preparationTime)}
            </Text>
          )}
          {sideDish && (
            <Badge>
              <Group spacing="xs">
                <Meat size={20} strokeWidth={2} color={'#1c7ed6'} />{' '}
                <Text size={20} color={'#1c7ed6'}>
                  {sideDish}
                </Text>
              </Group>
            </Badge>
          )}
        </Group>
      </Grid>
      <Grid gutter="xl" justify="space-between" my={30}>
        <Col span={4}>
          {ingredients && ingredients.length > 0 && (
            <IngredientsPaper
              ingredients={ingredients}
              portions={portions}
              setPortions={setPortions}
            />
          )}
        </Col>
        <Col span={7}>
          {directions && <Direcions directions={directions} />}
        </Col>
      </Grid>
    </Container>
  );
}
