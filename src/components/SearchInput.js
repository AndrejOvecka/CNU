import { Input } from '@mantine/core';
import { Search } from 'tabler-icons-react';

export function SearchInput(props) {
  return (
    <Input
      icon={<Search />}
      size="md"
      placeholder="Vyhledat recept..."
      {...props}
    />
  );
}
