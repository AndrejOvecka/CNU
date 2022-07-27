import { List, Paper, Group, Text, NumberInput, Title } from '@mantine/core';
import { useState } from 'react';
import { Carrot } from 'tabler-icons-react';

export function IngredientsList({ ingredients, servingCount = 1 }) {
  const [portions, setPortions] = useState(servingCount ? servingCount : 1);

  return (
    <Paper shadow="md" p="lg" withBorder>
      <Group spacing={5} mb={15}>
        <Text>Počet porcí</Text>
        <NumberInput
          value={portions}
          size="md"
          min={1}
          onChange={(val) => setPortions(val)}
        />
      </Group>
      <List type="unordered" icon={<Carrot color="orange" />}>
        {ingredients.map(({ amount, amountUnit, name, isGroup, _id }) => (
          <div key={_id}>
            {!isGroup ? (
              <Text>
                {amount ? (
                  <p>
                    {amount * (portions / servingCount)} {amountUnit} - {name}
                  </p>
                ) : (
                  <p>{name}</p>
                )}
              </Text>
            ) : (
              <Title order={4} mb={8}>
                {name}
              </Title>
            )}
          </div>
        ))}
      </List>
    </Paper>
  );
}
