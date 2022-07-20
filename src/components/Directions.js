import { List } from '@mantine/core';

import splitDirections from '../utils/splitDirections';

export function Direcions({ directions }) {
  return (
    <List type="ordered">
      {splitDirections(directions).map((id) => (
        <List.Item key={id} lg={3} md={4} sm={6} xs={12}>
          {id}
        </List.Item>
      ))}
    </List>
  );
}
