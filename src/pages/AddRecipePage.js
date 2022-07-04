import { Col, Container, Input, Row } from 'reactstrap';

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
          <h6>Čas přípravy</h6>
          <Input placeholder="čas přípravy" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h6>Ingredience</h6>
          <Input placeholder="cukr" />
        </Col>
        <Col>
          <h6>Množství</h6>
          <Input placeholder="200" />
        </Col>
        <Col>
          <h6>jednotka</h6>
          <Input placeholder="g" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h6>Postup</h6>
          <Input placeholder="postup" type="textarea" />
        </Col>
      </Row>
    </Container>
  );
}
