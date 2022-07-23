import {
  AppShell,
  Header,
  Footer,
  Anchor,
  Container,
  Title,
} from '@mantine/core';

export default function Layout({ children }) {
  return (
    <AppShell
      styles={{
        main: {
          background: '#f5f7f9',
        },
      }}
      footer={
        <Footer
          height={60}
          style={{ backgroundColor: '#b3bed0', paddingLeft: 34 }}
        >
          <Container
            size="xl"
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <p style={{ color: 'black', margin: 0 }}>
              &copy; {new Date().getFullYear()} &middot; CN Group CZ a.s.
            </p>
          </Container>
        </Footer>
      }
      header={
        <Header
          height={70}
          style={{ backgroundColor: '#b3bed0', paddingLeft: 34 }}
        >
          <Container
            size="xl"
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Anchor
              href="/"
              underline={false}
              align="left"
              color="dimmed"
              size="xl"
              style={{ color: 'black' }}
            >
              {' '}
              <Title order={2}>👨🏻‍🍳 Cookbook</Title>
            </Anchor>
          </Container>
        </Header>
      }
    >
      <Container size="xl" py={30}>
        {children}
      </Container>
    </AppShell>
  );
}
