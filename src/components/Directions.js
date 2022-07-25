import { List } from '@mantine/core';
import MarkdownView from 'react-showdown';

export function Direcions({ directions }) {
  return (
    <List type="ordered">
      <MarkdownView markdown={directions} />
    </List>
  );
}
