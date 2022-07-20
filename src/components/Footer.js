import { Container } from '@mantine/core';

export function Footer() {
  return (
    <Container size="xl">
      <hr />
      <p>&copy; {new Date().getFullYear()} &middot; CN Group CZ a.s.</p>
    </Container>
  );
}
