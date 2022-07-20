import { Button, Text, Grid, Divider } from '@mantine/core';
import { Trash } from 'tabler-icons-react';

const { Col } = Grid;

export function IngredientsForm({ ingredients, handleRemoveIngredient }) {
  return (
    <Col>
      <Grid>
        <Col span={2}>
          <Text>Množství</Text>
        </Col>
        <Col span={2}>
          <Text>Jednotka</Text>
        </Col>
        <Col span={8}>
          <Text>Název</Text>
        </Col>
      </Grid>
      <Divider />
      {ingredients.map(({ _id, name, amount, amountUnit }) => (
        <Grid key={_id} mt={5}>
          <Col span={2}>{amount}</Col>
          <Col span={2}>{amountUnit}</Col>
          <Col span={7}>{name}</Col>
          <Col span={1}>
            <Button
              size="xs"
              px={6}
              color="red"
              onClick={() => handleRemoveIngredient(name)}
            >
              <Trash color="white" size={20} strokeWidth={2} />
            </Button>
          </Col>
        </Grid>
      ))}
    </Col>
  );
}
