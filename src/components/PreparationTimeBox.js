import { Group, Text } from '@mantine/core';
import { Clock } from 'tabler-icons-react';

import toHoursAndMinutes from '../utils/toHoursAndMinutes';

export function PeraparationTimeBox({ preparationTime, ...props }) {
  return (
    <Group spacing="xs" {...props}>
      <Clock size={20} />
      <Text size="md" weight="500">
        {toHoursAndMinutes(preparationTime)}
      </Text>
    </Group>
  );
}
