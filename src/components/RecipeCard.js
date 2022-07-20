import { Card, Text, Badge, Image, Group } from '@mantine/core';

import { Link } from 'react-router-dom';
import { Clock, Meat } from 'tabler-icons-react';

import placeholder from '../images/food-placeholder.png';
import toHoursAndMinutes from '../utils/toHoursAndMinutes';

export function RecipeCard({ title, preparationTime, sideDish, _id }) {
  return (
    <Card shadow="sm" className="h-100" withBorder={true}>
      <Link className="text-reset text-decoration-none" to={`/recipes/${_id}`}>
        <Card.Section>
          <Image fit="cover" src={placeholder} alt="Preview" />
        </Card.Section>
        <Text weight={500} size="lg">
          {title}
        </Text>
        <Group spacing="xs">
          <Clock size={20} strokeWidth={2} color={'black'} />
          <Text size="sm">
            {preparationTime && (
              <span> {toHoursAndMinutes(preparationTime)}</span>
            )}
          </Text>
        </Group>
        <div className="mt-1">
          {sideDish && (
            <Badge>
              <Group spacing="xs">
                <Meat size={15} strokeWidth={2.5} color={'#1c7ed6'} />{' '}
                <Text size={15} color={'#1c7ed6'}>
                  {sideDish}
                </Text>
              </Group>
            </Badge>
          )}
        </div>
      </Link>
    </Card>
  );
}
