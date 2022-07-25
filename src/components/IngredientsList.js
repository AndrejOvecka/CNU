import { Button, Text, Grid, Divider, ScrollArea } from '@mantine/core';
import { Trash } from 'tabler-icons-react';

const { Col } = Grid;

export function IngredientsList({ ingredients, handleRemoveIngredient }) {
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
      <ScrollArea style={{ height: 250, width: 470 }} offsetScrollbars>
        {ingredients.map(({ _id, name, amount, amountUnit, isGroup }) => (
          <Grid key={_id} mt={5}>
            <Col span={2}>
              <Text>{amount}</Text>
            </Col>
            <Col span={2}>
              <Text>{amountUnit}</Text>
            </Col>
            <Col span={6}>
              <Text weight={isGroup ? 700 : 400}>{name}</Text>
            </Col>
            <Col span={2}>
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
      </ScrollArea>
    </Col>
  );
}
