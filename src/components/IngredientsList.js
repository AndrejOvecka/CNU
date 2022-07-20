import { List, Checkbox, Paper, Group, Text, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { Carrot } from 'tabler-icons-react';

export function IngredientsList({ ingredients, portions, setPortions }) {
  const [checked, setChecked] = useState(false);

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
        {ingredients.map(({ _id, amount, amountUnit, name }) => (
          <div>
            <Checkbox
              checked={checked}
              size="md"
              mb={15}
              key={_id}
              onChange={(e) => setChecked(e.currentTarget.checked)}
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
          </div>
        ))}
      </List>
    </Paper>
  );
}
