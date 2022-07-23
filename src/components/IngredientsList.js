import {
  List,
  Checkbox,
  Paper,
  Group,
  Text,
  NumberInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Carrot } from 'tabler-icons-react';

export function IngredientsList({ ingredients, portions, setPortions }) {
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
        {ingredients.map(({ _id, amount, amountUnit, name, isGroup }) => (
          <div>
            {!isGroup ? (
              <Checkbox
                size="md"
                mb={15}
                key={_id}
                label={
                  amount ? (
                    <Text>
                      {amount * portions} {amountUnit} - {name}{' '}
                    </Text>
                  ) : (
                    <span>{name}</span>
                  )
                }
              ></Checkbox>
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
