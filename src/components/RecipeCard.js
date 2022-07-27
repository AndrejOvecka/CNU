import { Card, Text, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import placeholder from '../images/food-placeholder.png';
import { PeraparationTimeBox } from './PreparationTimeBox';
import { SideDishBadge } from './SideDishBadge';

export function RecipeCard({ title, preparationTime, sideDish, _id }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ cursor: 'pointer', height: '100%' }}
      shadow="sm"
      withBorder
      radius="md"
      onClick={() => navigate(`/recipes/${_id}`)}
    >
      <Card.Section>
        <Image fit="cover" src={placeholder} alt="Preview" />
      </Card.Section>
      <Text weight={500} size="lg">
        {title}
      </Text>

      {preparationTime && (
        <PeraparationTimeBox
          preparationTime={preparationTime}
          color="black"
          py={5}
        />
      )}
      {sideDish && <SideDishBadge sideDish={sideDish} />}
    </Card>
  );
}
