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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        height={70}
        style={{ backgroundColor: '#b3bed0', height: '70px' }}
      >
        <Container
          size="xl"
          style={{ height: 'inherit', display: 'flex', alignItems: 'center' }}
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

      <main style={{ background: '#f5f7f9', paddingBlock: '30px' }}>
        <Container size="xl">{children}</Container>
      </main>

      <Footer
        style={{
          backgroundColor: '#b3bed0',
          paddingLeft: 34,
          marginTop: 'auto',
          height: '60px',
        }}
      >
        <Container
          size="xl"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 'inherit',
          }}
        >
          <p style={{ color: 'black', margin: 0 }}>
            &copy; {new Date().getFullYear()} &middot; CN Group CZ a.s.
          </p>
        </Container>
      </Footer>
    </div>
  );
}
