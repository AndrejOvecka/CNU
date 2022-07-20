import { Navbar, NavbarBrand } from 'reactstrap';
import { Container } from '@mantine/core';
import { Anchor } from '@mantine/core';

export function Header() {
  return (
    <Navbar color="dark" dark>
      <Container>
        <Anchor href="/" underline={false} align="left" color="dimmed">
          Cookbook
        </Anchor>
      </Container>
    </Navbar>
  );
}
