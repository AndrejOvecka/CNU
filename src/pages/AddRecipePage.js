import { Button, Col, Container, Input, Row } from 'reactstrap';

export function AddRecipePage() {
  return (
    <Container>
      <h1>Přidat recept</h1>
      <Row className="mt-4">
        <Col>
          <h6>Název</h6>
          <Input placeholder="název" />
        </Col>
        <Col>
          <Button>Přidat</Button>
        </Col>
      </Row>
    </Container>
  );
}
