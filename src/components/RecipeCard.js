import { Card, Text, Image, Group } from '@mantine/core';

import { Link } from 'react-router-dom';

import placeholder from '../images/food-placeholder.png';
import { PeraparationTimeBox } from './PreparationTimeBox';
import { SideDishBadge } from './SideDishBadge';

export function RecipeCard({ title, preparationTime, sideDish, _id }) {
  return (
    <Card shadow="sm" className="h-100" withBorder radius="md">
      <Link className="text-reset text-decoration-none" to={`/recipes/${_id}`}>
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
      </Link>
    </Card>
  );
}
