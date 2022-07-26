import { Badge, Group, Text } from '@mantine/core';
import { Meat } from 'tabler-icons-react';

export function SideDishBadge({ sideDish }) {
  return (
    <Badge>
      <Group spacing="xs">
        <Meat size={20} strokeWidth={2} color={'#1c7ed6'} />{' '}
        <Text
          size={20}
          color={'#1c7ed6'}
          style={{
            maxWidth: '200px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {sideDish}
        </Text>
      </Group>
    </Badge>
  );
}
