import { Container } from '@mantine/core';

import { Footer } from './Footer';
import { Header } from './Header';

export function Layout({ children }) {
  return (
    <>
      <Header />
      <Container size="xl" py={30}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
